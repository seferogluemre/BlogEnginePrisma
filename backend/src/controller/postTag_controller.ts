import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { createPostTag, deletePostTag } from "src/model/postTag_model";
import { CreatePostTagDto } from "src/dto/postTag/CreatePostTagDto";

// Create  Post Tag controller
export const addPostTag = async (req: Request, res: Response) => {
    try {
        const postTagDto = plainToInstance(CreatePostTagDto, req.body)

        const errors = await validate(postTagDto)

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validasyon hatası lütfen alanları kontrol ediniz",
                error: errors.map(err => err.constraints)
            })
        }

        const createdPostTag = await createPostTag(postTagDto)

        return res.status(201).json({
            message: "Gönderi etiketi başarıyla oluşturuldu",
            category: createdPostTag,
        });
    } catch (error) {
        return res.status(404).json({
            message: "Gönderi etiketi oluşturulurken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

export const removePostTag = async (req: Request, res: Response) => {
    try {
        const { postId, tagId } = req.params;
        if (!postId || !tagId) {
            return res.status(400).json({
                message: "Hatalı gönderi veya etiket id'si lütfen tekrar deneyin"
            })
        }
        const deletedTag = await deletePostTag(Number(postId), Number(tagId));

        return res.status(200).json({ message: "Etiket başarıyla silindi" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Etiket silinirken hata oluştu" });
    }
};