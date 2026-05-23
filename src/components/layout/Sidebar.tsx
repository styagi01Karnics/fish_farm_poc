import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Droplets,
  BarChart3,
  Bell,
  FileText,
  History,
  Camera,
  Users,
  Settings,
  FlaskConical,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/ponds', label: 'Ponds', icon: Droplets },
  { to: '/real-time', label: 'Real-time Data', icon: BarChart3 },
  { to: '/water-quality', label: 'Water Quality', icon: FlaskConical },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/history', label: 'History', icon: History },
  { to: '/camera', label: 'Camera Feed', icon: Camera },
  { to: '/team', label: 'Team / Field Data', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const LOGO_URL =
  'https://www.figma.com/api/mcp/asset/d1113628-70fe-4634-8a42-24ef5de7cf26';

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logoWrap}>
          <img src={LOGO_URL} alt="" className={styles.logo} />
        </div>
        <span className={styles.brandName}>Fish Farming</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <Icon size={20} className={styles.navIcon} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className={styles.logoutHint}
        onClick={() => navigate('/login')}
        aria-label="Back to login"
      />
    </aside>
  );
}
