import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './contexts/ProgressContext';
import { AchievementNotificationManager } from './components/AchievementNotification';
import { DevResetButton } from './components/DevResetButton';
import Index from './pages/Index';
import Modulos from './pages/Modulos';
import ModuleDetail from './pages/modulos/[id]';
// import ProgressDemo from './pages/ProgressDemo';


function App() {
  return (
    <ProgressProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/modulos" element={<Modulos />} />
            <Route path="/modulos/:id" element={<ModuleDetail />} />
            {/* <Route path="/progress-demo" element={<ProgressDemo />} /> */}

          </Routes>
          <AchievementNotificationManager />
          <DevResetButton />
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;
