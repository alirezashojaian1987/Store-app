import type { Review } from '../../../types/product';
import ReviewCard from '../ReviewCard/';
import styles from './ReviewsSection.module.scss';

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const count = reviews.length;

  return(
    <section className={styles.reviews}>
        <header className={styles.head}>
            <h2 className={styles.title}>Reviews</h2>
            
            <span className={styles.count}>
                {count === 0
                ? 'No reviews yet'
                : `${count} ${count === 1 ? 'review' : 'reviews'}`}
            </span>
        </header>

        {count === 0 ? (
            <p className={styles.empty}>
                Be the first to share your thoughts on this product.
            </p>
            ) : (
            <div className={styles.scroller}>
                {reviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                ))}
            </div>
        )}
    </section>
  );
}