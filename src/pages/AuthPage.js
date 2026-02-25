import { useState } from 'react';
import { signUp, signIn, isValidCollegeEmail, COLLEGE_DOMAIN } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { styles, theme } from './styles';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [age, setAge] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault(); setError(''); setInfo('');
    if (!isValidCollegeEmail(email)) { setError('only valid IIIT-P roll number emails allowed'); return; }
    setLoading(true);
    try { await signIn({ email, password }); }
    catch (err) { setError(err.message || 'login failed'); }
    finally { setLoading(false); }
  }

  async function handleSignup(e) {
    e.preventDefault(); setError(''); setInfo('');
    if (!isValidCollegeEmail(email)) { setError('only valid IIIT-P roll number emails allowed'); return; }
    if (!gender || !lookingFor || !age) { setError('please fill all fields'); return; }
    if (parseInt(age) < 18) { setError('you must be 18 or older'); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { gender, looking_for: lookingFor, age } }
      });
      if (error) throw error;
      // Insert profile immediately
      if (data?.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id, email, gender,
          looking_for: lookingFor, age: parseInt(age),
          alias: generateAlias(), interests: [], bio: '',
        });
      }
      setMode('verify');
      setInfo(`verification code sent to ${email} — check inbox & spam`);
    } catch (err) {
      setError(err.message || 'signup failed — try again');
    } finally { setLoading(false); }
  }

  function generateAlias() {
    const words = ['Comet','Blaze','Frost','Storm','Ember','Drift','Sage','Echo','Flux','Gale','Prism','Nova'];
    return words[Math.floor(Math.random() * words.length)] + '_' + Math.floor(Math.random() * 90 + 10);
  }

  async function handleVerify(e) {
    e.preventDefault(); setError(''); 
    if (otp.length < 6) { setError('enter the full verification code'); return; }
    setLoading(true);
    try {
      // Try both OTP types
      let result = await supabase.auth.verifyOtp({ email, token: otp, type: 'signup' });
      if (result.error) {
        result = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });
      }
      if (result.error) throw result.error;
      await signIn({ email, password });
    } catch (err) {
      setError('invalid or expired code — request a new one');
    } finally { setLoading(false); }
  }

  async function handleResend() {
    setError(''); setInfo(''); setLoading(true);
    try {
      await supabase.auth.resend({ type: 'signup', email });
      setInfo('new code sent — check inbox & spam folder');
    } catch (err) {
      setError('failed to resend — wait a minute and try again');
    } finally { setLoading(false); }
  }

  return (
    <div style={styles.authWrap}>
      <div className="tilt-card" style={styles.authCard}>
        <div style={styles.authCardTopLine} />
        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 36, background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦</span>
        </div>
        <div style={styles.authTitle}>Campus<span style={{ color: theme.neon }}>Anon</span></div>
        <div style={styles.authSubtitle}>
          anonymous dating for your college community<br/>
          <span style={{ color: theme.textDim, fontSize: 11 }}>your identity is always protected</span>
        </div>

        {info && <div style={styles.infoBox}>✓ &nbsp;{info}</div>}

        {/* ── LOGIN ── */}
        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <label style={styles.label}>college email</label>
            <input style={styles.input} type="email" placeholder="rollno@cse.iiitp.ac.in"
              value={email} onChange={e => setEmail(e.target.value)} required />
            <label style={styles.label}>password</label>
            <input style={styles.input} type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <div style={styles.error}>⚠ &nbsp;{error}</div>}
            <button style={styles.primaryBtn} type="submit" disabled={loading}>
              {loading ? 'logging in...' : 'enter the void →'}
            </button>
            <div style={styles.authSwitch}>
              no account? <span style={styles.authLink} onClick={() => { setMode('signup'); setError(''); setInfo(''); }}>sign up</span>
            </div>
          </form>
        )}

        {/* ── SIGNUP ── */}
        {mode === 'signup' && (
          <form onSubmit={handleSignup}>
            <label style={styles.label}>college email</label>
            <input style={styles.input} type="email" placeholder="rollno@cse.iiitp.ac.in"
              value={email} onChange={e => setEmail(e.target.value)} required />
            <label style={styles.label}>password</label>
            <input style={styles.input} type="password" placeholder="min 6 characters"
              value={password} onChange={e => setPassword(e.target.value)} minLength={6} required />
            <label style={styles.label}>age</label>
            <input style={styles.input} type="number" placeholder="18+"
              value={age} onChange={e => setAge(e.target.value)} min={18} max={30} required />
            <label style={styles.label}>i am</label>
            <div style={styles.genderRow}>
              {[['male','♂ male'],['female','♀ female'],['nonbinary','⚧ nb']].map(([v,l]) => (
                <button key={v} type="button"
                  style={gender === v ? { ...styles.genderBtn, ...styles.genderBtnActive } : styles.genderBtn}
                  onClick={() => setGender(v)}>{l}</button>
              ))}
            </div>
            <label style={styles.label}>looking for</label>
            <div style={styles.genderRow}>
              {[['male','♂ males'],['female','♀ females'],['any','🌈 anyone']].map(([v,l]) => (
                <button key={v} type="button"
                  style={lookingFor === v ? { ...styles.genderBtn, ...styles.genderBtnActive } : styles.genderBtn}
                  onClick={() => setLookingFor(v)}>{l}</button>
              ))}
            </div>
            {error && <div style={styles.error}>⚠ &nbsp;{error}</div>}
            <button style={styles.primaryBtn} type="submit" disabled={loading}>
              {loading ? 'sending code...' : 'send verification code →'}
            </button>
            <div style={styles.authSwitch}>
              have an account? <span style={styles.authLink} onClick={() => { setMode('login'); setError(''); setInfo(''); }}>login</span>
            </div>
          </form>
        )}

        {/* ── VERIFY ── */}
        {mode === 'verify' && (
          <form onSubmit={handleVerify}>
            <div style={{ textAlign: 'center', marginBottom: 24, fontSize: 13, color: theme.textMuted, lineHeight: 1.7 }}>
              Check your inbox and spam folder at<br/>
              <span style={{ color: theme.text, fontFamily: "'Space Mono',monospace", fontSize: 12 }}>{email}</span>
            </div>
            <label style={styles.label}>verification code</label>
            <input
              style={{ ...styles.input, textAlign: 'center', fontSize: 24, letterSpacing: 8, fontFamily: "'Space Mono',monospace", padding: '16px' }}
              type="text" inputMode="numeric" maxLength={8} placeholder="········"
              value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
              required autoFocus
            />
            {error && <div style={styles.error}>⚠ &nbsp;{error}</div>}
            <button style={styles.primaryBtn} type="submit" disabled={loading || otp.length < 6}>
              {loading ? 'verifying...' : 'verify & enter →'}
            </button>
            <div style={styles.authSwitch}>
              didn't get it? <span style={styles.authLink} onClick={handleResend}>resend code</span>
              &nbsp;·&nbsp;
              <span style={styles.authLink} onClick={() => { setMode('signup'); setError(''); setInfo(''); setOtp(''); }}>go back</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
