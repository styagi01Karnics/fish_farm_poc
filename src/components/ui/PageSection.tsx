import styles from './PageSection.module.css';

interface PageSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function PageSection({ title, children, className = '' }: PageSectionProps) {
  return (
    <section className={`${styles.section} ${className}`}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </section>
  );
}
