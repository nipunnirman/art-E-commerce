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
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 200,
          opacity: isCartOpen ? 1 : 0,
          pointerEvents: isCartOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '100%', maxWidth: '420px',
        background: 'rgba(4, 12, 36, 0.88)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderLeft: '1px solid rgba(147,197,253,0.15)',
        zIndex: 201,
        boxShadow: '-20px 0 60px rgba(0,0,0,0.6), inset 1px 0 0 rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Header */}
        <div className="flex items-center justify-between" style={{
          padding: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
        }}>
          <div className="flex items-center gap-3">
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(147,197,253,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ShoppingBag size={20} color="#93C5FD" />
            </div>
            <h2 style={{
              fontSize: '19px', fontWeight: '700',
              fontFamily: "'Sora', sans-serif",
              color: 'rgba(255,255,255,0.90)',
              letterSpacing: '-0.02em',
            }}>Your Cart ({cartCount})</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} style={{
            padding: '8px', borderRadius: '10px',
            color: 'rgba(255,255,255,0.45)',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.09)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
            onMouseOver={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
            onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.35)' }}>
              <ShoppingBag size={52} style={{ margin: '0 auto 20px', opacity: 0.25, display: 'block' }} />
              <p style={{ fontSize: '17px', fontWeight: '600', marginBottom: '8px', color: 'rgba(255,255,255,0.60)', fontFamily: "'Sora', sans-serif" }}>Your cart is empty</p>
              <p style={{ fontSize: '14px' }}>Browse our collection and add some art!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map(item => (
                <div key={item.id} className="flex gap-4" style={{
                  padding: '14px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '16px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}>
                  <div style={{
                    width: '76px', height: '76px', borderRadius: '12px',
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{
                        fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em',
                        background: 'linear-gradient(135deg, #93C5FD, #60A5FA)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        fontFamily: "'Sora', sans-serif",
                      }}>{item.tag}</div>
                      <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'rgba(255,255,255,0.88)', fontFamily: "'Sora', sans-serif" }}>{item.title}</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <div style={{
                        fontWeight: '800', fontSize: '16px',
                        fontFamily: "'Sora', sans-serif",
                        color: 'rgba(255,255,255,0.90)',
                      }}>{item.price}</div>
                      <div className="flex items-center gap-2">
                        {[
                          { onClick: () => updateQty(item.id, item.qty - 1), icon: <Minus size={13} /> },
                        ].map(({ onClick, icon }, i) => (
                          <button key={i} onClick={onClick} style={{
                            width: '26px', height: '26px', borderRadius: '7px',
                            border: '1px solid rgba(255,255,255,0.12)',
                            background: 'rgba(255,255,255,0.07)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'rgba(255,255,255,0.70)',
                          }}>{icon}</button>
                        ))}
                        <span style={{ fontWeight: '700', fontSize: '14px', minWidth: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.90)' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} style={{
                          width: '26px', height: '26px', borderRadius: '7px',
                          border: '1px solid rgba(255,255,255,0.12)',
                          background: 'rgba(255,255,255,0.07)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'rgba(255,255,255,0.70)',
                        }}><Plus size={13} /></button>
                        <button onClick={() => removeFromCart(item.id)} style={{
                          width: '26px', height: '26px', borderRadius: '7px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#FCA5A5', marginLeft: '2px',
                          background: 'rgba(252,165,165,0.10)',
                          border: '1px solid rgba(252,165,165,0.20)',
                        }}><Trash2 size={13} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout footer */}
        {items.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
          }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.50)', fontWeight: '500' }}>Subtotal</span>
              <span style={{
                fontSize: '24px', fontWeight: '800',
                fontFamily: "'Sora', sans-serif",
                background: 'linear-gradient(135deg, #fff, #93C5FD)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => {
                const waNumber = "94757105455";
                let text = "Hello! I would like to proceed with the items in my cart:\n\n";
                items.forEach(item => {
                  text += `*${item.tag || 'Item'}*\n`;
                  text += `${item.title}\n`;
                  text += `${item.price}\n`;
                  text += `Qty: ${item.qty}\n\n`;
                });
                text += `*Subtotal: Rs. ${cartTotal.toLocaleString()}*`;
                const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
                window.open(url, '_blank');
              }}
              className="btn btn-primary" 
              style={{ width: '100%', padding: '16px', fontSize: '15px' }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
