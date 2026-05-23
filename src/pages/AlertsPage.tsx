import { AlertTriangle, Droplets, Bug } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { PageSection } from '../components/ui/PageSection';
import { Badge } from '../components/ui/Badge';
import { recentAlerts, diseaseAlerts } from '../data/mockData';
import { FISH_DISEASES } from '../data/fishDiseases';
import pageStyles from '../styles/pageContent.module.css';
import styles from './AlertsPage.module.css';

export function AlertsPage() {
  return (
    <div className={pageStyles.page}>
      <Header
        title="Alerts"
        subtitle="Water parameter violations and disease risk from pond monitoring"
      />

      <div className={pageStyles.content}>
        <PageSection title="Active water quality alerts">
          <ul className={styles.alertList}>
            {recentAlerts.map((alert) => (
              <li key={alert.id} className={styles.alertItem}>
                <div className={`${styles.severityIcon} ${styles[alert.severity.toLowerCase()]}`}>
                  <Droplets size={20} />
                </div>
                <div className={styles.alertBody}>
                  <div className={styles.alertHeader}>
                    <strong>{alert.title}</strong>
                    <Badge variant={alert.severity === 'Critical' ? 'Critical' : 'Warning'}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p>
                    {alert.pond} · <strong>{alert.parameter}</strong>: {alert.value}{' '}
                    <span className={styles.ideal}>(ideal: {alert.ideal})</span>
                  </p>
                  {'diseaseLink' in alert && alert.diseaseLink && (
                    <p className={styles.diseaseLink}>
                      Related condition: {alert.diseaseLink}
                    </p>
                  )}
                </div>
                <span className={styles.time}>{alert.time}</span>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection title="Disease risk — ponds under watch">
          {diseaseAlerts.length === 0 ? (
            <p className={styles.empty}>No active disease risks detected.</p>
          ) : (
            <ul className={styles.diseaseList}>
              {diseaseAlerts.map((item) => (
                <li key={item.id} className={styles.diseaseItem}>
                  <Bug size={20} className={styles.bugIcon} />
                  <div>
                    <strong>{item.disease}</strong>
                    <span className={styles.category}>{item.category}</span>
                    <p>{item.pond}</p>
                    <p className={styles.symptoms}>Symptoms: {item.symptoms}</p>
                    <p className={styles.treatment}>Treatment: {item.treatment}</p>
                  </div>
                  <Badge variant={item.severity === 'Critical' ? 'Critical' : 'Warning'}>
                    {item.severity}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </PageSection>

        <PageSection title="Fish disease reference guide">
          <p className={styles.guideIntro}>
            Common diseases in pond culture and biofloc systems — symptoms, causes, and treatments.
          </p>
          <div className={styles.diseaseTableWrap}>
            <table className={styles.diseaseTable}>
              <thead>
                <tr>
                  <th>Disease</th>
                  <th>Type</th>
                  <th>Symptoms</th>
                  <th>Common treatment</th>
                </tr>
              </thead>
              <tbody>
                {FISH_DISEASES.map((d) => (
                  <tr key={d.id}>
                    <td className={styles.diseaseName}>{d.name}</td>
                    <td>
                      <span className={styles.typeBadge}>{d.category}</span>
                    </td>
                    <td>{d.symptoms}</td>
                    <td>{d.commonTreatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        <div className={styles.warningBanner}>
          <AlertTriangle size={20} />
          <p>
            Always consult a fisheries expert before applying antibiotics or chemicals. Follow
            quarantine and biosecurity practices from the disease prevention guide.
          </p>
        </div>
      </div>
    </div>
  );
}
