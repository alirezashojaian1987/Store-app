import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/product";

export interface CartItem{
    product:Product;
    quantity:number;
}

interface CartContextValue{
    items:CartItem[];
    totalItems:number;
    totalPrice:number;
    addToCart:(product:Product, quantity?:number)=>void;
    removeFromCart:(id:number)=>void;
    updateQuantity:(id:number, quantity:number)=>void;
    clearCart:()=>void;
}

const CartContext=createContext<CartContextValue | null>(null);

const STORAGE_KEY='cart';

function loadCart():CartItem[]{
    try{
        const raw=localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as CartItem[]):[];
    } catch {
        return[];
    }
}

export function CartProvider({ children }:  {children:ReactNode }){
    const [items, setItems]=useState<CartItem[]>(loadCart);
    useEffect(()=>{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    function addToCart(product:Product, quantity=1){
        setItems((prev)=>{
            const existing=prev.find((i)=>i.product.id===product.id);
            if(existing){
                return prev.map((i)=>
                    i.product.id===product.id
                    ? { ...i, quantity: i.quantity + quantity} : i
                );
            }
            return [...prev, { product, quantity }];
        });
    }

    function removeFromCart(id:number){
        setItems((prev)=>prev.filter((i)=>i.product.id!==id));
    }

    function updateQuantity(id:number, quantity:number){
        if(quantity<=0){
            removeFromCart(id);
            return;
        }

        setItems((prev)=>
            prev.map((i)=>(i.product.id===id ? {...i, quantity}:i))
        );
    }

    function clearCart(){
        setItems([]);
    }

    const { totalItems, totalPrice }=useMemo(()=>{
        let count=0;
        let price=0;
        for(const item of items){
            count+=item.quantity;
            price+=item.product.price*item.quantity;
        }
        
        return{ totalItems: count, totalPrice: Number(price.toFixed(2))};
    }, [items]);

    return(
        <CartContext.Provider
            value={{ items, totalItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(){
    const ctx=useContext(CartContext);
    if(!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}