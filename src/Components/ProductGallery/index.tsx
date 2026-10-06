import { useState } from "react";
import styles from "./ProductGallery.module.scss";

interface ProductGalleryProps{
    images:string[];
    title:string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps){
    const [activeIndex, setActiveIndex]=useState(0);
    const active=images[activeIndex] ?? images[0];

    return(
        <div className={styles.gallery}>
            <div className={styles.mainImageWrap}>
                <img src={active} alt={title} className={styles.mainImage}/>
            </div>

            {images.length>1 && (
                <div className={styles.thumbs}>
                    {images.map((img, i)=>(
                        <button
                            key={i}
                            type="button"
                            className={`${styles.thumb} ${i===activeIndex ? styles.thumbActive : ''}`}
                            onClick={()=>setActiveIndex(i)}
                            aria-label={`View image ${i+1}`}
                        >
                            <img src={img} alt=""/>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}