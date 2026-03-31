import React, { useState, useEffect } from 'react';
import { Pencil, Image as ImageIcon, Send, MessageCircle } from 'lucide-react';
import heroImgSec1 from '../assets/home/sell1.JPG';

const CustomArt = () => {
    // Pricing Maps based on requirements (adjusted 34399 to 3499)
    const pricing = {
        'Single Portrait': [
            { label: 'A4 Art Only', price: 3499 },
            { label: 'A4 With Frame', price: 3990 },
            { label: 'A3 Art Only', price: 3990 },
            { label: 'A3 With Frame', price: 4990 },
        ],
        'Couple Portrait': [
            { label: 'A4 Art Only', price: 3900 },
            { label: 'A4 With Frame', price: 4490 },
            { label: 'A3 Art Only', price: 4490 },
            { label: 'A3 With Frame', price: 4990 },
        ],
        'Family Photo': [
            { label: 'A4 Art Only', price: 4490 },
            { label: 'A4 With Frame', price: 4990 },
            { label: 'A3 Art Only', price: 4490 },
            { label: 'A3 With Frame', price: 5490 },
        ]
    };

    const [artType, setArtType] = useState('Single Portrait');
    const [sizeFrame, setSizeFrame] = useState(pricing['Single Portrait'][0].label);
    const [note, setNote] = useState('');

    // Reset sizeFrame if artType changes to prevent invalid selections
    useEffect(() => {
        setSizeFrame(pricing[artType][0].label);
    }, [artType]);

    // Calculate dynamic price
    const currentPrice = pricing[artType].find(opt => opt.label === sizeFrame)?.price || 0;

    const handleOrder = () => {
        const waNumber = "+94700000000"; // REPLACE WITH ACTUAL WA NUMBER
        const text = `Hello! I would like to order a Custom Pencil Art.

*Type:* ${artType}
*Size & Framing:* ${sizeFrame}
*Estimated Price:* LKR ${currentPrice}
${note ? `\n*Additional Notes:* ${note}` : ''}

Please let me know how to proceed!`;
        
        const url = `https://wa.me/${waNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="container section-padding" style={{ minHeight: '80vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 className="heading-section" style={{ marginBottom: '16px' }}>Commission Custom Art</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                    Turn your favorite memories into timeless hand-drawn pencil masterpieces. Select your preferences below and instantly connect with me via WhatsApp to start the process.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                alignItems: 'start',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '24px',
                padding: '32px',
            }} className="custom-art-grid">
                
                {/* Visual / Info Side */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '400px',
                    borderRadius: '16px',
                    backgroundImage: `url(${heroImgSec1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                }}>
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(180deg, transparent 40%, rgba(2,8,24,0.9) 100%)',
                    }} />
                    <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                            padding: '8px 16px', borderRadius: '100px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white', fontSize: '13px', fontWeight: '600',
                            marginBottom: '12px'
                        }}>
                            <Pencil size={14} /> 100% Hand-Drawn
                        </div>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', fontFamily: "'Sora',sans-serif", color: 'white' }}>
                            A Timeless Gift
                        </h3>
                    </div>
                </div>

                {/* Form Side */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Art Type */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>
                            Subject / Art Type
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                            {Object.keys(pricing).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setArtType(type)}
                                    style={{
                                        padding: '12px 8px',
                                        borderRadius: '12px',
                                        background: artType === type ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                                        border: artType === type ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.1)',
                                        color: artType === type ? '#93C5FD' : 'rgba(255,255,255,0.6)',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size and Frame */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>
                            Size & Framing
                        </label>
                        <select 
                            value={sizeFrame} 
                            onChange={(e) => setSizeFrame(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                fontSize: '15px',
                                outline: 'none',
                                appearance: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {pricing[artType].map((opt) => (
                                <option key={opt.label} value={opt.label} style={{ background: '#020617', color: 'white' }}>
                                    {opt.label} - Rs. {opt.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Extra Notes */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>
                            Additional Notes (Optional)
                        </label>
                        <textarea 
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Any specific requests or details?"
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                fontSize: '15px',
                                outline: 'none',
                                resize: 'none',
                            }}
                        />
                    </div>

                    {/* Total Price */}
                    <div style={{
                        marginTop: '8px',
                        padding: '24px',
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(29,78,216,0.05))',
                        border: '1px solid rgba(59,130,246,0.2)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Estimated Total</div>
                            <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Sora',sans-serif", color: '#93C5FD' }}>
                                Rs. {currentPrice.toLocaleString()}
                            </div>
                        </div>
                        
                        {/* WhatsApp Button */}
                        <button 
                            onClick={handleOrder}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '14px 24px',
                                borderRadius: '12px',
                                background: '#25D366', // WhatsApp Brand Color
                                color: '#ffffff',
                                fontSize: '16px',
                                fontWeight: '700',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <MessageCircle size={20} />
                            Order Now
                        </button>
                    </div>

                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: '8px' }}>
                        Clicking 'Order Now' will open WhatsApp with your pre-filled request. You can send your reference photos there.
                    </p>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .custom-art-grid {
                        grid-template-columns: 1fr !important;
                        padding: 20px !important;
                        gap: 24px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default CustomArt;
