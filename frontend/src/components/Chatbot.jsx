import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ id: 1, text: "Hi! I'm Nipunnirman's AI assistant. Do you have any questions about my art?", sender: 'bot' }]);
    const [input, setInput] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 600);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { id: Date.now(), text: input, sender: 'user' }]);
        setInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Thanks for reaching out! Since I'm just an assistant, I will pass this message along. Nipunnirman will get back to you soon.", sender: 'bot' }]);
        }, 1000);
    };

    const getChatWindowStyles = () => {
        const baseStyles = {
            position: 'fixed',
            backgroundColor: 'white',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1001,
            transform: isOpen ? 'scale(1)' : 'scale(0)',
            filter: isOpen ? 'opacity(1)' : 'opacity(0)',
            transformOrigin: 'bottom right',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            pointerEvents: isOpen ? 'auto' : 'none',
            overflow: 'hidden'
        };

        if (isMobile) {
            return {
                ...baseStyles,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                borderRadius: 0,
                transformOrigin: 'bottom center',
            };
        }

        return {
            ...baseStyles,
            bottom: '24px',
            right: '24px',
            width: '350px',
            height: '500px',
            borderRadius: '24px',
        };
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{ position: 'fixed', bottom: '24px', right: '24px', width: '60px', height: '60px', borderRadius: '30px', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(252, 88, 138, 0.3)', zIndex: 1000, transition: 'transform 0.2s', transform: isOpen && isMobile ? 'scale(0)' : isOpen ? 'scale(0)' : 'scale(1)' }}>
                <MessageCircle size={28} />
            </button>

            {/* Chat Window */}
            <div style={getChatWindowStyles()}>
                {/* Header */}
                <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Art Assistant</h3>
                        <p style={{ fontSize: '12px', opacity: 0.8 }}>Online</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} style={{ color: 'white' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#F9FAFB' }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                            <div style={{ backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'white', color: msg.sender === 'user' ? 'white' : 'var(--text-main)', padding: '12px 16px', borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', fontSize: '14px', boxShadow: msg.sender === 'bot' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', lineHeight: '1.5' }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px', alignItems: 'center', backgroundColor: 'white' }}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '100px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '14px' }}
                    />
                    <button onClick={handleSend} style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
