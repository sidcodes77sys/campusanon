import { useState } from 'react';
import { signUp, signIn, COLLEGE_DOMAIN } from '../lib/supabase';
import { styles, theme } from './styles';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setInfo('');
    if (!email.endsWith('@' + COLLEGE_DOMAIN)) {
      setError(`Only @${COLLEGE_DOMAIN} emails are allowed.`);
      return;
    }
    setLoading(true);
    try {
      await signIn({ email, password });
      // AuthContext listener handles redirect
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError(''); setInfo('');
    if (!email.endsWith('@' + COLLEGE_DOMAIN)) {
      setError(`Only @${COLLEGE_DOMAIN} emails are allowed.`);
      return;
    }
    if (!gender || !lookingFor || !age) {
      setError('Please fill all fields.');
      return;
    }
    if (parseInt(age) < 18) {
      setError('You must be 18 or older.');
      return;
    }
    setLoading(true);
    try {
      await signUp({ email, password, gender, lookingFor, age: parseInt(age) });
      setInfo(`✅ Verification email sent to ${email}. Check your inbox and click the link to activate your account.`);
      setMode('login');
    } catch (err) {
      setError(err.message || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.authWrap}>
      <div style={styles.authCard}>
        <div style={styles.authTitle}>◈ Campus<span style={{color: theme.neon}}>Anon</span></div>
        <div style={styles.authSubtitle}>Anonymous dating for your college community</div>

        {info && <div style={styles.infoBox}>{info}</div>}

        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            <input style={styles.input} type="email" placeholder={`College email (@${COLLEGE_DOMAIN})`} value={email} onChange={e => setEmail(e.target.value)} required />
            <input style={styles.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <div style={styles.error}>{error}</div>}
            <button style={styles.primaryBtn} type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div style={styles.authSwitch}>
              No account? <span style={styles.authLink} onClick={() => { setMode('signup'); setError(''); setInfo(''); }}>Sign Up</span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <input style={styles.input} type="email" placeholder={`College email (@${COLLEGE_DOMAIN})`} value={email} onChange={e => setEmail(e.target.value)} required />
            <input style={styles.input} type="password" placeholder="Create password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required />
            <input style={styles.input} type="number" placeholder="Age (18+)" value={age} onChange={e => setAge(e.target.value)} min={18} max={30} required />
            <label style={styles.label}>I am:</label>
            <div style={styles.genderRow}>
              {['male','female','nonbinary'].map(g => (
                <button key={g} type="button"
                  style={gender === g ? {...styles.genderBtn, ...styles.genderBtnActive} : styles.genderBtn}
                  onClick={() => setGender(g)}>
                  {g === 'male' ? '♂ Male' : g === 'female' ? '♀ Female' : '⚧ Non-binary'}
                </button>
              ))}
            </div>
            <label style={styles.label}>Looking for:</label>
            <div style={styles.genderRow}>
              {['male','female','any'].map(g => (
                <button key={g} type="button"
                  style={lookingFor === g ? {...styles.genderBtn, ...styles.genderBtnActive} : styles.genderBtn}
                  onClick={() => setLookingFor(g)}>
                  {g === 'male' ? '♂ Males' : g === 'female' ? '♀ Females' : '🌈 Anyone'}
                </button>
              ))}
            </div>
            {error && <div style={styles.error}>{error}</div>}
            <button style={styles.primaryBtn} type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
            <div style={styles.authSwitch}>
              Have an account? <span style={styles.authLink} onClick={() => { setMode('login'); setError(''); setInfo(''); }}>Login</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
