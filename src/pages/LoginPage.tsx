import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Droplets,
  BarChart3,
  Bell,
  FileText,
} from 'lucide-react';
import styles from './LoginPage.module.css';

const HERO_IMAGE =
  'https://www.figma.com/api/mcp/asset/2cfde2e2-bbf2-434d-919f-910ab2d9d134';
const LOGO_IMAGE =
  'https://www.figma.com/api/mcp/asset/d1113628-70fe-4634-8a42-24ef5de7cf26';

const features = [
  {
    icon: Droplets,
    title: 'Water Quality',
    description: 'Track pH, ammonia, nitrite, nitrate, DO, KH, and GH',
  },
  {
    icon: BarChart3,
    title: 'Real-time Monitoring',
    description: 'Live readings against ideal pond parameter ranges',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Alerts for toxicity, low oxygen, and disease risk',
  },
  {
    icon: FileText,
    title: 'Reports & Insights',
    description: 'Compliance reports and fish disease reference guide',
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={HERO_IMAGE} alt="" className={styles.heroImage} />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.logoCircle}>
            <img src={LOGO_IMAGE} alt="Fish Farming" />
          </div>

          <h1 className={styles.heroTitle}>Fish Farming</h1>
          <p className={styles.heroTagline}>
            Monitor water quality <span className={styles.sep}>|</span> Ensure fish health{' '}
            <span className={styles.sep}>|</span> Improve pond productivity
          </p>

          <div className={styles.featureGrid}>
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className={styles.feature}>
                <div className={styles.featureIcon}>
                  <Icon size={20} color="#fff" />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formCard}>
          <h2 className={styles.welcome}>Welcome to Fish Farming</h2>
          <div className={styles.accentLine} />
          <p className={styles.formSubtitle}>
            Sign in to access your fish farming dashboard
          </p>

          <form onSubmit={handleLogin} className={styles.form}>
            <label className={styles.label}>
              Email Address
              <div className={styles.inputWrap}>
                <Mail size={20} className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
              </div>
            </label>

            <label className={styles.label}>
              Password
              <div className={styles.inputWrap}>
                <Lock size={20} className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>

            <div className={styles.formRow}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#forgot">Forgot Password?</a>
            </div>

            <button type="submit" className={styles.btnPrimary}>
              Login
            </button>
          </form>

          <div className={styles.divider}>
            <span>Or</span>
          </div>

          <button
            type="button"
            className={styles.btnOutline}
            onClick={() => navigate('/dashboard')}
          >
            Login as field staff
          </button>

          <p className={styles.signup}>
            Don&apos;t have an account? <a href="#signup">Sign Up</a>
          </p>
        </div>
      </section>
    </div>
  );
}
