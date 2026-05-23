import type { WaterQuality, PondStatus } from '../../data/mockData';
import styles from './Badge.module.css';

type BadgeVariant = WaterQuality | PondStatus | 'Normal';

const variantClass: Record<string, string> = {
  Good: styles.good,
  Moderate: styles.moderate,
  Poor: styles.poor,
  Normal: styles.normal,
  Warning: styles.warning,
  Critical: styles.critical,
};

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${variantClass[variant] ?? styles.normal}`}>
      {children}
    </span>
  );
}
