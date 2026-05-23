import { Header } from '../components/layout/Header';
import { PageSection } from '../components/ui/PageSection';
import { historyLog } from '../data/mockData';
import pageStyles from '../styles/pageContent.module.css';
import styles from './HistoryPage.module.css';

export function HistoryPage() {
  return (
    <div className={pageStyles.page}>
      <Header
        title="History"
        subtitle="Water tests, treatments, and pond events log"
      />

      <div className={pageStyles.content}>
        <PageSection title="Recent activity">
          <div className={styles.filters}>
            <select className={styles.select} defaultValue="all">
              <option value="all">All ponds</option>
              <option value="water">Water tests</option>
              <option value="treatment">Treatments</option>
              <option value="disease">Disease events</option>
            </select>
            <input type="date" className={styles.dateInput} defaultValue="2026-05-23" />
          </div>

          <ul className={styles.timeline}>
            {historyLog.map((entry) => (
              <li key={entry.id} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <strong>{entry.event}</strong>
                    <span className={styles.date}>
                      {entry.date} · {entry.time}
                    </span>
                  </div>
                  <p className={styles.pond}>{entry.pond}</p>
                  <p className={styles.params}>{entry.parameters}</p>
                  <span className={styles.staff}>By {entry.staff}</span>
                </div>
              </li>
            ))}
          </ul>
        </PageSection>
      </div>
    </div>
  );
}
