import styles from './Card.module.css';

interface CardProps {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, action, children, className = '' }: CardProps) {
  return (
    <section className={`${styles.card} ${className}`}>
      {(title || action) && (
        <header className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {action}
        </header>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  );
}
