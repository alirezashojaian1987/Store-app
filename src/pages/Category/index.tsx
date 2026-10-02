import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getProductsByCategory } from "../../api/api";
import type { Product } from "../../types/product";
import ProductGrid from "../../Components/ProductGrid";

import styles from "./Category.module.scss"
import { ChevronLeft } from "lucide-react";

export default function CategoryPage(){
    const { category='' }=useParams<{category:string}>();
    const [products, setProducts]=useState<Product[]>([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState<string | null>(null);

    async function loadProducts(){
        setLoading(true);
        setError(null);

        try {
            const data = await getProductsByCategory(category);
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadProducts();
    }, [category]);

    return(
        <section className={styles.categoryPage}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <NavLink to="/" className={styles.backBtn}>
                        <ChevronLeft size={16}/>
                        Back to shop
                    </NavLink>

                    <h1 className={styles.title}>{category}</h1>
                    <p className={styles.subtitle}>
                        {loading
                            ? 'Loading products...'
                            : `${products.length} product${products.length === 1 ? '' : 's'}`
                        }
                    </p>
                </header>

                <ProductGrid
                    products={products}
                    loading={loading}
                    error={error}
                    onRetry={loadProducts}
                    emptyMessage={`No products in ${category} yet.`}
                />
            </div>
        </section>
    );
}