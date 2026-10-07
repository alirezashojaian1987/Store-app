import { NavLink } from "react-router-dom"
import { ShoppingBag } from "lucide-react"
import { useCart } from "../../Context/CartContext"
import CartItemRow from "../../Components/CartItemRow"
import styles from "./Cart.module.scss";

export default function CartPage(){
    const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart, }=useCart();

    if(items.length===0){
        return(
            <section className={styles.cart}>
                <div className={styles.inner}>
                    <div className={styles.empty}>
                        <ShoppingBag size={48} className={styles.emptyIcon}/>
                        <h1 className={styles.emptyTitle}>Your cart is empty</h1>
                        <p className={styles.emptyText}>
                            Looks like you haven't add anything yet.
                        </p>
                        <NavLink to='/' className={styles.emptyBtn}>
                            Continue shopping
                        </NavLink>
                    </div>
                </div>
            </section>
        );
    }

    function handleCheckout(){
        console.log({items, totalItems, totalPrice});
    }

    return(
        <section className={styles.cart}>
            <div className={styles.inner}>
                <header className={styles.head}>
                    <div>
                        <h1 className={styles.title}>Your cart</h1>
                        <p className={styles.subtitle}>
                            {totalItems} {totalItems===1 ? 'item' : 'items'}
                        </p>
                    </div>

                    <button type="button" className={styles.clearBtn} onClick={clearCart}>
                        Clear cart
                    </button>
                </header>

                <div className={styles.layout}>
                    <div className={styles.items}>
                        {items.map((item)=>(
                            <CartItemRow
                                key={item.product.id}
                                item={item}
                                onQuantityChange={updateQuantity}
                                onRemove={removeFromCart}
                            />
                        ))}
                    </div>

                    <aside className={styles.summary}>
                        <h2 className={styles.summaryTitle}>Order summary</h2>

                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span className={styles.free}>Free</span>
                        </div>

                        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <button
                            type="button"
                            className={styles.checkoutBtn}
                            onClick={handleCheckout}
                        >
                            Proceed to checkout
                        </button>

                        <NavLink to='/' className={styles.continueLink}>Continue shopping</NavLink>
                    </aside>
                </div>
            </div>
        </section>
    );
}