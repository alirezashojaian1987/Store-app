import axios from "axios";
import type { Product } from "../types/product";

const api=axios.create({
    baseURL:"https://fakestoreapi.com",
});

export async function getCategories():Promise<string[]>{
    const { data } = await api.get<string[]>("/products/categories");
    return data;
}

export async function getProducts():Promise<Product[]>{
    const { data } = await api.get<Product[]>("/products");
    return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]>{
    const { data } = await api.get<Product[]>(
        `/products/category/${encodeURIComponent(category)}`
    );

    return data;
}