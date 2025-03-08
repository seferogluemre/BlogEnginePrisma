import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateCategoryBody {
    name: string;
}

export const createCategory = async (data: CreateCategoryBody) => {
    return await prisma.category.create({ data: data });
}
