import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { createTag, deleteTag, getTagById, getTags, updateTag } from "src/model/tag_model";
import { CreateTagDto } from "src/dto/tag/CreateTagDto";
import { UpdateTagDto } from "src/dto/tag/UpdateTagDto";

// List Tags Controller
export const listTags = async (req: Request, res: Response): Promise<void> => {
    try {
        const tags = await getTags();
        if (tags.length >= 0) {
            res.status(200).json({ data: tags })
        } else {
            res.status(404).json({ message: "Etiket Listesi boş" })
        }
    } catch (error) {
        res.status(404).json({
            message: "Etiket Listesi alınırken bir hata oluştu",
            error: (error as Error).message
        });
    }
}
// Get Tag Controller
export const getTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Geçerli bir etiket ID'si giriniz." });
        }
        const tag = await getTagById(Number(id))
        if (tag) {
            res.status(200).json(tag)
        } else {
            res.status(404).json({ message: "Etiket bulunamadı" })
        }
    } catch (error) {
        res.status(404).json({
            message: "Etiket alınırken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

// Create Tag controller
export const addTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const tagDto = plainToInstance(CreateTagDto, req.body)

        const errors = await validate(tagDto)

        if (errors.length > 0) {
            res.status(400).json({
                message: "Validasyon hatası lütfen alanları kontrol ediniz",
                error: errors.map(err => err.constraints)
            })
        }

        const createdTag = await createTag(tagDto)

        res.status(201).json({
            message: "Etiket başarıyla oluşturuldu",
            category: createdTag,
        });
    } catch (error) {
        res.status(404).json({
            message: "Etiktet oluşturulurken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

// Update Tag controller
export const editTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Geçerli bir etiket ID'si giriniz." });
        }
        const tagDto = plainToInstance(UpdateTagDto, req.body)

        const errors = await validate(tagDto)

        if (errors.length > 0) {
            res.status(400).json({
                message: "Validasyon hatası lütfen tekrar deneyiniz",
                error: errors.map(err => err.constraints)
            })
        }

        const tag = await getTagById(Number(id))
        if (!tag) {
            res.status(404).json({ message: "Güncellenicek etiket bulunamadı" })
        }

        const updatedTag = await updateTag(Number(id), tagDto)

        res.status(200).json({ message: "Etiket başarıyla güncellendi", data: updatedTag });
    } catch (error) {
        res.status(404).json({
            message: "Etiket güncellenirken bir hata oluştu",
            error: (error as Error).message
        });
    }
}

// Remove Tag controller
export const removeTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: "Geçerli bir etiket ID'si giriniz." });
        }
        const existingTag = await getTagById(Number(id))

        if (!existingTag) {
            res.status(404).json({ message: "Silincek olan etiket bulunamadı." });
        }

        const deletedTag = await deleteTag(Number(id))
        res.status(201).json({ message: "Etiket başarıyla silindi" })

    } catch (error) {
        res.status(404).json({
            message: "Etiket silinirken bir hata oluştu",
            error: (error as Error).message
        });
    }
}