import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Video, Trophy } from 'lucide-react';
import CourseModules from '@/components/CourseModules';
import { GamificationDashboard } from '@/components/GamificationDashboard';
import { TeleconsultationSimulator } from '@/components/TeleconsultationSimulator';
import { AchievementNotificationManager } from '@/components/AchievementNotification';

export default function Modulos() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row gap-3 justify-end">
        <Button
          onClick={() => setIsSimulatorOpen(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm"
        >
          <Video className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Simulador Teleconsulta</span>
          <span className="sm:hidden">Teleconsulta</span>
        </Button>
        <Button
          onClick={() => setIsDashboardOpen(true)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white text-sm"
        >
          <Trophy className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
      </div>

      <CourseModules />

      <GamificationDashboard 
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
      />
      <TeleconsultationSimulator 
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />
      <AchievementNotificationManager />
    </div>
  );
}