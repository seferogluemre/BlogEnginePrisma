import { PrismaClient } from "@prisma/client";
import { CategoryQueryProps, CreateCategoryBody, UpdateCategoryBody } from "src/types/category_types";

const prisma = new PrismaClient();

export class CategoryModel {
    static async getAll(query: CategoryQueryProps) {
        try {
            let queryBuilder = await prisma.category.findMany({
                where: {
                    deleted_at: query.showDeleted === "true" ? undefined : null
                },
                select: {
                    id: true,
                    name: true,
                    deleted_at: true,
                }
            });

            if (query.onlyDeleted) {
                queryBuilder = await prisma.category.findMany({
                    where: {
                        deleted_at: { not: null }
                    },
                    select: {
                        id: true,
                        name: true,
                        deleted_at: true,
                    }
                })
            }
            return queryBuilder;
        } catch (error) {
            console.error("Hata tespit edildi", (error as Error).message)
        }
    }

    static async getById(id: number) {
        try {
            if (!id) {
                return { message: "Boş Id alanı lütfen bir id giriniz" }
            }
            return await prisma.category.findUnique({
                where: {
                    id: id,
                    deleted_at: null
                },
                select: {
                    id: true,
                    name: true,
                    created_at: true,
                }
            })
        } catch (error) {
            console.error("Hata tespit edildi", (error as Error).message)
        }
    }

    static async create(data: CreateCategoryBody) {
        return await prisma.category.create({ data: data });
    }

    static async update(id: number, data: UpdateCategoryBody) {
        try {
            if (data.name !== null) {
                return await prisma.category.update({
                    where: { id: Number(id) },
                    data: {
                        name: data.name
                    },
                    select: {
                        id: true,
                        name: true,
                    }
                });
            } else {
                return { message: "Boş isim alanı gönderilemez lütfen tekrar deneyin" }
            }
        } catch (error) {
            console.error("Hata tespit edili", error)
        }
    }

    static async delete(id: number) {
        try {
            return await prisma.category.update({
                where: { id: Number(id) },
                data: {
                    deleted_at: new Date()
                },
                select: {
                    id: true
                }
            })
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }
}
