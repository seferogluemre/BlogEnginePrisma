import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Types
interface CreatePostBody {
    title: string;
    content: string;
    category_id?: number | null
}

interface UpdatePostBody {
    title?: string;
    content?: string;
    category_id?: number
}

interface PostQueryProps {
    category?: string;
    status?: string;
    draft?: string;
    all?: string;
    showDeleted?: string;
    onlyDeleted?: string;
    tag_id: number;
}

interface WhereConditionProps {
    category_id?: number;
    tag_id?: number;
    status?: string;
    draft?: boolean;
    published_at?: { not: null } | { equals: null };
    deleted_at?: { not: null } | null;
    post_tags?: {
        some: {
            tag_id: number;
        };
    };
}

export const getPosts = async (query: PostQueryProps) => {
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
    } else if (query.onlyDeleted === 'true') {
        whereConditions.deleted_at = { not: null };
    } else {
        whereConditions.deleted_at = null;
    }

    const queryBuilder = await prisma.post.findMany({
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

    return queryBuilder;
};

// Get Post
export const getPostById = async (id: number) => {
    if (!id) {
        return { message: "Boş Id alanı lütfen bir id giriniz" }
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
    })
}

// Create Post
export const createPost = async (data: CreatePostBody) => {
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
};

// Update Post
export const updatePost = async (id: number, data: UpdatePostBody) => {
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
        return { message: "Boş id alanı gönderilemez lütfen tekrar deneyin" }
    }
}

// Delete Post
export const deletePost = async (id: number) => {
    return await prisma.post.update({
        where: { id: Number(id) },
        data: {
            deleted_at: new Date()
        },
        select: {
            id: true
        }
    })
}