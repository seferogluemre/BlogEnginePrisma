import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Types
interface CreateCategoryBody {
    name: string;
}
interface UpdateCategoryBody {
    name: string;
}

export interface QueryProps {
    showDeleted?: string;
    onlyDeleted?: string;
}

// Get Category List 
export const getCategories = async (query: QueryProps) => {

    let queryBuilder = await prisma.category.findMany({
        where: {
            deleted_at: query.showDeleted === "true" ? undefined : null
        },
        select: {
            id: true,
            name: true,
            deleted_at: true
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
};

// Get Category
export const getCategoryById = async (id: number) => {
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
}

// Create Category
export const createCategory = async (data: CreateCategoryBody) => {
    return await prisma.category.create({ data: data });
}

// Update Category
export const updateCategory = async (id: number, data: UpdateCategoryBody) => {
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
}

// Delete Category 
export const deleteCategory = async (id: number) => {
    return await prisma.category.update({
        where: { id: Number(id) },
        data: {
            deleted_at: new Date()
        },
        select: {
            id: true
        }
    })
}