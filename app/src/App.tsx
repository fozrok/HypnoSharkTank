import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/store';
import { TopBar, ProgressRail, BottomTabs } from './components/Layout';
import ParticleWaveBackground from './components/ParticleWaveBackground';
import Dashboard from './pages/Dashboard';
import InnovationLab from './pages/InnovationLab';
import Instructions from './pages/Instructions';
import Settings from './pages/Settings';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-layout">
          <ParticleWaveBackground />
          <TopBar />
          <div className="app-body">
            <ProgressRail />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/lab" element={<InnovationLab />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <BottomTabs />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
