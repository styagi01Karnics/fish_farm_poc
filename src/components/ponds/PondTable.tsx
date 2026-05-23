import { ChevronRight } from 'lucide-react';
import type { Pond } from '../../data/mockData';
import { ParameterCell } from '../water/ParameterCell';
import { Badge } from '../ui/Badge';
import styles from './PondTable.module.css';

interface PondTableProps {
  ponds: Pond[];
  compact?: boolean;
}

export function PondTable({ ponds, compact = false }: PondTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Pond Name</th>
            <th>Species</th>
            {!compact && <th>Location</th>}
            <th>Water Quality</th>
            <th>pH</th>
            <th>NH₃</th>
            <th>NO₂</th>
            <th>NO₃</th>
            <th>DO</th>
            <th>Temp</th>
            {!compact && <th>KH</th>}
            <th>Level</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ponds.map((pond, index) => (
            <tr key={pond.id} className={index % 2 === 1 ? styles.altRow : ''}>
              <td>
                <div className={styles.pondName}>
                  <span className={styles.name}>{pond.name}</span>
                  <span className={styles.id}>ID: {pond.id}</span>
                </div>
              </td>
              <td className={styles.species}>{pond.species}</td>
              {!compact && <td>{pond.location}</td>}
              <td>
                <Badge variant={pond.waterQuality}>{pond.waterQuality}</Badge>
              </td>
              <td>
                <ParameterCell paramId="ph" value={pond.readings.ph} />
              </td>
              <td>
                <ParameterCell paramId="ammonia" value={pond.readings.ammonia} unit="ppm" />
              </td>
              <td>
                <ParameterCell paramId="nitrite" value={pond.readings.nitrite} unit="ppm" />
              </td>
              <td>
                <ParameterCell paramId="nitrate" value={pond.readings.nitrate} unit="mg/L" decimals={0} />
              </td>
              <td>
                <ParameterCell
                  paramId="dissolvedOxygen"
                  value={pond.readings.dissolvedOxygen}
                  unit="mg/L"
                />
              </td>
              <td>
                <ParameterCell paramId="temperature" value={pond.readings.temperature} unit="°C" />
              </td>
              {!compact && (
                <td>
                  <ParameterCell paramId="alkalinity" value={pond.readings.alkalinity} unit="ppm" decimals={0} />
                </td>
              )}
              <td>{pond.readings.waterLevel}</td>
              <td>
                <Badge variant={pond.status}>{pond.status}</Badge>
              </td>
              <td>
                <button type="button" className={styles.actionBtn} aria-label="View pond">
                  <ChevronRight size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
