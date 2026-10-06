import { Minus, Plus } from "lucide-react";
import styles from "./QuantitySelector.module.scss";

interface QuantitySelectorProps{
    value:number;
    onChange:(value:number)=>void;
    min?:number;
    max?:number;
}

export default function QuantitySelector({ value, onChange, min=1, max=99, }: QuantitySelectorProps){
    return(
        <div className={styles.wrapper}>
            <button
                type="button"
                className={styles.btn}
                onClick={()=>onChange(Math.max(min, value-1))}
                disabled={value <= min}
                aria-label="Decrease quantity"
            >
                <Minus size={16}/>
            </button>

            <span className={styles.value} aria-live="polite">
                {value}
            </span>

            <button
                type="button"
                className={styles.btn}
                onClick={()=>onChange(Math.min(max, value+1))}
                disabled={value >= max}
                aria-label="Increase quantity"
            >
                <Plus size={16}/>
            </button>
        </div>
    );
}