import { Request, Response } from "express";
import { TagModel } from "src/model/tag_model";

export class TagController {
    static async list(req: Request, res: Response): Promise<void> {
        try {
            const tags = await TagModel.getAll();
            if (tags.length > 0) {
                res.status(200).json({ data: tags });
            } else {
                res.status(404).json({ message: "Etiket Listesi boş" });
            }
        } catch (error) {
            res.status(500).json({ message: "Etiket Listesi alınırken hata oluştu", error });
        }
    }

    static async get(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir etiket ID'si giriniz." });
            }
            const tag = await TagModel.get(Number(id));
            if (tag) {
                res.status(200).json(tag);
            } else {
                res.status(404).json({ message: "Etiket bulunamadı" });
            }
        } catch (error) {
            res.status(500).json({ message: "Etiket alınırken hata oluştu", error });
        }
    }

    static async add(req: Request, res: Response): Promise<void> {
        try {
            const createdTag = await TagModel.create(req.body);
            res.status(201).json({ message: "Etiket başarıyla oluşturuldu", data: createdTag });
        } catch (error) {
            res.status(500).json({ message: "Etiket oluşturulurken hata oluştu", error });
        }
    }

    static async edit(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir etiket ID'si giriniz." });
            }
            const updatedTag = await TagModel.update(Number(id), req.body);
            res.status(200).json({ message: "Etiket başarıyla güncellendi", data: updatedTag });
        } catch (error) {
            res.status(500).json({ message: "Etiket güncellenirken hata oluştu", error });
        }
    }

    static async remove(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir etiket ID'si giriniz." });
            }
            await TagModel.delete(Number(id));
            res.status(200).json({ message: "Etiket başarıyla silindi" });
        } catch (error) {
            res.status(500).json({ message: "Etiket silinirken hata oluştu", error });
        }
    }
}
