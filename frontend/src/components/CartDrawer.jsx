import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
    const { items, cartCount, cartTotal, isCartOpen, setIsCartOpen, updateQty, removeFromCart } = useCart();

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={() => setIsCartOpen(false)}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                    zIndex: 200, opacity: isCartOpen ? 1 : 0,
                    pointerEvents: isCartOpen ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease',
                }}
            />

            {/* Drawer */}
            <div
                style={{
                    position: 'fixed', top: 0, right: 0, bottom: 0,
                    width: '100%', maxWidth: '420px',
                    backgroundColor: 'white', zIndex: 201,
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                    display: 'flex', flexDirection: 'column',
                    transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between" style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
                    <div className="flex items-center gap-4">
                        <ShoppingBag size={24} color="var(--primary)" />
                        <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Your Cart ({cartCount})</h2>
                    </div>
                    <button onClick={() => setIsCartOpen(false)} style={{ padding: '8px', borderRadius: '8px', color: 'var(--text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                    {items.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                            <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-main)' }}>Your cart is empty</p>
                            <p>Browse our collection and add some art!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4" style={{ padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)', backgroundColor: '#FAFAFB' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }} />
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em' }}>{item.tag}</div>
                                            <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>{item.title}</h4>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div style={{ fontWeight: '800', fontSize: '16px' }}>{item.price}</div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: '28px', height: '28px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                                                    <Minus size={14} />
                                                </button>
                                                <span style={{ fontWeight: '700', fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: '28px', height: '28px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                                                    <Plus size={14} />
                                                </button>
                                                <button onClick={() => removeFromCart(item.id)} style={{ width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444', marginLeft: '4px' }}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', backgroundColor: '#FAFAFB' }}>
                        <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '16px', color: 'var(--text-muted)', fontWeight: '500' }}>Subtotal</span>
                            <span style={{ fontSize: '24px', fontWeight: '800' }}>${cartTotal.toLocaleString()}</span>
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
