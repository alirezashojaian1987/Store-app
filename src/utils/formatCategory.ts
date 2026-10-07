export function formatCategory(cat:string):string{
    return cat
        .replace(/^mens-/, "men's ")
        .replace(/^womens-/, "women's ")
        .replace(/-/g, ' ');
}