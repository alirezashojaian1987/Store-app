import { Star } from "lucide-react";
import styles from "./RatingStars.module.scss";

interface RatingStarsProps{
    rating:number;
    size?:number;
}

const STAR_INDEXES=[0,1,2,3,4];

export default function RatingStars({ rating, size=16 }: RatingStarsProps){
    const clamped=Math.max(0, Math.min(5, rating));
    const percent=(clamped/5)*100;

    return(
        <div
            className={styles.wrapper}
            aria-label={`Rated ${clamped.toFixed(1)} out of 5`}
        >
            <div className={styles.empty}>
                {STAR_INDEXES.map((i)=>(
                    <Star key={i} size={size}/>
                ))}
            </div>

            <div className={styles.filled} style={{ width: `${percent}%`}}>
                {STAR_INDEXES.map((i)=>(
                    <Star key={i} size={size}/>
                ))}
            </div>
        </div>
    );
}