import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateCategoryDTO } from "../dto/category/CreateCategoryDto";
import { createCategory } from "../model/category_model";

export const addCategory = async (req: Request, res: Response) => {
    try {

        const categoryDto = plainToInstance(CreateCategoryDTO, req.body);
        const errors = await validate(categoryDto);

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validasyon hatası, lütfen alanları kontrol ediniz",
                errors: errors.map(err => err.constraints),
            });
        }

        const createdCategory = await createCategory({
            name: categoryDto.name
        });

        return res.status(201).json({
            message: "Kategori başarıyla oluşturuldu",
            category: createdCategory,
        });

    } catch (error) {
        console.error("Category creation error:", error);
        return res.status(500).json({
            message: "Kategori oluşturulurken bir hata oluştu",
            error: (error as Error).message
        });
    }
};