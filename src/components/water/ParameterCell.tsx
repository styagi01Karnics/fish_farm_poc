import { evaluateParameter } from '../../utils/waterQuality';
import styles from './ParameterCell.module.css';

interface ParameterCellProps {
  paramId: string;
  value: number;
  unit?: string;
  decimals?: number;
}

export function ParameterCell({ paramId, value, unit = '', decimals = 1 }: ParameterCellProps) {
  const status = evaluateParameter(paramId, value);
  const display =
    paramId === 'ammonia' || paramId === 'nitrite'
      ? value === 0
        ? '0'
        : value.toFixed(2)
      : value.toFixed(decimals);

  return (
    <span className={`${styles.cell} ${styles[status.toLowerCase()]}`} title={`Status: ${status}`}>
      {display}
      {unit && <span className={styles.unit}> {unit}</span>}
    </span>
  );
}
