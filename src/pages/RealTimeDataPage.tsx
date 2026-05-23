import { Activity, RefreshCw } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { PageSection } from '../components/ui/PageSection';
import { ParameterCell } from '../components/water/ParameterCell';
import { ponds } from '../data/mockData';
import { WATER_PARAMETER_DEFINITIONS } from '../data/waterParameters';
import { formatIdealRange } from '../utils/waterQuality';
import pageStyles from '../styles/pageContent.module.css';
import styles from './RealTimeDataPage.module.css';

export function RealTimeDataPage() {
  const selectedPond = ponds[0];

  return (
    <div className={pageStyles.page}>
      <Header
        title="Real-time Data"
        subtitle="Live sensor readings — refresh every 60 seconds"
      />

      <div className={pageStyles.content}>
        <div className={styles.toolbar}>
          <label className={styles.selectLabel}>
            Pond
            <select className={styles.select} defaultValue={selectedPond.id}>
              {ponds.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className={styles.refreshBtn}>
            <RefreshCw size={18} />
            Refresh now
          </button>
          <span className={styles.live}>
            <Activity size={14} />
            Live · Last update {selectedPond.lastUpdated}
          </span>
        </div>

        <div className={styles.readingsGrid}>
          {WATER_PARAMETER_DEFINITIONS.map((def) => {
            const value = selectedPond.readings[def.id as keyof typeof selectedPond.readings];
            if (typeof value !== 'number') return null;
            return (
              <div key={def.id} className={styles.readingCard}>
                <span className={styles.paramName}>{def.name}</span>
                <div className={styles.paramValue}>
                  <ParameterCell paramId={def.id} value={value} unit={def.unit} decimals={def.id.includes('nit') || def.id === 'phosphates' ? 2 : 1} />
                </div>
                <span className={styles.ideal}>Ideal: {formatIdealRange(def.id)}</span>
              </div>
            );
          })}
          <div className={styles.readingCard}>
            <span className={styles.paramName}>Water Level</span>
            <div className={styles.levelValue}>{selectedPond.readings.waterLevel}</div>
          </div>
        </div>

        <PageSection title="All ponds — latest readings">
          <div className={styles.allPondsTable}>
            <table>
              <thead>
                <tr>
                  <th>Pond</th>
                  <th>pH</th>
                  <th>NH₃</th>
                  <th>NO₂</th>
                  <th>NO₃</th>
                  <th>DO</th>
                  <th>Temp</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {ponds.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td><ParameterCell paramId="ph" value={p.readings.ph} /></td>
                    <td><ParameterCell paramId="ammonia" value={p.readings.ammonia} /></td>
                    <td><ParameterCell paramId="nitrite" value={p.readings.nitrite} /></td>
                    <td><ParameterCell paramId="nitrate" value={p.readings.nitrate} decimals={0} /></td>
                    <td><ParameterCell paramId="dissolvedOxygen" value={p.readings.dissolvedOxygen} /></td>
                    <td><ParameterCell paramId="temperature" value={p.readings.temperature} /></td>
                    <td className={styles.time}>{p.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>
      </div>
    </div>
  );
}
