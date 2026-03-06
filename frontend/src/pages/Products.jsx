import React from 'react';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const generateProducts = () => {
    const categories = ['ABSTRACT', 'LANDSCAPE', 'SCULPTURE', 'PORTRAIT', 'DIGITAL', 'PHOTOGRAPHY'];
    const titles = ['Harmony', 'Dreams', 'Form', 'Portrait', 'Vision', 'Echo', 'Silence', 'Motion', 'Light', 'Shadow'];
    const baseImages = [
        'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506815340158-fcbdd5601a4e?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578301978693-85fa9c026109?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2670&auto=format&fit=crop'
    ];

    return Array.from({ length: 20 }, (_, i) => ({
        id: i + 100,
        tag: categories[i % categories.length],
        title: `${categories[i % categories.length]} ${titles[i % titles.length]}`,
        price: `$${(Math.floor(Math.random() * 20) + 5) * 100 + 99}`,
        image: baseImages[i % baseImages.length]
    }));
};

const products = generateProducts();

const Products = () => {
    const { isLoggedIn } = useAuth();
    const { addToCart, items } = useCart();
    const navigate = useNavigate();

    const handleAdd = (product) => {
        if (!isLoggedIn) return navigate('/login');
        addToCart(product);
    };

    return (
        <div className="container section-padding">
            <h1 className="heading-hero" style={{ marginBottom: '16px' }}>All Products</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '48px', fontSize: '18px' }}>Browse through my complete collection of original artworks.</p>

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
                                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px', color: 'var(--text-main)' }}>{product.title}</h3>
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
        </div>
    );
};

export default Products;
