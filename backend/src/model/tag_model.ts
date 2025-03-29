import { PrismaClient } from "@prisma/client";
import { CreateTagBody, UpdateTagBody } from "src/types/tag_types";

const prisma = new PrismaClient

// Tags List
export const getTags = async () => {
    return await prisma.tag.findMany({
        select: {
            id: true,
            name: true,
            post_tags: true
        }
    })
}

// Get tag
export const getTagById = async (id: number) => {
    if (!id) {
        return { message: "Boş Id alanı lütfen bir id giriniz" }
    }
    return await prisma.tag.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            post_tags: true
        }
    })
}

// Create Tag
export const createTag = async (data: CreateTagBody) => {
    return await prisma.tag.create({
        data: {
            name: data.name,
        },
        select: {
            id: true,
            name: true,
            post_tags: true
        }
    });
};

// Update Tag
export const updateTag = async (id: number, data: UpdateTagBody) => {
    if (id !== null) {
        return await prisma.tag.update({
            where: { id: Number(id) },
            data: {
                name: data.name
            },
            select: {
                id: true,
                name: true,
                post_tags: true
            }
        });
    } else {
        return { message: "Boş id alanı gönderilemez lütfen tekrar deneyin" }
    }
}

// Delete Tag
export const deleteTag = async (id: number) => {
    return await prisma.tag.delete({
        where: { id: Number(id) },
        select: {
            id: true
        }
    })
}