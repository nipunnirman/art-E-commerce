import { ArrowRight, MessageCircle } from 'lucide-react';
import React from 'react';

const Hero = () => {
    return (
        <section className="container flex md-flex-col items-center justify-between gap-8 section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background decorative blob */}
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(252,88,138,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', zIndex: -1, pointerEvents: 'none' }}></div>

            <div className="md-w-full md-text-left" style={{ maxWidth: '540px', width: '100%', zIndex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'var(--bg-pink-light)', color: 'var(--primary)', borderRadius: '100px', fontSize: '14px', fontWeight: '600', marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    Exclusive Solo Artist Portfolio
                </div>

                <h1 className="heading-hero" style={{ marginBottom: '24px' }}>
                    Art That Speaks <br className="md-hide" />
                    <span style={{ color: 'var(--primary)', position: 'relative', display: 'inline-block' }}>
                        Through My Pencil
                        {/* Decorative underline */}
                        <svg className="md-hide" style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: '12px' }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7C48 2.5 130 1.5 198 7" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" /></svg>
                    </span>
                </h1>

                <p className="p-responsive" style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '40px', lineHeight: '1.7', fontWeight: '400' }}>
                    Every stroke tells a story. Discover unique original artworks created by me that transform spaces, provoke thought, and touch hearts.
                </p>

                <div className="flex sm-flex-col items-center gap-4" style={{ marginBottom: '60px' }}>
                    <button className="btn btn-primary flex items-center justify-center gap-2 sm-w-full" style={{ padding: '16px 32px' }}>
                        Explore Collection
                        <ArrowRight size={20} />
                    </button>
                    <button className="btn btn-outline sm-w-full" style={{ padding: '16px 32px' }}>
                        Learn My Story
                    </button>
                </div>

                <div className="flex sm-flex-col sm-items-start gap-8" style={{ padding: '24px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                    <div className="flex items-center gap-4">
                        <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>50+</div>
                        <div style={{ color: 'var(--text-main)', fontSize: '14px', fontWeight: '500', lineHeight: 1.2 }}>Original<br />Artworks</div>
                    </div>
                    <div className="md-hide" style={{ width: '1px', height: '40px', backgroundColor: 'var(--border-color)' }}></div>
                    <div className="flex items-center gap-4">
                        <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>100%</div>
                        <div style={{ color: 'var(--text-main)', fontSize: '14px', fontWeight: '500', lineHeight: 1.2 }}>Authentic<br />Originals</div>
                    </div>
                    <div className="md-hide" style={{ width: '1px', height: '40px', backgroundColor: 'var(--border-color)' }}></div>
                    <div className="flex items-center gap-4">
                        <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>2K+</div>
                        <div style={{ color: 'var(--text-main)', fontSize: '14px', fontWeight: '500', lineHeight: 1.2 }}>Happy<br />Collectors</div>
                    </div>
                </div>
            </div>

            <div className="md-w-full" style={{ width: '45%', position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', transform: 'rotate(2deg)', transition: 'transform 0.5s ease' }} className="hero-grid">
                    <div style={{ gridRow: 'span 2', borderRadius: '24px', minHeight: '440px', backgroundImage: 'url("https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=2670&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}></div>
                    <div style={{ display: 'grid', gap: '16px' }}>
                        <div style={{ borderRadius: '24px', minHeight: '212px', backgroundImage: 'url("https://images.unsplash.com/photo-1506815340158-fcbdd5601a4e?q=80&w=2670&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}></div>
                        <div style={{ borderRadius: '24px', minHeight: '212px', backgroundImage: 'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}></div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .hero-grid {
                        transform: rotate(0deg) !important;
                        grid-template-columns: 1fr !important;
                    }
                    .hero-grid > div:first-child {
                        min-height: 300px !important;
                    }
                    .hero-grid > div:nth-child(2) {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .hero-grid > div:nth-child(2) > div {
                        min-height: 150px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
