import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQty = (productId, qty) => {
        if (qty <= 0) return removeFromCart(productId);
        setItems((prev) =>
            prev.map((item) => (item.id === productId ? { ...item, qty } : item))
        );
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

    const cartTotal = items.reduce((sum, item) => {
        const price = Number(String(item.price).replace(/[^0-9.]/g, ''));
        return sum + price * item.qty;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                cartCount,
                cartTotal,
                isCartOpen,
                setIsCartOpen,
                addToCart,
                removeFromCart,
                updateQty,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
