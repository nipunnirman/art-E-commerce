import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Image as ImageIcon, Shield, Eye, EyeOff, LogOut } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Initial Mock Data
const initialProducts = [
    { id: 1, tag: 'ABSTRACT', title: 'Abstract Harmony', price: 1299, image: 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=2670&auto=format&fit=crop' },
    { id: 2, tag: 'LANDSCAPE', title: 'Watercolor Dreams', price: 899, image: 'https://images.unsplash.com/photo-1506815340158-fcbdd5601a4e?q=80&w=2670&auto=format&fit=crop' },
    { id: 3, tag: 'SCULPTURE', title: 'Modern Form', price: 2499, image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop' },
    { id: 4, tag: 'PORTRAIT', title: 'Vivid Portrait', price: 1599, image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=2670&auto=format&fit=crop' }
];

// ── Admin Login Component ──────────────────────────────────────────────────
const AdminLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed.');
            } else if (data.user.role !== 'admin') {
                setError('Access denied. Admin privileges required.');
            } else {
                onLogin(data.token, data.user);
            }
        } catch (err) {
            setError('Cannot reach the server. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container flex justify-center items-center" style={{ minHeight: '80vh', padding: '60px 24px' }}>
            <div style={{ width: '100%', maxWidth: '420px', padding: '48px', border: '1px solid var(--border-color)', borderRadius: '24px', backgroundColor: 'white', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--bg-pink-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield size={32} color="var(--primary)" />
                    </div>
                </div>
                <h1 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '8px' }}>Admin Login</h1>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>Sign in with your admin credentials</p>

                {error && (
                    <div style={{ backgroundColor: '#FEF2F2', color: '#B91C1C', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required
                            style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '16px', outline: 'none' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                                style={{ width: '100%', padding: '14px 48px 14px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '16px', outline: 'none' }} />
                            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', opacity: loading ? 0.7 : 1 }} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// ── Admin Dashboard Component ──────────────────────────────────────────────
const AdminDashboard = () => {
    const [adminToken, setAdminToken] = useState(null);
    const [adminUser, setAdminUser] = useState(null);
    const [products, setProducts] = useState(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ tag: '', title: '', price: '', image: '' });

    // Check if admin session exists from sessionStorage
    useEffect(() => {
        const savedToken = sessionStorage.getItem('adminToken');
        const savedUser = sessionStorage.getItem('adminUser');
        if (savedToken && savedUser) {
            const user = JSON.parse(savedUser);
            if (user.role === 'admin') {
                setAdminToken(savedToken);
                setAdminUser(user);
            }
        }
    }, []);

    const handleAdminLogin = (token, user) => {
        setAdminToken(token);
        setAdminUser(user);
        sessionStorage.setItem('adminToken', token);
        sessionStorage.setItem('adminUser', JSON.stringify(user));
    };

    const handleAdminLogout = () => {
        setAdminToken(null);
        setAdminUser(null);
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminUser');
    };

    // ── If not admin, show login gate ──
    if (!adminToken) {
        return <AdminLogin onLogin={handleAdminLogin} />;
    }

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData(product);
        } else {
            setEditingProduct(null);
            setFormData({ tag: '', title: '', price: '', image: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, id: p.id, price: Number(formData.price) } : p));
        } else {
            setProducts([...products, { ...formData, id: Date.now(), price: Number(formData.price) }]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this artwork?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="container section-padding" style={{ minHeight: '80vh' }}>
            {/* Admin Header */}
            <div className="flex md-flex-col items-center justify-between" style={{ marginBottom: '40px', gap: '16px' }}>
                <div>
                    <div className="flex items-center gap-4" style={{ marginBottom: '4px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: '800' }}>Dashboard</h1>
                        <span style={{ padding: '4px 12px', borderRadius: '20px', backgroundColor: 'var(--bg-pink-light)', color: 'var(--primary)', fontSize: '12px', fontWeight: '700' }}>ADMIN</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome, <strong>{adminUser?.name}</strong> — Manage your portfolio and store</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn btn-primary flex items-center gap-2" onClick={() => handleOpenModal()}>
                        <Plus size={20} /> Add New Artwork
                    </button>
                    <button onClick={handleAdminLogout} className="btn flex items-center gap-2" style={{ padding: '10px 16px', border: '1px solid #FEE2E2', color: '#EF4444', borderRadius: '10px' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* Product Table */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'var(--bg-pink-light)', color: 'var(--primary)' }}>
                                <th style={{ padding: '16px', fontWeight: '600', fontSize: '14px' }}>Artwork</th>
                                <th style={{ padding: '16px', fontWeight: '600', fontSize: '14px' }}>Title</th>
                                <th style={{ padding: '16px', fontWeight: '600', fontSize: '14px' }}>Category</th>
                                <th style={{ padding: '16px', fontWeight: '600', fontSize: '14px' }}>Price</th>
                                <th style={{ padding: '16px', fontWeight: '600', fontSize: '14px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No artworks found. Start by adding one!
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} className="admin-row">
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ width: '60px', height: '60px', borderRadius: '8px', backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid var(--border-color)' }}></div>
                                        </td>
                                        <td style={{ padding: '16px', fontWeight: '600', color: 'var(--text-main)' }}>{product.title}</td>
                                        <td style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '14px' }}>{product.tag}</td>
                                        <td style={{ padding: '16px', fontWeight: '600' }}>${product.price}</td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleOpenModal(product)} style={{ padding: '8px', borderRadius: '8px', color: 'var(--text-muted)', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)' }}>
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(product.id)} style={{ padding: '8px', borderRadius: '8px', color: '#EF4444', backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2' }}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '24px', width: '100%', maxWidth: '500px', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}>
                        <button onClick={handleCloseModal} style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-muted)' }}>
                            <X size={24} />
                        </button>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
                            {editingProduct ? 'Edit Artwork' : 'Add New Artwork'}
                        </h2>

                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Image URL</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <input type="url" required value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://unsplash.com..." style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
                                    <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--bg-pink-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {formData.image ? <img src={formData.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} /> : <ImageIcon size={20} color="var(--primary)" />}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Title</label>
                                <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Abstract Harmony" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Category</label>
                                    <input type="text" required value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })} placeholder="e.g. ABSTRACT" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Price ($)</label>
                                    <input type="number" required min="0" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="1299" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                <button type="button" onClick={handleCloseModal} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingProduct ? 'Save Changes' : 'Add Artwork'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .admin-row:hover { background-color: #FAFAFB; }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
