import React from 'react';
import { Award, Star } from 'lucide-react';

const testimonials = [
    {
        quote: "The quality and authenticity of the artworks exceeded my expectations. Truly a premium experience.",
        author: "Sarah Johnson",
        role: "Art Collector"
    },
    {
        quote: "Found the perfect piece for my living room. The curation and customer service are exceptional.",
        author: "Michael Chen",
        role: "Interior Designer"
    },
    {
        quote: "As a fellow creative, I'm thrilled to collect work from such a prestigious portfolio.",
        author: "Isabella Martinez",
        role: "Art Collector"
    }
];

const LovedByCollectors = () => {
    return (
        <section style={{ backgroundColor: '#FFF5F7' }} className="section-padding">
            <div className="container" style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', marginBottom: '24px', padding: '16px', backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 10px 20px rgba(252, 88, 138, 0.1)' }}>
                    <Award size={32} color="var(--primary)" />
                </div>
                <h2 className="heading-section" style={{ marginBottom: '16px' }}>Loved by Art Collectors</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '64px', fontSize: '18px' }}>See what our community has to say</p>

                <div className="grid-responsive grid-cols-3 md-flex-col" style={{ alignItems: 'stretch' }}>
                    {testimonials.map((t, i) => (
                        <div key={i} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px', textAlign: 'left', display: 'flex', flexDirection: 'column', border: '1px solid rgba(252, 88, 138, 0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                            <div className="flex gap-2" style={{ marginBottom: '24px' }}>
                                {[1, 2, 3, 4, 5].map(star => <Star key={star} fill="#FFB800" color="#FFB800" size={20} />)}
                            </div>
                            <p style={{ fontStyle: 'italic', fontSize: '18px', fontWeight: '500', color: 'var(--text-main)', marginBottom: '32px', flex: 1, lineHeight: '1.6' }}>"{t.quote}"</p>

                            <div className="flex items-center gap-4 border-t pt-4" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '24px', backgroundColor: 'var(--bg-pink-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-main)' }}>{t.author}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LovedByCollectors;
