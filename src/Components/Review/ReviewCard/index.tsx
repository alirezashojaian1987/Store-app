import type { Review } from "../../../types/product";
import RatingStars from "../../RatingStars";
import styles from "./ReviewCard.module.scss";

interface ReviewCardProps{
    review:Review;
}

export default function ReviewCard({ review }: ReviewCardProps){
    const {reviewerName, rating, comment, date}=review;
    const initial=reviewerName.trim().charAt(0).toUpperCase();

    const formattedDate=new Date(date).toLocaleDateString('en-US',{
        year:'numeric',
        month:'long',
        day:'numeric',
    });

    return(
        <article className={styles.card}>
            <header className={styles.header}>
                <div className={styles.avatar} aria-hidden='true'>
                    {initial}
                </div>

                <div className={styles.meta}>
                    <span className={styles.name}>{reviewerName}</span>
                    <span className={styles.data}>{formattedDate}</span>
                </div>

                <div className={styles.ratingRow}>
                    <RatingStars rating={rating} size={14}/>
                    <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
                </div>
            </header>

            <p className={styles.comment}>{comment}</p>
        </article>
    )
}