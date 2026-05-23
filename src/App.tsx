import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PondsPage } from './pages/PondsPage';
import { RealTimeDataPage } from './pages/RealTimeDataPage';
import { WaterQualityPage } from './pages/WaterQualityPage';
import { AlertsPage } from './pages/AlertsPage';
import { ReportsPage } from './pages/ReportsPage';
import { HistoryPage } from './pages/HistoryPage';
import { CameraFeedPage } from './pages/CameraFeedPage';
import { TeamFieldDataPage } from './pages/TeamFieldDataPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ponds" element={<PondsPage />} />
          <Route path="/real-time" element={<RealTimeDataPage />} />
          <Route path="/water-quality" element={<WaterQualityPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/camera" element={<CameraFeedPage />} />
          <Route path="/team" element={<TeamFieldDataPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
