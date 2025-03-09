import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { createPostTag } from "src/model/postTag_model";
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

