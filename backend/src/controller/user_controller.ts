import { Request, Response } from 'express'
import { UserModel } from 'src/model/user_model'

export class UserController {
    static async add(req: Request, res: Response): Promise<void> {
        try {
            const createdUser = await UserModel.create(req.body);
            res.status(201).json({ data: createdUser })
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }

    static async edit(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir Kullanıcı ID'si giriniz." });
                return;
            }
            const existingUser = await UserModel.getById(Number(id))
            if (!existingUser) {
                res.status(404).json({ message: "Kullanıcı bulunamadı" })
            } else {
                const updatedUser = await UserModel.update(Number(id), req.body);
                res.status(201).json({ data: updatedUser })
            }
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }

    static async get(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir Kullanıcı ID'si giriniz." });
                return;
            }
            const user = await UserModel.getById(Number(id));

            res.status(200).json({ data: user })
        } catch (error) {
            console.error("Hata tespit edild", error)
        }
    }

    static async remove(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: "Geçerli bir Kullanıcı ID'si giriniz." });
                return;
            }

            const existingUser = await UserModel.getById(Number(id));
            if (existingUser) {
                res.status(404).json({ message: "Kullanıcı bulunamadı" })
            }
            const deletedUser = await UserModel.delete(Number(id));
            res.status(201).json({ data: deletedUser })

        } catch (error) {
            console.error("Hata tespit edild", error)
        }
    }

    static async list(req: Request, res: Response): Promise<void> {
        try {
            const users = await UserModel.getAll();

            res.status(200).json({ data: users })
        } catch (error) {
            console.error("Hata tespit edild", error)
        }
    }
}