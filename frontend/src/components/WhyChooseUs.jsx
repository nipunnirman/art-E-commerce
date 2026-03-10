import React from 'react';
import { Sparkles, ShieldCheck, Truck } from 'lucide-react';

const features = [
    {
        icon: <Sparkles size={28} color="var(--primary)" />,
        title: 'Curated Excellence',
        desc: 'Every artwork is carefully selected and verified to ensure exceptional quality and artistic merit.'
    },
    {
        icon: <ShieldCheck size={28} color="var(--primary)" />,
        title: 'Authenticity Guaranteed',
        desc: 'Every piece comes with a certificate of authenticity and detailed provenance documentation.'
    },
    {
        icon: <Truck size={28} color="var(--primary)" />,
        title: 'White-Glove Delivery',
        desc: 'Professional packaging and fully insured worldwide shipping to protect your investment.'
    }
];

const WhyChooseUs = () => {
    return (
        <section className="container section-padding" style={{ textAlign: 'center' }}>
            <h2 className="heading-section" style={{ marginBottom: '16px' }}>Why Collect With Us</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '64px', fontSize: '18px', maxWidth: '600px', margin: '0 auto 64px auto' }}>We're committed to bringing you exceptional art experiences with unmatched service</p>

            <div className="grid-responsive grid-cols-3">
                {features.map((item, idx) => (
                    <div key={idx} style={{ padding: '48px 32px', border: '1px solid var(--border-color)', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FAFAFB', transition: 'all 0.3s ease' }} className="feature-card">
                        <div style={{ width: '72px', height: '72px', borderRadius: '24px', backgroundColor: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                            {item.icon}
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-main)' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
                    </div>
                ))}
            </div>
            <style>{`
        .feature-card:hover {
            transform: translateY(-8px);
            background-color: white !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.05);
            border-color: transparent !important;
        }
      `}</style>
        </section>
    );
};

export default WhyChooseUs;
