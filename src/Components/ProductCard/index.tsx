import { NavLink } from "react-router-dom";
import type { Product } from "../../types/product";

import { ShoppingCart, Star } from "lucide-react";
import styles from "./productCard.module.scss";

interface ProductCardProps{
    product:Product;
}

export default function ProductCard({ product }: ProductCardProps){
    const { id, title, price, category, thumbnail, rating, reviews }=product;

    function handleAddToCart(){
        console.log("Add to cart:", {id,title,price});
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
                        className={styles.addBtn}
                        onClick={handleAddToCart}
                        aria-label={`Add ${title} to cart`}
                    >
                        <ShoppingCart size={16}/>
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </article>
    );
}