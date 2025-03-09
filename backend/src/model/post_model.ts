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

interface QueryProps {
    category?: string;
    status?: string;
    draft?: string;
    all?: string;
    showDeleted?: string;
    onlyDeleted?: string;
}

interface WhereConditionProps {
    category_id?: number | Prisma.IntFilter;
    status?: string | null;
    draft?: boolean | null;
    published_at?: { not: null } | null;
    deleted_at?: { not: null } | null;
}


// Posts List
export const getPosts = async (query: QueryProps) => {
    let whereConditions: WhereConditionProps = {};

    if (query.category) {
        whereConditions.category_id = Number(query.category);
    }


    if (query.status === "published") {
        whereConditions.published_at = { not: null };
    }

    else if (query.draft === "true") {
        whereConditions.published_at = null;
    }

    // Deleted filtreleri
    if (query.showDeleted === 'true') {
    } else if (query.onlyDeleted === 'true') {
        whereConditions.deleted_at = { not: null };
    } else {
        whereConditions.deleted_at = null;
    }

    // Prisma sorgusu
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