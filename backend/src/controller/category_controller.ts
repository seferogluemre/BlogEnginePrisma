import { Request, Response } from "express";
import { CategoryModel } from "src/model/category_model";

export class CategoryController {
    static async list(req: Request, res: Response): Promise<void> {
        try {
            const categories = await CategoryModel.getAll(req.query);
            res.status(200).json({ data: categories });
        } catch (error) {
            res.status(404).json({
                message: "Kategori Listesi alınırken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    static async get(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir kategori ID'si giriniz." });
                return;
            }

            const category = await CategoryModel.getById(Number(id));
            res.status(200).json({ data: category });
        } catch (error) {
            res.status(404).json({
                message: "Kategori alınırken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    static async add(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;
            const createdCategory = await CategoryModel.create({ name: name });
            res.status(201).json({ data: createdCategory });
        } catch (error) {
            res.status(404).json({
                message: "Kategori oluşturulurken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    static async edit(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir kategori ID'si giriniz." });
                return;
            }
            const body = req.body;
            const updatedCategory = await CategoryModel.update(Number(id), body);
            res.status(200).json({ data: updatedCategory });
        } catch (error) {
            res.status(404).json({
                message: "Kategori güncellenirken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    static async remove(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir kategori ID'si giriniz." });
                return;
            }

            await CategoryModel.delete(Number(id));
            res.status(201).json({ message: "Kategori başarıyla kaldırıldı" });
        } catch (error) {
            res.status(404).json({ message: (error as Error).message });
        }
    }
}
