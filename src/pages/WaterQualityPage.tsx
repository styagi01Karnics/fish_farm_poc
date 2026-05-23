import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Header } from '../components/layout/Header';
import { PageSection } from '../components/ui/PageSection';
import { ParameterCell } from '../components/water/ParameterCell';
import { ponds, trendData } from '../data/mockData';
import { PREVENTION_TIPS, WATER_PARAMETER_DEFINITIONS } from '../data/waterParameters';
import { formatIdealRange } from '../utils/waterQuality';
import pageStyles from '../styles/pageContent.module.css';
import styles from './WaterQualityPage.module.css';

export function WaterQualityPage() {
  const referencePond = ponds[0];

  return (
    <div className={pageStyles.page}>
      <Header
        title="Water Quality"
        subtitle="Parameters and ideal ranges for healthy fish ponds"
      />

      <div className={pageStyles.content}>
        <PageSection title="Parameter reference (ideal ranges)">
          <div className={styles.guideGrid}>
            {WATER_PARAMETER_DEFINITIONS.map((def) => (
              <article key={def.id} className={styles.guideCard}>
                <h3>{def.name}</h3>
                <p className={styles.guideDesc}>{def.description}</p>
                <span className={styles.guideIdeal}>Ideal: {formatIdealRange(def.id)}</span>
              </article>
            ))}
          </div>
        </PageSection>

        <div className={pageStyles.grid2}>
          <PageSection title={`Current readings — ${referencePond.name}`}>
            <ul className={styles.readingList}>
              {WATER_PARAMETER_DEFINITIONS.map((def) => {
                const val = referencePond.readings[def.id as keyof typeof referencePond.readings];
                if (typeof val !== 'number') return null;
                return (
                  <li key={def.id}>
                    <span>{def.name}</span>
                    <ParameterCell paramId={def.id} value={val} unit={def.unit} />
                  </li>
                );
              })}
            </ul>
          </PageSection>

          <PageSection title="Nitrogen cycle trends (7 days)">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ammonia" stroke="#ef4444" name="Ammonia (ppm)" strokeWidth={2} />
                <Line type="monotone" dataKey="nitrite" stroke="#f59e0b" name="Nitrite (ppm)" strokeWidth={2} />
                <Line type="monotone" dataKey="nitrate" stroke="#8b5cf6" name="Nitrate (mg/L)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </PageSection>
        </div>

        <PageSection title="Prevention & water quality management">
          <ul className={styles.tipsList}>
            {PREVENTION_TIPS.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </PageSection>
      </div>
    </div>
  );
}
