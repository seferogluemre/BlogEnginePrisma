import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { createPostTag, deletePostTag } from "src/model/postTag_model";
import { CreatePostTagDto } from "src/dto/postTag/CreatePostTagDto";

// Create  Post Tag controller
export const addPostTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const postTagDto = plainToInstance(CreatePostTagDto, req.body)

        const errors = await validate(postTagDto)

        if (errors.length > 0) {
            res.status(400).json({
                message: "Validasyon hatası lütfen alanları kontrol ediniz",
                error: errors.map(err => err.constraints)
            })
        }

        const createdPostTag = await createPostTag(postTagDto)

        res.status(201).json({
            message: "Gönderi etiketi başarıyla oluşturuldu",
            category: createdPostTag,
        });
    } catch (error) {
        res.status(404).json({
            message: "Gönderi etiketi oluşturulurken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

export const removePostTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId, tagId } = req.params;
        if (!postId || !tagId) {
            res.status(400).json({
                message: "Hatalı gönderi veya etiket id'si lütfen tekrar deneyin"
            })
        }
        const deletedTag = await deletePostTag(Number(postId), Number(tagId));

        res.status(200).json({ message: "Etiket başarıyla silindi" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Etiket silinirken hata oluştu" });
    }
};