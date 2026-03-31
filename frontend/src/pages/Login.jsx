import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Palette } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const inputStyle = {
  width: '100%', padding: '14px 16px',
  borderRadius: '12px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: 'rgba(255,255,255,0.90)',
  fontSize: '15px', outline: 'none',
  fontFamily: "'DM Sans', sans-serif",
  backdropFilter: 'blur(8px)',
  transition: 'border-color 0.2s, background 0.2s',
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.errors?.map(e => e.message).join(' • ') || data.message || 'Something went wrong.');
      } else {
        login(data.user, data.token);
        setSuccess(isLogin ? `Welcome back, ${data.user.name}! 🎨` : `Account created! Welcome, ${data.user.name}! 🎨`);
        setFormData({ name: '', email: '', password: '' });
        setTimeout(() => navigate('/'), 1000);
      }
    } catch {
      setError('Cannot reach the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex justify-center items-center" style={{ minHeight: '80vh', padding: '60px 24px' }}>
      {/* Background orb */}
      <div style={{
        position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{
        width: '100%', maxWidth: '430px',
        padding: '48px',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(32px) saturate(200%)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '28px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Top gloss */}
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(147,197,253,0.4), transparent)',
          borderRadius: '1px',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(59,130,246,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
          }}>
            <Palette size={26} color="white" />
          </div>
        </div>

        <h1 className="heading-section" style={{ marginBottom: '8px', textAlign: 'center', fontSize: '28px' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.42)', textAlign: 'center', marginBottom: '36px', fontSize: '15px' }}>
          {isLogin ? 'Enter your details to sign in' : 'Sign up to start collecting art'}
        </p>

        {error && (
          <div style={{
            background: 'rgba(252,165,165,0.10)', color: '#FCA5A5',
            border: '1px solid rgba(252,165,165,0.25)',
            padding: '12px 16px', borderRadius: '12px', marginBottom: '20px',
            fontSize: '14px', fontWeight: '500',
          }}>{error}</div>
        )}
        {success && (
          <div style={{
            background: 'rgba(74,222,128,0.10)', color: '#4ADE80',
            border: '1px solid rgba(74,222,128,0.25)',
            padding: '12px 16px', borderRadius: '12px', marginBottom: '20px',
            fontSize: '14px', fontWeight: '500',
          }}>{success}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'rgba(255,255,255,0.60)', fontFamily: "'Sora', sans-serif", letterSpacing: '0.02em' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required={!isLogin} style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'rgba(147,197,253,0.4)'; e.target.style.background = 'rgba(255,255,255,0.09)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
              />
            </div>
          )}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'rgba(255,255,255,0.60)', fontFamily: "'Sora', sans-serif", letterSpacing: '0.02em' }}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'rgba(147,197,253,0.4)'; e.target.style.background = 'rgba(255,255,255,0.09)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'rgba(255,255,255,0.60)', fontFamily: "'Sora', sans-serif", letterSpacing: '0.02em' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required style={{ ...inputStyle, paddingRight: '48px' }}
                onFocus={e => { e.target.style.borderColor = 'rgba(147,197,253,0.4)'; e.target.style.background = 'rgba(255,255,255,0.09)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.40)',
                background: 'none', border: 'none',
                display: 'flex', alignItems: 'center',
              }}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{
            width: '100%', marginTop: '8px', padding: '16px', fontSize: '15px',
            opacity: loading ? 0.7 : 1,
          }} disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'rgba(255,255,255,0.38)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button style={{
            color: '#93C5FD', fontWeight: '600', background: 'none', border: 'none',
            fontFamily: "'Sora', sans-serif',",
          }} onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}>
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </div>
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.25) !important; }
        @media (max-width: 600px) { .container > div { padding: 32px 20px !important; } }
      `}</style>
    </div>
  );
};

export default Login;
