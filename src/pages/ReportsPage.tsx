import { Download, FileText } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { PageSection } from '../components/ui/PageSection';
import { reportTemplates, ponds } from '../data/mockData';
import { WATER_PARAMETER_DEFINITIONS } from '../data/waterParameters';
import { formatIdealRange, evaluateParameter, getReadingValue } from '../utils/waterQuality';
import pageStyles from '../styles/pageContent.module.css';
import styles from './ReportsPage.module.css';

export function ReportsPage() {
  return (
    <div className={pageStyles.page}>
      <Header
        title="Reports"
        subtitle="Water quality compliance and pond health summaries"
      />

      <div className={pageStyles.content}>
        <PageSection title="Report templates">
          <div className={styles.templateGrid}>
            {reportTemplates.map((t) => (
              <div key={t.id} className={styles.templateCard}>
                <FileText size={28} className={styles.templateIcon} />
                <div>
                  <h3>{t.name}</h3>
                  <span>{t.frequency}</span>
                </div>
                <button type="button" className={styles.downloadBtn}>
                  <Download size={16} />
                  Generate
                </button>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="Parameter compliance snapshot">
          <p className={styles.intro}>
            Comparison of current readings against ideal ranges from the water parameters guide.
          </p>
          <div className={styles.complianceWrap}>
            <table className={styles.complianceTable}>
              <thead>
                <tr>
                  <th>Pond</th>
                  {WATER_PARAMETER_DEFINITIONS.slice(0, 6).map((d) => (
                    <th key={d.id}>{d.name}</th>
                  ))}
                  <th>Overall</th>
                </tr>
              </thead>
              <tbody>
                {ponds.map((p) => (
                  <tr key={p.id}>
                    <td className={styles.pondCol}>{p.name}</td>
                    {WATER_PARAMETER_DEFINITIONS.slice(0, 6).map((d) => {
                      const val = getReadingValue(p.readings, d.id);
                      const status = evaluateParameter(d.id, val);
                      return (
                        <td key={d.id}>
                          <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
                            {val}
                            {d.unit ? ` ${d.unit}` : ''}
                          </span>
                        </td>
                      );
                    })}
                    <td>
                      <span className={`${styles.overall} ${styles[p.waterQuality.toLowerCase()]}`}>
                        {p.waterQuality}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        <PageSection title="Ideal range reference">
          <table className={styles.refTable}>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Ideal range</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {WATER_PARAMETER_DEFINITIONS.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{formatIdealRange(d.id)}</td>
                  <td>{d.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PageSection>
      </div>
    </div>
  );
}
