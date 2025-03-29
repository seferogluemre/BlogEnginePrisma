import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateCommentDto } from "src/dto/comment/CreateCommentDto";
import { UpdateCommentDto } from "src/dto/comment/UpdateCommentDto";
import { CommentQueryProps } from "src/types/comment_types";
import { CommentModel } from "src/model/comment_model";

export class CommentController {

    static async list(req: Request<{}, {}, {}, CommentQueryProps>, res: Response): Promise<void> {
        try {
            const comments = await CommentModel.getAll(req.query);
            if (comments.length >= 0) {
                res.status(200).json({ data: comments });
            } else {
                res.status(404).json({ message: "Yorum Listesi boş" });
            }
        } catch (error) {
            res.status(404).json({
                message: "Yorumlar listesi alınırken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    static async get(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir yorum ID'si giriniz." });
                return;
            }

            const comment = await CommentModel.getById(Number(id));
            if (comment) {
                res.status(200).json(comment);
            } else {
                res.status(404).json({ message: "Yorum bulunamadı" });
            }
        } catch (error) {
            res.status(404).json({
                message: "Yorum alınırken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    static async add(req: Request, res: Response): Promise<void> {
        try {
            const commentDto = plainToInstance(CreateCommentDto, req.body);
            const errors = await validate(commentDto);

            if (errors.length > 0) {
                res.status(400).json({
                    message: "Validasyon hatası lütfen tekrar deneyiniz",
                    error: errors.map(err => err.constraints)
                });
                return;
            }

            const createdComment = await CommentModel.create(commentDto);
            res.status(201).json({
                message: "Yorumunuz oluşturuldu",
                data: createdComment
            });

        } catch (error) {
            res.status(404).json({
                message: "Yorum oluşturulurken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    static async edit(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir yorum ID'si giriniz." });
                return;
            }

            const commentDto = plainToInstance(UpdateCommentDto, req.body);
            const errors = await validate(commentDto);

            if (errors.length > 0) {
                res.status(400).json({
                    message: "Validasyon hatası lütfen tekrar deneyiniz",
                    error: errors.map(err => err.constraints)
                });
                return;
            }

            const comment = await CommentModel.getById(Number(id));
            if (!comment) {
                res.status(404).json({ message: "Güncellenicek yorum bulunamadı" });
                return;
            }

            const updatedComment = await CommentModel.update(Number(id), commentDto);
            res.status(200).json({ message: "Yorumunuz başarıyla güncellendi", data: updatedComment });

        } catch (error) {
            res.status(404).json({
                message: "Yorum güncellenirken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    static async remove(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir yorum ID'si giriniz." });
                return;
            }

            const existingComment = await CommentModel.getById(Number(id));

            if (!existingComment) {
                res.status(404).json({ message: "Silinecek yorum bulunamadı." });
                return;
            }

            await CommentModel.delete(Number(id));
            res.status(201).json({ message: "Yorum başarıyla silindi" });
        } catch (error) {
            res.status(404).json({
                message: "Yorum silinirken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }
}
