import React from 'react';
import { Palette, Twitter, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#111827', color: 'white', marginTop: '60px' }} className="section-padding scale-y-padding">
            <div className="container">
                <div className="grid-responsive grid-cols-4 md-flex-col gap-8" style={{ paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="flex-col gap-4" style={{ gridColumn: 'span 2' }}>
                        <Link to="/" className="flex items-center gap-2" style={{ fontWeight: '800', fontSize: '20px', color: 'white' }}>
                            <Palette color="var(--primary)" size={32} />
                            <span>Through My Pencil</span>
                        </Link>
                        <p style={{ color: '#9CA3AF', maxWidth: '300px', lineHeight: '1.6' }}>Exclusive Solo Artist Portfolio. Transforming spaces with exceptional, original art experiences.</p>
                        <div className="flex gap-4" style={{ marginTop: '16px' }}>
                            <a href="#" style={{ color: '#9CA3AF', padding: '10px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}><Twitter size={20} /></a>
                            <a href="#" style={{ color: '#9CA3AF', padding: '10px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}><Instagram size={20} /></a>
                            <a href="#" style={{ color: '#9CA3AF', padding: '10px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}><Facebook size={20} /></a>
                        </div>
                    </div>

                    <div className="flex-col gap-4">
                        <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Explore</h4>
                        <Link to="/" style={{ color: '#9CA3AF' }}>Home</Link>
                        <Link to="/products" style={{ color: '#9CA3AF' }}>Portfolio & Store</Link>
                        <Link to="/login" style={{ color: '#9CA3AF' }}>Account</Link>
                        <Link to="/admin" style={{ color: 'var(--primary)', fontWeight: '500' }}>Admin Dashboard</Link>
                    </div>

                    <div className="flex-col gap-4">
                        <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Legal</h4>
                        <a href="#" style={{ color: '#9CA3AF' }}>Terms of Service</a>
                        <a href="#" style={{ color: '#9CA3AF' }}>Privacy Policy</a>
                        <a href="#" style={{ color: '#9CA3AF' }}>Shipping Returns</a>
                    </div>
                </div>

                <div style={{ paddingTop: '32px', textAlign: 'center' }}>
                    <p style={{ color: '#6B7280', fontSize: '14px' }}>© {new Date().getFullYear()} Through My Pencil. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
