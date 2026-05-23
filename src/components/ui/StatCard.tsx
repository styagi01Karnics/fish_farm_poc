import type { LucideIcon } from 'lucide-react';
import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  iconColor = 'var(--color-primary)',
  iconBg = 'var(--color-info-bg)',
}: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <div className={styles.iconWrap} style={{ background: iconBg }}>
        <Icon size={24} color={iconColor} />
      </div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        {subtext && <span className={styles.subtext}>{subtext}</span>}
      </div>
    </div>
  );
}
