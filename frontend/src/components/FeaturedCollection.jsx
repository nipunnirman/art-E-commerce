import React from 'react';
import { ShoppingCart, ArrowRight, Heart, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const products = [
    { id: 1, tag: 'ABSTRACT', title: 'Abstract Harmony', price: '$1,299', image: 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=2670&auto=format&fit=crop' },
    { id: 2, tag: 'LANDSCAPE', title: 'Watercolor Dreams', price: '$899', image: 'https://images.unsplash.com/photo-1506815340158-fcbdd5601a4e?q=80&w=2670&auto=format&fit=crop' },
    { id: 3, tag: 'SCULPTURE', title: 'Modern Form', price: '$2,499', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop' },
    { id: 4, tag: 'PORTRAIT', title: 'Vivid Portrait', price: '$1,599', image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=2670&auto=format&fit=crop' }
];

const FeaturedCollection = () => {
    const { isLoggedIn } = useAuth();
    const { addToCart, items } = useCart();
    const navigate = useNavigate();

    const handleAdd = (product) => {
        if (!isLoggedIn) return navigate('/login');
        addToCart(product);
    };

    return (
        <section className="container section-padding">
            <div className="flex sm-flex-col sm-items-start items-end justify-between gap-4" style={{ marginBottom: '40px' }}>
                <div>
                    <h2 className="heading-section" style={{ marginBottom: '12px' }}>Featured Collection</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Handpicked masterpieces for discerning collectors</p>
                </div>
                <Link to="/products" className="btn btn-outline flex items-center gap-2" style={{ border: 'none', backgroundColor: 'var(--bg-pink-light)', color: 'var(--primary)' }}>
                    View Complete Portfolio <ArrowRight size={18} />
                </Link>
            </div>

            <div className="grid-responsive grid-cols-4">
                {products.map(product => {
                    const inCart = items.some(i => i.id === product.id);
                    return (
                        <div key={product.id} className="product-card" style={{ borderRadius: '20px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', transition: 'all 0.3s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '12px', paddingBottom: 0 }}>
                                <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: '12px', backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                    <button style={{ position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px', borderRadius: '18px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                        <Heart size={18} />
                                    </button>
                                </div>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }}>{product.tag}</div>
                                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-main)' }}>{product.title}</h3>
                                <div style={{ flex: 1 }}></div>
                                <div className="flex items-center justify-between" style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>{product.price}</div>
                                    <button onClick={() => handleAdd(product)} className="btn btn-sm flex items-center justify-center gap-2" style={{ borderRadius: '10px', backgroundColor: inCart ? '#15803D' : 'var(--primary)', color: 'white', padding: '8px 16px' }}>
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
        </section>
    );
};

export default FeaturedCollection;
