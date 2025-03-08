import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "src/model/post_model";
import { CreatePostDto } from "src/dto/post/CreatePostDto";
import { UpdatePostDto } from "src/dto/post/UpdatePostDto";

// List Posts Controller
export const listPosts = async (req: Request, res: Response) => {
    try {
        const posts = await getPosts();
        if (posts.length >= 0) {
            res.status(200).json({ data: posts })
        } else {
            res.status(404).json({ message: "Gönderi Listesi boş" })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Gönderi Listesi alınırken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

// Get Post Controller
export const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Geçerli bir gönderi ID'si giriniz." });
        }
        const post = await getPostById(Number(id))
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "Gönderi bulunamadı" })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Gönderi  alınırken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

// Create Post controller
export const addPost = async (req: Request, res: Response) => {
    try {
        const postDto = plainToInstance(CreatePostDto, req.body)

        const errors = await validate(postDto)

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validasyon hatası lütfen alanları kontrol ediniz",
                error: errors.map(err => err.constraints)
            })
        }

        const createdPost = await createPost(postDto)

        return res.status(201).json({
            message: "Gönderi başarıyla oluşturuldu",
            category: createdPost,
        });
    } catch (error) {
        return res.status(404).json({
            message: "Gönderi oluşturulurken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

// Update Post controller
export const editPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Geçerli bir gönderi ID'si giriniz." });
        }
        const postDto = plainToInstance(UpdatePostDto, req.body)

        const errors = await validate(postDto)

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validasyon hatası lütfen tekrar deneyiniz",
                error: errors.map(err => err.constraints)
            })
        }

        const post = await getPostById(Number(id))
        if (!post) {
            res.status(404).json({ message: "Güncellenicek gönderi bulunamadı" })
        }

        const updatedPost = await updatePost(Number(id), postDto)

        return res.status(200).json({ message: "Gönderi başarıyla güncellendi", data: updatedPost });
    } catch (error) {
        return res.status(404).json({
            message: "Gönderi güncellenirken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

// Remove Post controller
export const removePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Geçerli bir gönderi ID'si giriniz." });
        }
        const existingPost = await getPostById(Number(id))

        if (!existingPost) {
            return res.status(404).json({ message: "Silincek olan gönderi bulunamadı." });
        }

        const deletedPost = await deletePost(Number(id))
        res.status(201).json({ message: "Gönderi başarıyla silindi" })

    } catch (error) {
        return res.status(404).json({
            message: "Gönderi silinirken bir hata oluştu",
            error: (error as Error).message
        });
    }
}