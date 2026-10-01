const BASE_URL="https://fakestoreapi.com";

export async function getCategories(): Promise<string[]>{
    const res=await fetch(`${BASE_URL}/products/categories`);

    if(!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}