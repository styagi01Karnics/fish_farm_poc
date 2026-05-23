import { Header } from '../components/layout/Header';
import { PageSection } from '../components/ui/PageSection';
import { POND_CHEMICALS, WATER_PARAMETER_DEFINITIONS } from '../data/waterParameters';
import { formatIdealRange } from '../utils/waterQuality';
import pageStyles from '../styles/pageContent.module.css';
import styles from './SettingsPage.module.css';

export function SettingsPage() {
  return (
    <div className={pageStyles.page}>
      <Header
        title="Settings"
        subtitle="Alert thresholds, notifications, and reference data"
      />

      <div className={pageStyles.content}>
        <PageSection title="Alert thresholds (from water parameters guide)">
          <div className={styles.thresholdGrid}>
            {WATER_PARAMETER_DEFINITIONS.map((def) => (
              <div key={def.id} className={styles.thresholdRow}>
                <label>{def.name}</label>
                <span className={styles.ideal}>{formatIdealRange(def.id)}</span>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={formatIdealRange(def.id)}
                  readOnly
                  aria-readonly
                />
              </div>
            ))}
          </div>
          <p className={styles.note}>
            Thresholds are based on the fish pond water parameters guide. Contact admin to
            customize per species or biofloc system.
          </p>
        </PageSection>

        <PageSection title="Notifications">
          <div className={styles.toggleList}>
            <label className={styles.toggle}>
              <input type="checkbox" defaultChecked />
              Alert when ammonia &gt; 0 ppm
            </label>
            <label className={styles.toggle}>
              <input type="checkbox" defaultChecked />
              Alert when nitrite &gt; 0.5 ppm
            </label>
            <label className={styles.toggle}>
              <input type="checkbox" defaultChecked />
              Alert when DO &lt; 5.0 mg/L
            </label>
            <label className={styles.toggle}>
              <input type="checkbox" defaultChecked />
              Alert when pH outside 6.5–8.5
            </label>
            <label className={styles.toggle}>
              <input type="checkbox" defaultChecked />
              Disease risk notifications
            </label>
            <label className={styles.toggle}>
              <input type="checkbox" />
              Email daily water quality summary
            </label>
          </div>
        </PageSection>

        <PageSection title="Common chemicals & medicines (reference)">
          <table className={styles.chemTable}>
            <thead>
              <tr>
                <th>Medicine / Chemical</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {POND_CHEMICALS.map((c) => (
                <tr key={c.name}>
                  <td>{c.name}</td>
                  <td>{c.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PageSection>

        <PageSection title="Account">
          <div className={styles.account}>
            <p>
              <strong>Name:</strong> Rakesh Kumar
            </p>
            <p>
              <strong>Role:</strong> Super Admin
            </p>
            <p>
              <strong>Email:</strong> rakesh.kumar@pondmonitor.example
            </p>
          </div>
        </PageSection>
      </div>
    </div>
  );
}
