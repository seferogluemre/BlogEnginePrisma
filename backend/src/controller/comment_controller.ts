import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { createComment, deleteComment, getCommentById, getComments, updateComment } from "src/model/comment_model";
import { CreateCommentDto } from "src/dto/comment/CreateCommentDto";
import { UpdateCommentDto } from "src/dto/comment/UpdateCommentDto";


// List Post Comment controller
export const listComments = async (req: Request, res: Response) => {
    try {
        const comments = await getComments();
        if (comments.length >= 0) {
            res.status(200).json({ data: comments })
        } else {
            res.status(404).json({ message: "Yorum Listesi boş" })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Yorumlar listesi alınırken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

export const getComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Geçerli bir yorum ID'si giriniz." });
        }

        const comment = await getCommentById(Number(id))
        if (comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({ message: "Yorum bulunamadı" })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Yorum alınırken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

// Create Post Comment controller
export const addComment = async (req: Request, res: Response) => {
    try {
        const commentDto = plainToInstance(CreateCommentDto, req.body)

        const errors = await validate(commentDto)

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validasyon hatası lütfen tekrar deneyiniz",
                error: errors.map(err => err.constraints)
            })
        }

        const createdComment = await createComment(commentDto)
        return res.status(201).json({
            message: "Yorumunuz oluşturuldu",
            data: createdComment
        })

    } catch (error) {
        return res.status(404).json({
            message: "Yorum oluşturulurken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

// Update Post Comment controller
export const editComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Geçerli bir yorum ID'si giriniz." });
        }

        const commentDto = plainToInstance(UpdateCommentDto, req.body)

        const errors = await validate(commentDto)

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validasyon hatası lütfen tekrar deneyiniz",
                error: errors.map(err => err.constraints)
            })
        }

        const comment = await getCommentById(Number(id))
        if (!comment) {
            res.status(404).json({ message: "Güncellenicek yorum bulunamadı" })
        }

        const updatedComment = await updateComment(Number(id), commentDto)

        return res.status(200).json({ message: "Yorumunuz başarıyla güncellendi", data: updatedComment });

    } catch (error) {
        return res.status(404).json({
            message: "Yorum güncellenirken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

export const removeComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Geçerli bir yorum ID'si giriniz." });
        }
        const existingComment = await getCommentById(Number(id))

        if (!existingComment) {
            return res.status(404).json({ message: "Silincek olan yorum bulunamadı." });
        }

        const deletedComment = await deleteComment(Number(id))
        res.status(201).json({ message: "Yorum başarıyla silindi" })
    } catch (error) {
        return res.status(404).json({
            message: "Yorum silinirken bir hata oluştu",
            error: (error as Error).message
        });
    }
}