import { PrismaClient } from "@prisma/client";
import { CreatePostBody, PostQueryProps, UpdatePostBody, WhereConditionProps } from "src/types/post_types";

const prisma = new PrismaClient();

export class PostModel {

    static async list(query: PostQueryProps) {
        let whereConditions: WhereConditionProps = {};

        if (query.category) {
            whereConditions.category_id = Number(query.category);
        }

        if (query.tag_id) {
            whereConditions.post_tags = {
                some: {
                    tag_id: Number(query.tag_id)
                }
            };
        }

        if (query.status === "published") {
            whereConditions.published_at = { not: null };
        } else if (query.draft === "true") {
            whereConditions.published_at = { equals: null };
        }

        if (query.showDeleted === 'true') {
            // Handle showDeleted condition if needed
        } else if (query.onlyDeleted === 'true') {
            whereConditions.deleted_at = { not: null };
        } else {
            whereConditions.deleted_at = null;
        }

        const posts = await prisma.post.findMany({
            where: whereConditions,
            select: {
                id: true,
                title: true,
                content: true,
                category_id: true,
                created_at: true,
                published_at: true,
                post_tags: true,
                post_comments: true,
            }
        });

        return posts;
    }

    static async getById(id: number) {
        if (!id) {
            return { message: "Boş Id alanı lütfen bir id giriniz" };
        }

        return await prisma.post.findUnique({
            where: {
                id: id,
                deleted_at: null
            },
            select: {
                id: true,
                title: true,
                content: true,
                category_id: true,
                created_at: true,
                published_at: true,
                post_tags: true,
                post_comments: true,
            }
        });
    }

    static async create(data: CreatePostBody) {
        return await prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                category_id: data.category_id ?? undefined,
            },
            select: {
                title: true,
                content: true,
                category_id: true
            }
        });
    }

    static async update(id: number, data: UpdatePostBody) {
        if (id !== null) {
            return await prisma.post.update({
                where: { id: Number(id) },
                data: {
                    title: data.title,
                    content: data.content,
                    category_id: data.category_id,
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    category_id: true,
                }
            });
        } else {
            return { message: "Boş id alanı gönderilemez lütfen tekrar deneyin" };
        }
    }

    static async delete(id: number) {
        return await prisma.post.update({
            where: { id: Number(id) },
            data: {
                deleted_at: new Date()
            },
            select: {
                id: true
            }
        });
    }
}
