import { NavLink } from "react-router-dom";
import { Trash2 } from "lucide-react";
import type { CartItem } from "../../Context/CartContext";
import QuantitySelector from "../QuantitySelector";
import styles from "./CartItemRow.module.scss";

interface CartItemRowProps{
    item:CartItem;
    onQuantityChange:(id:number, quantity:number)=>void;
    onRemove:(id:number)=>void;
}

export default function CartItemRow({ item, onQuantityChange, onRemove}: CartItemRowProps){
    const { product, quantity }=item;
    const subtotal=product.price*quantity;
    
    return(
        <article className={styles.row}>
            <NavLink to={`/product/${product.id}`} className={styles.imageLink}>
                <img src={product.thumbnail} alt={product.title} className={styles.image}/>
            </NavLink>

            <div className={styles.details}>
                <NavLink to={`/product/${product.id}`} className={styles.title}>
                    {product.title}
                </NavLink>
                <span className={styles.unitPrice}>${product.price.toFixed(2)}</span>
            </div>

            <div className={styles.quantity}>
                <QuantitySelector
                    value={quantity}
                    onChange={(q)=>onQuantityChange(product.id, q)}
                    min={1}
                    max={product.stock}
                />
            </div>

            <span className={styles.subtotal}>${subtotal.toFixed(2)}</span>

            <button
                type="button"
                className={styles.removeBtn}
                onClick={()=>onRemove(product.id)}
                aria-label={`Remove ${product.title} from cart`}
            >
                <Trash2 size={16}/>
            </button>
        </article>
    );
}