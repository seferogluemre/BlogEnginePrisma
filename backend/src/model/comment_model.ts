import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

interface CreateCommentBody {
    content: string;
    commenter_name: string;
    post_id: number;
}

interface UpdateCommentBody {
    content: string;
    commenter_name: string;
    post_id: number;
}


// List Post Comments
export const getComments = async () => {
    return await prisma.postComment.findMany({
        select: {
            id: true,
            content: true,
            commenter_name: true,
            post_id: true,
            created_at: true,
        }
    })
}

// Get Post Comment
export const getCommentById = async (id: number) => {
    if (!id) {
        return { message: "Boş Id alanı lütfen bir id giriniz" }
    }
    return await prisma.postComment.findUnique({
        where: {
            id: id,
        },
        select: {
            commenter_name: true,
            content: true,
            created_at: true,
            post_id: true
        }
    })
}

// Create Post comment
export const createComment = async (data: CreateCommentBody) => {
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
    })
}

export const updateComment = async (id: number, data: UpdateCommentBody) => {
    if (id !== null) {
        return await prisma.postComment.update({
            where: { id: Number(id) },
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
    } else {
        return { message: "Boş id alanı gönderilemez lütfen tekrar deneyin" }
    }
}

export const deleteComment = async (id: number) => {
    return await prisma.postComment.delete({
        where: { id: Number(id) },
        select: {
            id: true
        }
    })
}