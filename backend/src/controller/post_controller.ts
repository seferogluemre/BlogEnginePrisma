import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreatePostDto } from "src/dto/post/CreatePostDto";
import { UpdatePostDto } from "src/dto/post/UpdatePostDto";
import { PostModel } from "src/model/post_model";

export class PostController {
    static async list(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query;
            const posts = await PostModel.list(query);
            if (posts.length >= 0) {
                res.status(200).json({ data: posts })
            } else {
                res.status(404).json({ message: "Gönderi Listesi boş" })
            }
        } catch (error) {
            res.status(404).json({
                message: "Gönderi Listesi alınırken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    // Get Post Controller
    static async get(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir gönderi ID'si giriniz." });
            }
            const post = await PostModel.getById(Number(id))
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "Gönderi bulunamadı" })
            }
        } catch (error) {
            res.status(404).json({
                message: "Gönderi alınırken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    // Create Post Controller
    static async add(req: Request, res: Response): Promise<void> {
        try {
            const postDto = plainToInstance(CreatePostDto, req.body)

            const errors = await validate(postDto)

            if (errors.length > 0) {
                res.status(400).json({
                    message: "Validasyon hatası lütfen alanları kontrol ediniz",
                    error: errors.map(err => err.constraints)
                })
            }

            const createdPost = await PostModel.create(postDto)

            res.status(201).json({
                message: "Gönderi başarıyla oluşturuldu",
                category: createdPost,
            });
        } catch (error) {
            res.status(404).json({
                message: "Gönderi oluşturulurken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    // Update Post Controller
    static async edit(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir gönderi ID'si giriniz." });
            }
            const postDto = plainToInstance(UpdatePostDto, req.body)

            const errors = await validate(postDto)

            if (errors.length > 0) {
                res.status(400).json({
                    message: "Validasyon hatası lütfen tekrar deneyiniz",
                    error: errors.map(err => err.constraints)
                })
            }

            const post = await PostModel.getById(Number(id))
            if (!post) {
                res.status(404).json({ message: "Güncellenicek gönderi bulunamadı" })
            }

            const updatedPost = await PostModel.update(Number(id), postDto)

            res.status(200).json({ message: "Gönderi başarıyla güncellendi", data: updatedPost });
        } catch (error) {
            res.status(404).json({
                message: "Gönderi güncellenirken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    // Remove Post Controller
    static async remove(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params

            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir gönderi ID'si giriniz." });
            }
            const existingPost = await PostModel.getById(Number(id))

            if (!existingPost) {
                res.status(404).json({ message: "Silinecek olan gönderi bulunamadı." });
            }

            const deletedPost = await PostModel.delete(Number(id))
            res.status(201).json({ message: "Gönderi başarıyla silindi" })

        } catch (error) {
            res.status(404).json({
                message: "Gönderi silinirken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }
}
