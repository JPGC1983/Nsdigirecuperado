import React, { useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';

interface AchievementNotificationProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: string;
  };
  onClose: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({ 
  achievement, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animar entrada
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-close após 5 segundos
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Aguardar animação de saída
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg border-2 border-yellow-300 p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="text-3xl animate-bounce">{achievement.icon}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-lg">🏆 Conquista Desbloqueada!</h3>
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="text-white hover:text-yellow-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-white font-semibold">{achievement.name}</p>
            <p className="text-yellow-100 text-sm">{achievement.description}</p>
            {achievement.unlockedAt && (
              <p className="text-yellow-200 text-xs mt-1">
                Desbloqueada agora mesmo!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AchievementNotificationManager: React.FC = () => {
  const { achievements } = useProgress();
  const [recentAchievement, setRecentAchievement] = useState<typeof achievements[0] | null>(null);

  useEffect(() => {
    // Verificar por conquistas recém-desbloqueadas
    const unlockedAchievements = achievements.filter(a => a.unlocked);
    const mostRecent = unlockedAchievements
      .filter(a => a.unlockedAt)
      .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())[0];

    if (mostRecent && !recentAchievement) {
      setRecentAchievement(mostRecent);
    }
  }, [achievements, recentAchievement]);

  if (!recentAchievement) return null;

  return (
    <AchievementNotification
      achievement={recentAchievement}
      onClose={() => setRecentAchievement(null)}
    />
  );
}; 