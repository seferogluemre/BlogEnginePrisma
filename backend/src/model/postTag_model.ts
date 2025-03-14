import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

interface CreatePostTagBody {
    post_id: number;
    tag_id: number;
}

// Create Post Tag
export const createPostTag = async (data: CreatePostTagBody) => {
    return await prisma.postTag.create({
        data: {
            post_id: data.post_id,
            tag_id: data.tag_id
        },
        select: {
            post_id: true,
            tag_id: true,
        }
    });
};


export const deletePostTag = async (postId: number, tagId: number) => {
    return await prisma.postTag.delete({
        where: {
            post_id_tag_id: {
                post_id: postId,
                tag_id: tagId
            }
        },
    });
};