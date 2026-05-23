import { Users, MapPin, ClipboardList } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { PageSection } from '../components/ui/PageSection';
import { fieldTeam, historyLog } from '../data/mockData';
import pageStyles from '../styles/pageContent.module.css';
import styles from './TeamFieldDataPage.module.css';

export function TeamFieldDataPage() {
  return (
    <div className={pageStyles.page}>
      <Header
        title="Team / Field Data"
        subtitle="Field staff visits, water sampling, and treatment records"
      />

      <div className={pageStyles.content}>
        <div className={pageStyles.grid3}>
          {fieldTeam.map((member) => (
            <div key={member.id} className={styles.memberCard}>
              <div className={styles.avatar}>
                <Users size={24} />
              </div>
              <h3>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.meta}>
                <MapPin size={14} />
                {member.zone}
              </p>
              <p className={styles.meta}>Last visit: {member.lastVisit}</p>
              <p className={styles.pondsChecked}>
                <ClipboardList size={14} />
                {member.pondsChecked} ponds checked
              </p>
            </div>
          ))}
        </div>

        <PageSection title="Recent field entries">
          <table className={styles.entriesTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Staff</th>
                <th>Pond</th>
                <th>Activity</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {historyLog.map((e) => (
                <tr key={e.id}>
                  <td>
                    {e.date}
                    <br />
                    <span className={styles.time}>{e.time}</span>
                  </td>
                  <td>{e.staff}</td>
                  <td>{e.pond}</td>
                  <td>{e.event}</td>
                  <td>{e.parameters}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PageSection>

        <PageSection title="Field sampling checklist">
          <ul className={styles.checklist}>
            <li>Test pH, ammonia, nitrite, nitrate, and dissolved oxygen</li>
            <li>Record water temperature and alkalinity (KH)</li>
            <li>Note fish behavior (gasping, rubbing, mortality)</li>
            <li>Log any probiotic, salt, or KMnO₄ treatments applied</li>
            <li>Remove dead fish and update stocking records</li>
          </ul>
        </PageSection>
      </div>
    </div>
  );
}
