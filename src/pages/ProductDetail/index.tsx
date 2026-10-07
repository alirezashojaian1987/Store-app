import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { ChevronRight, ShoppingCart } from "lucide-react"
import { formatCategory } from "../../utils/formatCategory"
import { getProductById } from "../../api/api"
import type { Product } from "../../types/product"

import RatingStars from "../../Components/RatingStars"
import QuantitySelector from "../../Components/QuantitySelector"
import ProductGallery from "../../Components/ProductGallery"
import ReviewsSection from "../../Components/Review/ReviewsSection"

import styles from "./ProductDetail.module.scss";

export default function ProductDetail(){
    const { id }=useParams<{id:string}>();

    const [product, setProduct]=useState<Product | null>(null);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState<string | null>(null);
    const [quantity, setQuantity]=useState(1);

    async function loadProduct(){
        if(!id) return;
        setLoading(true);
        setError(null);

        try{
            const data=await getProductById(id);
            setProduct(data);
            setQuantity(1);
        } catch(err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadProduct();
    }, [id]);

    function handleAddToCart(p:Product){
        console.log("Add to cart:",{
            id:p.id,
            title:p.title,
            quantity,
            unitPrice:p.price,
            total:Number((p.price*quantity).toFixed(2)),
        });
    }

    if(loading){
        return(
            <section className={styles.detail}>
                <div className={styles.inner}>
                    <div className={styles.skeletonHero}/>
                </div>
            </section>
        );
    }

    if(error || !product){
        return(
            <section className={styles.detail}>
                <div className={styles.inner}>
                    <div className={styles.state}>
                        <p className={styles.stateMsg}>{error ?? 'Product not found'}</p>
                        <NavLink to='/' className={styles.stateBtn}>Back to shop</NavLink>
                    </div>
                </div>
            </section>
        );
    }

    return(
        <section className={styles.detail}>
            <div className={styles.inner}>
                <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                    <NavLink to="/" className={styles.bcLink}>
                        Shop
                    </NavLink>

                    <ChevronRight size={14} className={styles.bcSep} aria-hidden="true"/>

                    <NavLink
                        to={`/category/${encodeURIComponent(product.category)}`}
                        className={styles.bcLink}
                    >
                        {formatCategory(product.category)}
                    </NavLink>

                    <ChevronRight/>

                    <span className={styles.bcCurrent} aria-current="page">
                        {product.title}
                    </span>
                </nav>

                <div className={styles.hero}>
                    <ProductGallery images={product.images} title={product.title}/>

                    <div className={styles.info}>
                        {product.brand && (
                            <span className={styles.brand}>{product.brand}</span>
                        )}

                        <h1 className={styles.title}>{product.title}</h1>

                        <span className={styles.categoryBadge}>{product.category}</span>

                        <div className={styles.ratingRow}>
                            <RatingStars rating={product.rating} size={18}/>
                            <span className={styles.ratingValue}>
                                {product.rating.toFixed(1)}
                            </span>

                            <span className={styles.ratingCount}>
                                ({product.reviews.length}{' '}
                                {product.reviews.length===1 ? 'review' : 'reviews'})
                            </span>
                        </div>

                        <p className={styles.price}>${product.price.toFixed(2)}</p>

                        <div className={styles.description}>
                            <h2 className={styles.sectionHeading}>Description</h2>
                            <p>{product.description}</p>
                        </div>

                        <div className={styles.actions}>
                            <QuantitySelector
                                value={quantity}
                                onChange={setQuantity}
                                max={product.stock}
                            />

                            <button
                                type="button"
                                className={styles.addBtn}
                                onClick={()=>handleAddToCart(product)}
                            >
                                <ShoppingCart size={18}/>
                                <span>Add to cart</span>
                            </button>
                        </div>

                        <span className={styles.stock}>
                            {product.stock > 10
                            ? 'In stock'
                            : `Only ${product.stock} left in stock`}
                        </span>
                    </div>
                </div>
                
                <ReviewsSection reviews={product.reviews} />
            </div>
        </section>
    );
}