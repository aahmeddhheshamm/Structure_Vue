
export interface TagType {
        id: number;
        name: string;
        slug: string;
        is_active: number;
        active_status: string;
        active_class: string;
        type: number[];
        products_count: number | null;
        meta_description: string;
        meta_keywords: string;
        meta_title: string;
        created_at: string;
        updated_at: string;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links?: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export interface ApiTagsResponse {
    data: TagType[];
    meta: PaginationMeta;
}

export interface ApiTagResponse {
    name: {
        en: string;
        ar: string;
    },
    type: number[],
    is_active: number;
}
export interface ApiTagRequest {
    name: {
        en: string;
        ar: string;
    },
    type: number[];
    is_active: number;
    meta_description: null;
    meta_keywords: null;
    meta_title: null;
}