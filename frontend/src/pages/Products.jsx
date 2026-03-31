import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
const Products = () => {
    const { isLoggedIn } = useAuth();
    const { addToCart, items } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                const res = await fetch(`${API_BASE}/products`);
                const data = await res.json();
                if (data.success) {
                    setProducts(data.data);
                }
            } catch (err) {
                console.error('Failed to fetch products', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


    const handleAdd = (product) => {
        if (!isLoggedIn) return navigate('/login');
        addToCart(product);
    };

    return (
        <div className="container section-padding">
            <h1 className="heading-hero" style={{ marginBottom: '12px', fontSize: 'clamp(28px, 6vw, 64px)' }}>All Products</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '36px', fontSize: 'clamp(15px, 2.5vw, 18px)' }}>Browse through my complete collection of original artworks.</p>

            <div className="grid-responsive grid-cols-4" style={{ gap: '14px' }}>
                {loading && <p style={{ color: 'var(--text-muted)' }}>Loading artworks...</p>}
                {!loading && products.length === 0 && (
                    <p style={{ color: 'var(--text-muted)' }}>No artworks found. Check back later!</p>
                )}
                {products.map(product => {
                    const productId = product._id || product.id;
                    const inCart = items.some(i => (i._id || i.id) === productId);
                    return (
                        <div key={productId} className="product-card" style={{ borderRadius: '20px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', transition: 'all 0.3s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '12px', paddingBottom: 0 }}>
                                <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: '12px', backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                    <button style={{ position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px', borderRadius: '18px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                        <Heart size={18} />
                                    </button>
                                </div>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }}>{product.tag}</div>
                                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px', color: 'var(--text-main)' }}>{product.title}</h3>
                                <div style={{ flex: 1 }}></div>
                                <div className="flex items-center justify-between" style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>${product.price}</div>
                                    <button onClick={() => handleAdd(product)} className="btn btn-sm flex items-center justify-center gap-2" style={{ borderRadius: '10px', backgroundColor: inCart ? '#15803D' : 'var(--primary)', color: 'white', padding: '8px 16px', border: 'none' }}>
                                        {inCart ? <><Check size={16} /> Added</> : <><ShoppingCart size={16} /> Add</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <style>{`
          .product-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); border-color: rgba(252, 88, 138, 0.2); }
      `}</style>
        </div>
    );
};

export default Products;
