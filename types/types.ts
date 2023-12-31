declare interface AddBlog {
    id: string
    title: string
    text: string
    created_at: string
    updated_at: string
    category_id: string
    image_url: string
    is_published: boolean
    url_param: string
}

declare interface UpdateBlog {
    title?: string
    text?: string
    updated_at?: string
    category_id?: string
    image_url?: string
    is_published?: boolean
    url_param?: string
}

declare interface GetBlog {
    id: string
    title: string
    created_at: string
    comment_counts: number
    image_url: string
    is_published?: boolean
    url_param: string
}

declare interface GetBlogDetail {
    id: string
    title: string
    text: string
    image_url: string
    created_at: string
    comments: { count: number }[]
    category?: string
    category_id: string
    is_published?: boolean
    tags: { id: string, name?: string }[]
    url_param: string
}

// declare interface GetComment {
//     id: string
//     user_id: string
//     text: string
//     time: string
// }

declare interface BlogSnapshots {
    blogs: GetBlog[] | []
    totalPage: number
}


declare interface BlogSnapshot {
    data: GetBlogDetail | {}
}

declare interface CommentDraf {
    uuid?: string
    parent_id: any;
    name?: string;
    email?: string;
    text: string;
    post_id: string
}

declare interface PostComment {
    id: string;
    text: string;
    user_id: string;
    post_id: string;
    time: string;
    parent_id: string;
}

declare interface GetComment {
    id: string
    parent_id: string | null
    post_id: string
    public_users: { name: string, avatar_url: string | null, user_role: string }
    replies: GetComment[]
    text: string
    time: string
    user_id: string
}

declare interface CommentSnapshots {
    comments: GetComment[]
    comment_counts: number
}

declare interface ImageMetaData {
    cacheControl: string;
    contentLength: number;
    eTag: string;
    httpStatusCode: number;
    lastModified: string;
    mimetype: string;
    size: number;
}

declare interface ImageData {
    created_at: string;
    id: string;
    metadata: ImageMetaData;
    name: string;
    updated_at: string;
    url?: string;
    post?: string;
}