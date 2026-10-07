import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCategories } from "../../api/api";

//styles
import styles from "./Header.module.scss";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { formatCategory } from "../../utils/formatCategory";

export default function Header(){
    const [categories, setCategories]=useState<string[]>([]);
    const [loadingCats, setLoadingCats]=useState(true);
    const [errorCats, setErrorCats]=useState<string | null>(null);
    
    const [dropdownOpen, setDropdownOpen]=useState(false);
    const [mobileOpen, setMobileOpen]=useState(false);

    const dropdownRef=useRef<HTMLDivElement>(null);

    useEffect(()=>{
        let cancelled=false;

        getCategories()
        .then((data)=>{
            if(!cancelled) setCategories(data);
        })
        .catch((err:Error)=>{
            if(!cancelled) setErrorCats(err.message);
        })
        .finally(()=>{
            if(!cancelled) setLoadingCats(false);
        });

        return()=>{
            cancelled=true;
        };
    },[]);

    useEffect(()=>{
        function handleClickOutside(e:MouseEvent){
            if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const closeAll=()=>{
        setDropdownOpen(false);
        setMobileOpen(false);
    }

    return(
        <header className={styles.header} id="header">
            <div className={styles.inner}>
                <button
                    type="button"
                    className={styles.logo}
                    onClick={()=>{
                        window.scrollTo({top:0, behavior:"smooth"})
                    }}
                    aria-label="Scroll to top"
                >
                    <span>Fake</span>Store
                </button>

                <nav className={styles.nav}>
                    <NavLink to='/' className={styles.link}>
                        Shop
                    </NavLink>

                    <div className={styles.dropdown} ref={dropdownRef}>
                        <button
                            type="button"
                            className={styles.dropdownToggle}
                            onClick={()=>setDropdownOpen((prev)=>!prev)}
                            aria-expanded={dropdownOpen}
                            aria-haspopup="true"
                        >
                            Categories
                            <ChevronDown
                                size={16}
                                className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}
                            />
                        </button>

                        {dropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                {loadingCats && <span>Loading...</span>}
                                {errorCats && <span>Couldn't load categories!</span>}

                                {!loadingCats &&
                                    !errorCats &&
                                    categories.map((cat)=>(
                                        <NavLink
                                            key={cat}
                                            to={`/category/${encodeURIComponent(cat)}`}
                                            className={({ isActive })=>`${styles.dropdownItem} ${isActive ? styles.activeItem : ""}`}
                                            onClick={closeAll}
                                        >
                                            {formatCategory(cat)}
                                        </NavLink>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </nav>

                <div className={styles.actions}>
                    <NavLink
                        to="/cart"
                        className={styles.iconBtn}
                        aria-label="Cart"
                        onClick={closeAll}
                    >
                        <ShoppingCart size={22}/>
                    </NavLink>

                    <button
                        type="button"
                        className={`${styles.iconBtn} ${styles.menuToggle}`}
                        onClick={()=>setMobileOpen((prev)=>!prev)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
                    </button>
                </div>
            </div>

            <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
                <div className={styles.mobileMenuInner}>
                    <NavLink to="/" className={styles.mobileLink} onClick={closeAll}>
                        Shop
                    </NavLink>

                    <div className={styles.mobileSection}>
                        <span className={styles.mobileLabel}>Categories</span>
                        {loadingCats && <span className={styles.dropdownMsg}>Loading...</span>}
                        {errorCats && <span className={styles.dropdownMsg}>Couldn't load categories</span>}
                        {!loadingCats &&
                            !errorCats &&
                            categories.map((cat) => (
                                <NavLink
                                    key={cat}
                                    to={`/category/${encodeURIComponent(cat)}`}
                                    className={({ isActive })=>`${styles.mobileLink} ${isActive ? styles.activeLink : ""}`}
                                    onClick={closeAll}
                                >
                                    {formatCategory(cat)}
                                </NavLink>
                            ))}
                    </div>
                </div>
            </div>
        </header>
    );
}