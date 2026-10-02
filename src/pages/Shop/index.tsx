import { useEffect, useState, useMemo } from "react"
import { getProducts } from "../../api/api"
import { useDebounce } from "../../hooks/useDebounce"
import type { Product } from "../../types/product"
import ProductCard from "../../Components/ProductCard"

import styles from "./Shop.module.scss";
import { Search } from "lucide-react"

export default function ShopPage(){
    const [products, setProducts]=useState<Product[]>([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState<string | null>(null);
    const [search, setSearch]=useState("");

    const debouncedSearch=useDebounce(search, 250);

    async function loadProducts(){
        setLoading(true);
        setError(null);

        try{
            const data=await getProducts();
            setProducts(data);
        } catch(err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadProducts();
    }, []);

    const filtered=useMemo(()=>{
        const q=debouncedSearch.trim().toLowerCase();
        if(!q) return products;
        return products.filter((p)=>p.title.toLowerCase().includes(q));
    }, [products, debouncedSearch]);

    return(
        <section className={styles.shop}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Shop</h1>
                        <p className={styles.subtitle}>
                            {loading
                                ? 'Loading products...'
                                : `${filtered.length} product${filtered.length===1 ? '' : 's'}`
                            }
                        </p>
                    </div>

                    <div className={styles.searchWrap}>
                        <Search size={18} className={styles.searchIcon} />
                        <input
                            type="search"
                            className={styles.search}
                            placeholder="Search products here..."
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            aria-label="Search products"
                        />
                    </div>
                </header>

                {loading && (
                    <div className={styles.grid}>
                        {Array.from({ length:8 }).map((_,i)=>(
                            <div key={i} className={styles.skeleton}/>
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <div className={styles.state}>
                        <p className={styles.stateMsg}>{error}</p>
                        <button onClick={loadProducts} className={styles.retryBtn}>
                            Try again
                        </button>
                    </div>
                )}

                {!loading && !error && filtered.length===0 && (
                    <div className={styles.state}>
                        <p className={styles.stateMsg}>
                            No products match "{debouncedSearch}".
                        </p>
                    </div>
                )}

                {!loading && !error && filtered.length > 0 && (
                    <div className={styles.grid}>
                        {filtered.map((product)=>(
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}