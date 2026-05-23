import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const AVATAR_URL =
  'https://www.figma.com/api/mcp/asset/52c1c1e7-2f9f-433c-a0b2-b7f5773fcd92';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
        </button>

        <div className={styles.divider} />

        <div className={styles.profile}>
          <img src={AVATAR_URL} alt="Rakesh Kumar" className={styles.avatar} />
          <div className={styles.profileInfo}>
            <span className={styles.name}>Rakesh Kumar</span>
            <span className={styles.role}>Super Admin</span>
          </div>
          <ChevronDown size={16} className={styles.chevron} />
        </div>

        <div className={styles.divider} />

        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Logout"
          onClick={() => navigate('/login')}
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
