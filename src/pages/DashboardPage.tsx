import {
  Droplets,
  Waves,
  Bell,
  Activity,
  Maximize2,
  ChevronRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { ParameterCell } from '../components/water/ParameterCell';
import {
  dashboardSummary,
  ponds,
  trendData,
  recentAlerts,
  parameterSnapshot,
} from '../data/mockData';
import { computeOverallQuality } from '../utils/waterQuality';
import styles from './DashboardPage.module.css';

const MAP_IMAGE =
  'https://www.figma.com/api/mcp/asset/e896f9d3-2141-40b1-801a-308c51ab29d6';
const CAMERA_IMAGE =
  'https://www.figma.com/api/mcp/asset/77e070c3-3047-4b8c-a2ed-d05ae807d502';

const refPond = ponds[0];
const wqiScore = computeOverallQuality(refPond.readings) === 'Good' ? 85 : computeOverallQuality(refPond.readings) === 'Moderate' ? 62 : 38;
const gaugeData = [{ name: 'WQI', value: wqiScore, fill: wqiScore >= 75 ? '#22c55e' : wqiScore >= 50 ? '#f59e0b' : '#ef4444' }];

export function DashboardPage() {
  return (
    <div className={styles.page}>
      <Header
        title="Dashboard"
        subtitle="Real-time overview — pH, nitrogen cycle, DO, and pond health"
      />

      <div className={styles.content}>
        <div className={styles.statsRow}>
          <StatCard
            label="Water Quality (Overall)"
            value={dashboardSummary.waterQuality.label}
            subtext={dashboardSummary.waterQuality.subtext}
            icon={Droplets}
            iconColor="#22c55e"
            iconBg="#dcfce7"
          />
          <StatCard
            label="Total Ponds"
            value={dashboardSummary.totalPonds.value}
            subtext={dashboardSummary.totalPonds.subtext}
            icon={Waves}
            iconColor="#0145cc"
            iconBg="#dbeafe"
          />
          <StatCard
            label="Parameter Alerts"
            value={dashboardSummary.alerts.value}
            subtext={dashboardSummary.alerts.subtext}
            icon={Bell}
            iconColor="#ef4444"
            iconBg="#fee2e2"
          />
          <StatCard
            label="Avg Dissolved Oxygen"
            value={dashboardSummary.avgDissolvedOxygen.value}
            subtext={dashboardSummary.avgDissolvedOxygen.subtext}
            icon={Activity}
            iconColor="#0145cc"
            iconBg="#dbeafe"
          />
        </div>

        <div className={styles.middleRow}>
          <Card title="Pond Status Overview" className={styles.tableCard}>
            <div className={styles.miniTable}>
              <table>
                <thead>
                  <tr>
                    <th>Pond Name</th>
                    <th>Quality</th>
                    <th>pH</th>
                    <th>NH₃</th>
                    <th>DO</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {ponds.slice(0, 4).map((pond) => (
                    <tr key={pond.id}>
                      <td>{pond.name}</td>
                      <td>
                        <Badge variant={pond.waterQuality}>{pond.waterQuality}</Badge>
                      </td>
                      <td>
                        <ParameterCell paramId="ph" value={pond.readings.ph} />
                      </td>
                      <td>
                        <ParameterCell paramId="ammonia" value={pond.readings.ammonia} />
                      </td>
                      <td>
                        <ParameterCell paramId="dissolvedOxygen" value={pond.readings.dissolvedOxygen} />
                      </td>
                      <td>
                        <Badge variant={pond.status}>{pond.status}</Badge>
                      </td>
                      <td>
                        <ChevronRight size={16} className={styles.chevron} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card
            title="Pond Location Map"
            action={
              <button type="button" className={styles.expandBtn} aria-label="Expand map">
                <Maximize2 size={18} />
              </button>
            }
            className={styles.mapCard}
          >
            <img src={MAP_IMAGE} alt="Pond locations map" className={styles.mapImage} />
            <div className={styles.mapLegend}>
              <span className={styles.legendGood}>{ponds.filter((p) => p.waterQuality === 'Good').length} Good</span>
              <span className={styles.legendModerate}>{ponds.filter((p) => p.waterQuality === 'Moderate').length} Moderate</span>
              <span className={styles.legendPoor}>{ponds.filter((p) => p.waterQuality === 'Poor').length} Poor</span>
            </div>
          </Card>
        </div>

        <div className={styles.bottomRow}>
          <Card
            title="Water Quality Trends (Pond A - North)"
            action={
              <select className={styles.select} defaultValue="7">
                <option value="7">7 days</option>
                <option value="14">14 days</option>
              </select>
            }
            className={styles.chartCard}
          >
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#f97316" name="Temp (°C)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ph" stroke="#0145cc" name="pH" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="do" stroke="#22c55e" name="DO (mg/L)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ammonia" stroke="#ef4444" name="NH₃ (ppm)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Water Quality Index" className={styles.gaugeCard}>
            <div className={styles.gaugeWrap}>
              <ResponsiveContainer width="100%" height={160}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  barSize={12}
                  data={gaugeData}
                  startAngle={180}
                  endAngle={0}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background dataKey="value" cornerRadius={6} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className={styles.gaugeValue}>{wqiScore}/100</div>
            </div>
            <Badge variant={refPond.waterQuality}>
              {refPond.waterQuality}
            </Badge>
            <p className={styles.gaugeNote}>
              Based on pH, ammonia, nitrite, nitrate, DO, and related parameters
            </p>
          </Card>

          <Card title={`Parameter Snapshot (${refPond.name})`} className={styles.paramCard}>
            <ul className={styles.paramList}>
              {parameterSnapshot.map((item) => (
                <li key={item.paramId} className={styles.paramItem}>
                  <span>{item.label}</span>
                  <span className={styles.paramValue}>
                    {item.value} {item.unit}
                  </span>
                  <Badge variant={item.status}>{item.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className={styles.alertsRow}>
          <Card title="Recent Alerts" className={styles.alertsCard}>
            <ul className={styles.alertList}>
              {recentAlerts.slice(0, 4).map((alert) => (
                <li key={alert.id} className={styles.alertItem}>
                  <Bell size={18} className={styles.alertIcon} />
                  <div className={styles.alertContent}>
                    <strong>{alert.title}</strong>
                    <span>
                      {alert.pond} · {alert.parameter}: {alert.value}
                    </span>
                  </div>
                  <span className={styles.alertTime}>{alert.time}</span>
                  <a href="/alerts">View</a>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Camera Snapshot (Pond A - North)" className={styles.cameraCard}>
            <img src={CAMERA_IMAGE} alt="Pond camera snapshot" className={styles.cameraImage} />
            <div className={styles.cameraFooter}>
              <span>{refPond.lastUpdated}</span>
              <a href="/camera">View Live Feed</a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
