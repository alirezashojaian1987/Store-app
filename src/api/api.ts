import axios from "axios";
import type { Product } from "../types/product";

const api=axios.create({
    baseURL:"https://dummyjson.com",
});

interface ProductListResponse{
    products:Product[];
    total:number;
    skip:number;
    limit:number;
}

export async function getCategories():Promise<string[]>{
    const { data } = await api.get<string[]>("/products/category-list");
    return data;
}

export async function getProducts():Promise<Product[]>{
    const { data } = await api.get<ProductListResponse>("/products?limit=100");
    return data.products;
}

export async function getProductById(id:string): Promise<Product>{
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]>{
    const { data } = await api.get<ProductListResponse>(
        `/products/category/${encodeURIComponent(category)}`
    );

    return data.products;
}