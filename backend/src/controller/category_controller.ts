import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateCategoryDto } from "../dto/category/CreateCategoryDto";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../model/category_model";
import { UpdateCategoryDto } from "src/dto/category/UpdateCategoryDto";

// List Categories Controller
export const listCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await getCategories(req.query);
        if (categories.length >= 0) {
            res.status(200).json({ data: categories })
        } else {
            res.status(404).json({ message: "Kategori Listesi boş" })
        }
    } catch (error) {
        res.status(404).json({
            message: "Kategori Listesi alınırken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

export const getCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Geçerli bir kategori ID'si giriniz." });
        }

        const category = await getCategoryById(Number(id))
        if (category) {
            res.status(200).json(category)
        } else {
            res.status(404).json({ message: "Kategori bulunamadı" })
        }
    } catch (error) {
        res.status(404).json({
            message: "Kategori alınırken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

// Add Category Controller
export const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {

        const categoryDto = plainToInstance(CreateCategoryDto, req.body);
        const errors = await validate(categoryDto);

        if (errors.length > 0) {
            res.status(400).json({
                message: "Validasyon hatası, lütfen alanları kontrol ediniz",
                errors: errors.map(err => err.constraints),
            });
        }

        const createdCategory = await createCategory({
            name: categoryDto.name
        });

        res.status(201).json({
            message: "Kategori başarıyla oluşturuldu",
            category: createdCategory,
        });
    } catch (error) {
        res.status(404).json({
            message: "Kategori oluşturulurken bir hata oluştu",
            error: (error as Error).message
        });
    }
};

// Update Category Controller
export const editCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Geçerli bir kategori ID'si giriniz." });
        }

        const categoryDto = plainToInstance(UpdateCategoryDto, req.body)

        const errors = await validate(categoryDto)

        if (errors.length > 0) {
            res.status(400).json({
                message: "Validasyon hatası lütfen kontrol edip tekrar deneyin",
                error: errors.map(err => err.constraints)
            })
        }

        const existingCategory = await getCategoryById(Number(id))

        if (!existingCategory) {
            res.status(404).json({ message: "Güncellenecek kategori bulunamadı." });
        }

        const updatedCategory = await updateCategory(Number(id), categoryDto)

        res.status(200).json({ message: "Kategori başarıyla güncellendi", data: updatedCategory });

    } catch (error) {
        res.status(404).json({
            message: "Kategori güncellenirken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

// Delete category controller
export const removeCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Geçerli bir kategori ID'si giriniz." });
        }

        const existingCategory = await getCategoryById(Number(id))

        if (!existingCategory) {
            res.status(404).json({ message: "Silincek olan kategori bulunamadı." });
        }

        const deletedCategory = await deleteCategory(Number(id))
        res.status(201).json({ message: "Kategori Başarıyla kaldırıldı" })

    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
    }
}