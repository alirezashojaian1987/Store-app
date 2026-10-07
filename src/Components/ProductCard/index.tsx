import { NavLink } from "react-router-dom";
import type { Product } from "../../types/product";

import styles from "./productCard.module.scss";
import { Check, ShoppingCart, Star } from "lucide-react";

import { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";

interface ProductCardProps{
    product:Product;
}

export default function ProductCard({ product }: ProductCardProps){
    const { id, title, price, category, thumbnail, rating, reviews }=product;

    const { addToCart }=useCart();
    const [added, setAdded]=useState(false);

    useEffect(()=>{
        if(!added) return;
        const t=setTimeout(()=>setAdded(false), 1200);
        return()=>clearTimeout(t);
    }, [added]);

    function handleAddToCart(){
        addToCart(product,1);
        setAdded(true);
    }

    return(
        <article className={styles.card}>
            <NavLink to={`/product/${id}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>
                    <span className={styles.catBadge}>{category}</span>
                    <img
                        src={thumbnail}
                        alt={title}
                        className={styles.image}
                        loading="lazy"
                    />
                </div>
            </NavLink>

            <div className={styles.body}>
                <NavLink to={`/product/${id}`} className={styles.titleLink}>
                    <h3 className={styles.title}>{title}</h3>
                </NavLink>

                <div className={styles.rating}>
                    <Star size={14} className={styles.star}/>
                    <span className={styles.ratingRate}>{rating.toFixed(1)}</span>
                    <span className={styles.ratingCount}>({reviews.length})</span>
                </div>

                <div className={styles.footer}>
                    <span className={styles.price}>${price.toFixed(2)}</span>
                    <button
                        type="button"
                        className={`${styles.addBtn} ${added ? styles.added : ""}`}
                        onClick={handleAddToCart}
                        aria-label={`Add ${title} to cart`}
                    >
                        {added ? <Check size={16}/> : <ShoppingCart size={16}/>}
                        <span>{added ? 'Added' : 'Add'}</span>
                    </button>
                </div>
            </div>
        </article>
    );
}