import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export default function Footer(){
    const year=new Date().getFullYear();

    function scrollToTop(){
        window.scrollTo({top:0, behavior:'smooth'});
    }

    return(
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.topsection}>
                    <div className={styles.brand}>
                        <span className={styles.logo}>
                            <span>Fake</span>Store
                        </span>

                        <p className={styles.tagline}>
                            A demo storefront built with React.
                        </p>
                    </div>

                    <nav className={styles.links}>
                        <NavLink to='/' className={styles.link}>
                            Shop
                        </NavLink>

                        <NavLink to='/cart' className={styles.link}>
                            Cart
                        </NavLink>

                        <button type='button' className={styles.linkBtn} onClick={scrollToTop}>
                            Back to top
                        </button>
                    </nav>
                </div>

                <div className={styles.bottomsection}>
                    <span>© {year} FakeStore</span>
                    <span className={styles.credit}>Built with FakeStore API</span>
                </div>
            </div>
        </footer>
    )
}