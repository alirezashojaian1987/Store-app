import type { Product } from "../../types/product";
import ProductCard from "../ProductCard";
import styles from "./ProductGrid.module.scss";

interface ProductGridProps{
    products:Product[];
    loading:boolean;
    error: string | null;
    onRetry:()=>void;
    emptyMessage?:string;
}

export default function ProductGrid({ products, loading, error, onRetry, emptyMessage='No products found'}:ProductGridProps){
    if(loading){
        return(
            <div className={styles.grid}>
                {Array.from({ length:8 }).map((_,i)=>(
                    <div key={i} className={styles.skeleton}/>
                ))}
            </div>
        );
    }

    if(error){
        return(
            <div className={styles.state}>
                <p className={styles.stateMsg}>{error}</p>
                <button onClick={onRetry} className={styles.retryBtn}>
                    Try again
                </button>
            </div>
        );
    }

    if(products.length===0){
        return(
            <div className={styles.state}>
                <p className={styles.stateMsg}>
                    {emptyMessage}
                </p>
            </div>
        );
    }

    return(
        <div className={styles.grid}>
            {products.map((product)=>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}