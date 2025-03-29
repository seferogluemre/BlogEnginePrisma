import { Prisma, PrismaClient } from "@prisma/client";
import { CommentQueryProps, CreateCommentBody, UpdateCommentBody, WhereCondition } from "src/types/comment_types";

const prisma = new PrismaClient();

export class CommentModel {
    static async getAll(query: CommentQueryProps) {
        const whereCondition: WhereCondition = {};

        if (query.post) {
            whereCondition.post_id = query.post;
        }

        if (query.commenter_name) {
            whereCondition.commenter_name = {
                contains: query.commenter_name,
            };
        }

        return prisma.postComment.findMany({
            where: whereCondition,
        });
    }

    static async getById(id: number) {
        if (!id) {
            throw new Error("Boş Id alanı lütfen bir id giriniz");
        }
        return await prisma.postComment.findUnique({
            where: { id },
            select: {
                commenter_name: true,
                content: true,
                created_at: true,
                post_id: true
            }
        });
    }

    static async create(data: CreateCommentBody) {
        return await prisma.postComment.create({
            data: {
                content: data.content,
                commenter_name: data.commenter_name,
                post_id: data.post_id,
            },
            select: {
                content: true,
                commenter_name: true,
                post_id: true
            }
        });
    }

    static async update(id: number, data: UpdateCommentBody) {
        if (!id) {
            throw new Error("Boş id alanı gönderilemez lütfen tekrar deneyin");
        }
        return await prisma.postComment.update({
            where: { id },
            data: {
                content: data.content,
                commenter_name: data.commenter_name,
                post_id: data.post_id,
            },
            select: {
                content: true,
                commenter_name: true,
                post_id: true,
            }
        });
    }

    static async delete(id: number) {
        return await prisma.postComment.delete({
            where: { id },
            select: {
                id: true
            }
        });
    }
}
