import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://localhost:5001/api';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const endpoint = isLogin ? '/auth/login' : '/auth/register';
        const payload = isLogin
            ? { email: formData.email, password: formData.password }
            : { name: formData.name, email: formData.email, password: formData.password };

        try {
            const res = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors && data.errors.length > 0) {
                    setError(data.errors.map((e) => e.message).join(' • '));
                } else {
                    setError(data.message || 'Something went wrong.');
                }
            } else {
                // Use auth context to store user + token
                login(data.user, data.token);
                setSuccess(isLogin ? `Welcome back, ${data.user.name}! 🎨` : `Account created! Welcome, ${data.user.name}! 🎨`);
                setFormData({ name: '', email: '', password: '' });
                setTimeout(() => navigate('/'), 1000);
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
                <h1 className="heading-section" style={{ marginBottom: '8px', textAlign: 'center' }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>
                    {isLogin ? 'Enter your details to sign in' : 'Sign up to start collecting art'}
                </p>

                {error && (
                    <div style={{ backgroundColor: '#FEF2F2', color: '#B91C1C', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
                        {error}
                    </div>
                )}
                {success && (
                    <div style={{ backgroundColor: '#F0FDF4', color: '#15803D', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {!isLogin && (
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required={!isLogin} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '16px', outline: 'none' }} />
                        </div>
                    )}
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '16px', outline: 'none' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input type={showPass ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required style={{ width: '100%', padding: '14px 48px 14px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '16px', outline: 'none' }} />
                            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', padding: '16px', fontSize: '16px', opacity: loading ? 0.7 : 1 }} disabled={loading}>
                        {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button style={{ color: 'var(--primary)', fontWeight: '700' }} onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}>
                        {isLogin ? 'Register' : 'Sign In'}
                    </button>
                </div>
            </div>
            <style>{`
                @media (max-width: 600px) {
                    .container > div { padding: 32px 20px !important; }
                }
            `}</style>
        </div>
    );
};

export default Login;
