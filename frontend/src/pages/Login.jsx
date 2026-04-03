import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Palette, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

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

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: '14px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.90)', fontSize: '16px', outline: 'none',
    fontFamily: "'DM Sans',sans-serif",
    transition: 'border-color 0.2s, background 0.2s',
    WebkitAppearance: 'none',
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse,rgba(59,130,246,0.13) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Mobile: full-screen with top decoration */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px,5vw,60px) clamp(16px,4vw,24px)', position: 'relative', zIndex: 1 }}>

        {/* Card */}
        <div style={{
          width: '100%', maxWidth: '420px',
          padding: 'clamp(28px,5vw,48px) clamp(20px,5vw,44px)',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '28px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)',
          position: 'relative',
        }}>
          {/* Top gloss */}
          <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(147,197,253,0.4),transparent)' }} />

          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
              <img src="https://image2url.com/r2/default/images/1775202116579-37520a39-51c7-4bcd-b37c-6faf573a82ea.jpeg" alt="Through My Pencil Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(22px,5vw,28px)', fontWeight: '800', marginBottom: '8px', textAlign: 'center', color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.02em' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.40)', textAlign: 'center', marginBottom: '32px', fontSize: '14px' }}>
            {isLogin ? 'Enter your details to sign in' : 'Sign up to start collecting art'}
          </p>

          {/* Toggle tabs */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '4px', marginBottom: '28px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {['Sign In', 'Register'].map((tab, i) => (
              <button key={tab} onClick={() => { setIsLogin(i === 0); setError(''); setSuccess(''); }} style={{
                flex: 1, padding: '10px', borderRadius: '9px', fontSize: '14px', fontWeight: '600',
                fontFamily: "'Sora',sans-serif",
                background: (isLogin ? i === 0 : i === 1) ? 'linear-gradient(135deg,#3B82F6,#1D4ED8)' : 'transparent',
                color: (isLogin ? i === 0 : i === 1) ? 'white' : 'rgba(255,255,255,0.45)',
                border: 'none', transition: 'all 0.3s ease',
                boxShadow: (isLogin ? i === 0 : i === 1) ? '0 4px 12px rgba(59,130,246,0.35)' : 'none',
              }}>{tab}</button>
            ))}
          </div>

          {error && <div style={{ background: 'rgba(252,165,165,0.10)', color: '#FCA5A5', border: '1px solid rgba(252,165,165,0.25)', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>{error}</div>}
          {success && <div style={{ background: 'rgba(74,222,128,0.10)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.25)', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>{success}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {!isLogin && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: 'rgba(255,255,255,0.55)', fontFamily: "'Sora',sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase' }}>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required={!isLogin} style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(147,197,253,0.45)'; e.target.style.background = 'rgba(255,255,255,0.09)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                />
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: 'rgba(255,255,255,0.55)', fontFamily: "'Sora',sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase' }}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'rgba(147,197,253,0.45)'; e.target.style.background = 'rgba(255,255,255,0.09)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: 'rgba(255,255,255,0.55)', fontFamily: "'Sora',sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required style={{ ...inputStyle, paddingRight: '48px' }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(147,197,253,0.45)'; e.target.style.background = 'rgba(255,255,255,0.09)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.40)', background: 'none', border: 'none', display: 'flex', alignItems: 'center' }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" style={{
              width: '100%', marginTop: '8px', padding: '16px',
              borderRadius: '14px', fontSize: '16px', fontWeight: '700',
              fontFamily: "'Sora',sans-serif",
              background: loading ? 'rgba(59,130,246,0.5)' : 'linear-gradient(135deg,#3B82F6,#1D4ED8)',
              color: 'white', border: 'none',
              boxShadow: loading ? 'none' : '0 8px 24px rgba(59,130,246,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
            }} disabled={loading}>
              {loading ? 'Please wait...' : <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button style={{ color: '#93C5FD', fontWeight: '700', background: 'none', border: 'none', fontFamily: "'Sora',sans-serif", cursor: 'pointer' }}
              onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}>
              {isLogin ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.22) !important; }
      `}</style>
    </div>
  );
};

export default Login;
