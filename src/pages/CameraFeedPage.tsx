import { Video, VideoOff, ExternalLink } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { PageSection } from '../components/ui/PageSection';
import { cameraFeeds } from '../data/mockData';
import pageStyles from '../styles/pageContent.module.css';
import styles from './CameraFeedPage.module.css';

const CAMERA_IMAGE =
  'https://www.figma.com/api/mcp/asset/77e070c3-3047-4b8c-a2ed-d05ae807d502';

export function CameraFeedPage() {
  return (
    <div className={pageStyles.page}>
      <Header
        title="Camera Feed"
        subtitle="Monitor fish behavior — gasping at surface may indicate low DO or nitrite issues"
      />

      <div className={pageStyles.content}>
        <div className={styles.grid}>
          {cameraFeeds.map((cam) => (
            <article key={cam.id} className={styles.camCard}>
              <div className={styles.preview}>
                {cam.status === 'Online' ? (
                  <img src={CAMERA_IMAGE} alt={`${cam.pond} camera`} />
                ) : (
                  <div className={styles.offline}>
                    <VideoOff size={40} />
                    <span>Camera offline</span>
                  </div>
                )}
                <span
                  className={`${styles.status} ${cam.status === 'Online' ? styles.online : styles.offlineBadge}`}
                >
                  {cam.status === 'Online' ? <Video size={12} /> : <VideoOff size={12} />}
                  {cam.status}
                </span>
              </div>
              <div className={styles.camInfo}>
                <h3>{cam.pond}</h3>
                <p>Last frame: {cam.lastFrame}</p>
                <button
                  type="button"
                  className={styles.viewBtn}
                  disabled={cam.status !== 'Online'}
                >
                  <ExternalLink size={16} />
                  View live feed
                </button>
              </div>
            </article>
          ))}
        </div>

        <PageSection title="What to watch for">
          <ul className={styles.watchList}>
            <li>Fish gasping at the surface — may indicate low dissolved oxygen or nitrite (Brown Blood Disease)</li>
            <li>Rubbing against pond walls — possible parasitic infection (Trichodiniasis, Argulus)</li>
            <li>Lethargy or erratic swimming — bacterial or viral disease; check water parameters</li>
            <li>Visible white spots or cotton-like growth — White Spot Disease or Saprolegniasis</li>
          </ul>
        </PageSection>
      </div>
    </div>
  );
}
