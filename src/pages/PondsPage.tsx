import { useMemo, useState } from 'react';
import {
  Search,
  Plus,
  RefreshCw,
  LayoutList,
  MapPin,
  Smile,
  Meh,
  Frown,
  Droplets,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { StatCard } from '../components/ui/StatCard';
import { PondTable } from '../components/ponds/PondTable';
import { ponds, pondStats } from '../data/mockData';
import styles from './PondsPage.module.css';

export function PondsPage() {
  const [search, setSearch] = useState('');
  const [qualityFilter, setQualityFilter] = useState<string>('all');

  const filteredPonds = useMemo(() => {
    return ponds.filter((pond) => {
      const matchesSearch =
        !search ||
        pond.name.toLowerCase().includes(search.toLowerCase()) ||
        pond.location.toLowerCase().includes(search.toLowerCase());
      const matchesQuality =
        qualityFilter === 'all' ||
        pond.waterQuality.toLowerCase() === qualityFilter;
      return matchesSearch && matchesQuality;
    });
  }, [search, qualityFilter]);

  return (
    <div className={styles.page}>
      <Header title="Ponds" />

      <div className={styles.content}>
        <div className={styles.statsRow}>
          <StatCard
            label="Total Ponds"
            value={pondStats.totalPonds}
            subtext="8.5% Up from yesterday"
            icon={Droplets}
            iconColor="#0145cc"
            iconBg="#dbeafe"
          />
          <StatCard
            label="Good Quality"
            value={pondStats.goodQuality}
            subtext="8.5% Up from yesterday"
            icon={Smile}
            iconColor="#22c55e"
            iconBg="#dcfce7"
          />
          <StatCard
            label="Moderate"
            value={pondStats.moderateQuality}
            subtext="8.5% Up from yesterday"
            icon={Meh}
            iconColor="#f59e0b"
            iconBg="#fef3c7"
          />
          <StatCard
            label="Poor Quality"
            value={pondStats.poorQuality}
            subtext="8.5% Up from yesterday"
            icon={Frown}
            iconColor="#ef4444"
            iconBg="#fee2e2"
          />
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="search"
              placeholder="Search by pond name or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.toolbarActions}>
            <button type="button" className={styles.iconAction} aria-label="Refresh">
              <RefreshCw size={20} />
            </button>
            <button type="button" className={styles.iconAction} aria-label="List view">
              <LayoutList size={20} />
            </button>
            <button type="button" className={styles.iconAction} aria-label="Map view">
              <MapPin size={20} />
            </button>

            <select
              className={styles.filterSelect}
              value={qualityFilter}
              onChange={(e) => setQualityFilter(e.target.value)}
            >
              <option value="all">All Quality</option>
              <option value="good">Good</option>
              <option value="moderate">Moderate</option>
              <option value="poor">Poor</option>
            </select>

            {qualityFilter !== 'all' && (
              <button
                type="button"
                className={styles.clearFilter}
                onClick={() => setQualityFilter('all')}
              >
                Clear Filter
              </button>
            )}

            <button type="button" className={styles.addBtn}>
              <Plus size={18} />
              Add new Pond
            </button>
          </div>
        </div>

        <div className={styles.tableSection}>
          <h2 className={styles.sectionTitle}>
            Pond water parameters
            <span className={styles.sectionHint}>
              Ideal: pH 6.5–8.5 · NH₃ & NO₂ ~0 ppm · NO₃ &lt; 30 mg/L · DO ≥ 6.0 mg/L
            </span>
          </h2>
          <PondTable ponds={filteredPonds} />
        </div>
      </div>
    </div>
  );
}
