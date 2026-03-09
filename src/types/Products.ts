
export interface ProductType {
    id: number;
    name: string;
    image?: string;
    price?: string;
    quantity?: number;
    category_id?: number;
    category?: string;
    sub_categories?: string;
    status?: string;
    created_at?: string;
}

export interface ApiProductsResponse {
    data: ProductType[];
    pagination: {
        total: number;
        last_page: number;
        per_page: number;
        current_page: number;
    };
}
export interface ApiProductRequest {
    name: string,
    price: string,
    category: string | null;
    sub_categories: string | null;
}