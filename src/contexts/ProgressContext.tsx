import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressData {
  [moduleId: number]: {
    completed: boolean;
    progress: number;
    quizScore?: number;
    timeSpent?: number;
    lastAccessed?: string;
    isActive?: boolean; // Campo para rastrear módulo ativo
    isStudying?: boolean; // Novo campo para rastrear se está estudando ativamente
  };
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface UserLevel {
  level: number;
  experience: number;
  experienceToNext: number;
  title: string;
}

interface ProgressContextType {
  progress: ProgressData;
  achievements: Achievement[];
  userLevel: UserLevel;
  updateProgress: (moduleId: number, progress: number, completed?: boolean) => void;
  updateQuizScore: (moduleId: number, score: number) => void;
  unlockAchievement: (achievementId: string) => void;
  addExperience: (amount: number) => void;
  getProgressPercentage: () => number;
  getCompletedModules: () => number;
  getTotalTimeSpent: () => number;
  setModuleActive: (moduleId: number, active: boolean) => void;
  setModuleStudying: (moduleId: number, studying: boolean) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_module',
    name: 'Primeiro Passo',
    description: 'Complete seu primeiro módulo',
    icon: '🎯',
    unlocked: false
  },
  {
    id: 'half_course',
    name: 'Metade do Caminho',
    description: 'Complete 5 módulos',
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'perfect_quiz',
    name: 'Perfeição',
    description: 'Acerte 100% em um quiz',
    icon: '⭐',
    unlocked: false
  },
  {
    id: 'speed_learner',
    name: 'Aprendiz Rápido',
    description: 'Complete 3 módulos em um dia',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'course_master',
    name: 'Mestre do SUS Digital',
    description: 'Complete todos os módulos',
    icon: '👑',
    unlocked: false
  }
];

const LEVEL_TITLES = [
  'Iniciante', 'Aprendiz', 'Estudante', 'Conhecido', 'Experiente',
  'Especialista', 'Mestre', 'Sábio', 'Lenda', 'Ícone'
];

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressData>({});
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [userLevel, setUserLevel] = useState<UserLevel>({
    level: 1,
    experience: 0,
    experienceToNext: 100,
    title: LEVEL_TITLES[0]
  });
  const [isUserActive, setIsUserActive] = useState(false); // Novo estado para rastrear atividade do usuário

  useEffect(() => {
    const savedProgress = localStorage.getItem('courseProgress');
    const savedAchievements = localStorage.getItem('courseAchievements');
    const savedLevel = localStorage.getItem('userLevel');

    if (savedProgress) {
      const parsedProgress = JSON.parse(savedProgress);
      // Zerar todo o tempo existente
      const resetProgress = Object.keys(parsedProgress).reduce((acc, moduleId) => {
        acc[Number(moduleId)] = {
          ...parsedProgress[Number(moduleId)],
          timeSpent: 0, // Zerar tempo
          isStudying: false // Marcar como não estudando
        };
        return acc;
      }, {} as ProgressData);
      setProgress(resetProgress);
    } else {
      setProgress({});
    }
    
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
    if (savedLevel) {
      setUserLevel(JSON.parse(savedLevel));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('courseProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('courseAchievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('userLevel', JSON.stringify(userLevel));
  }, [userLevel]);

  // Sistema de contagem de tempo em tempo real - SÓ quando usuário estiver ativo
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isUserActive) return; // Não conta tempo se usuário não estiver ativo
      
      setProgress(prev => {
        let hasChanges = false;
        const updated = { ...prev };
        
        Object.keys(updated).forEach(moduleId => {
          const moduleData = updated[Number(moduleId)];
          if (moduleData?.isActive && moduleData?.isStudying && !moduleData.completed) {
            updated[Number(moduleId)] = {
              ...moduleData,
              timeSpent: (moduleData.timeSpent || 0) + 1
            };
            hasChanges = true;
          }
        });
        
        return hasChanges ? updated : prev;
      });
    }, 60000); // Incrementa a cada 1 minuto (60000ms)

    return () => clearInterval(interval);
  }, [isUserActive]);

  // Detectar atividade do usuário
  useEffect(() => {
    let activityTimeout: NodeJS.Timeout;
    
    const handleUserActivity = () => {
      setIsUserActive(true);
      
      // Reset do timeout de inatividade
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        setIsUserActive(false);
        // Pausar contagem de tempo em todos os módulos
        setProgress(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(moduleId => {
            if (updated[Number(moduleId)]?.isStudying) {
              updated[Number(moduleId)] = {
                ...updated[Number(moduleId)],
                isStudying: false
              };
            }
          });
          return updated;
        });
      }, 1800000); // 30 minutos de inatividade
    };

    // Eventos para detectar atividade
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
      clearTimeout(activityTimeout);
    };
  }, []);

  const updateProgress = (moduleId: number, progressValue: number, completed?: boolean) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        [moduleId]: {
          ...prev[moduleId],
          progress: progressValue,
          completed: completed || progressValue === 100,
          lastAccessed: new Date().toISOString(),
          timeSpent: prev[moduleId]?.timeSpent || 0, // Não incrementa automaticamente
          isActive: !completed, // Ativa o módulo se não estiver completo
          isStudying: false // Inicialmente não está estudando
        }
      };

      // Check achievements
      checkAchievements(updated);
      
      return updated;
    });
  };

  const updateQuizScore = (moduleId: number, score: number) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        quizScore: score
      }
    }));

    // Check for perfect quiz achievement
    if (score === 100) {
      unlockAchievement('perfect_quiz');
    }
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId && !achievement.unlocked
          ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
          : achievement
      )
    );
  };

  const addExperience = (amount: number) => {
    setUserLevel(prev => {
      let newExp = prev.experience + amount;
      let newLevel = prev.level;
      let newTitle = prev.title;

      while (newExp >= prev.experienceToNext) {
        newExp -= prev.experienceToNext;
        newLevel++;
        newTitle = LEVEL_TITLES[Math.min(newLevel - 1, LEVEL_TITLES.length - 1)];
      }

      return {
        level: newLevel,
        experience: newExp,
        experienceToNext: newLevel * 100,
        title: newTitle
      };
    });
  };

  const checkAchievements = (currentProgress: ProgressData) => {
    const completedModules = Object.values(currentProgress).filter(p => p.completed).length;
    
    if (completedModules >= 1) unlockAchievement('first_module');
    if (completedModules >= 5) unlockAchievement('half_course');
    if (completedModules >= 9) unlockAchievement('course_master');

    // Check for speed learner (3 modules in one day)
    const today = new Date().toDateString();
    const todayCompleted = Object.values(currentProgress).filter(p => 
      p.completed && new Date(p.lastAccessed || '').toDateString() === today
    ).length;
    
    if (todayCompleted >= 3) unlockAchievement('speed_learner');
  };

  const getProgressPercentage = () => {
    const totalModules = 9;
    const completedModules = Object.values(progress).filter(p => p.completed).length;
    return Math.round((completedModules / totalModules) * 100);
  };

  const getCompletedModules = () => {
    return Object.values(progress).filter(p => p.completed).length;
  };

  const getTotalTimeSpent = () => {
    return Object.values(progress).reduce((total, p) => total + (p.timeSpent || 0), 0);
  };

  // Nova função para ativar/desativar módulo
  const setModuleActive = (moduleId: number, active: boolean) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        isActive: active,
        isStudying: active && isUserActive // Só marca como estudando se estiver ativo e usuário ativo
      }
    }));
  };

  // Nova função para iniciar/pausar estudo de um módulo
  const setModuleStudying = (moduleId: number, studying: boolean) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        isStudying: studying && isUserActive // Só permite estudar se usuário estiver ativo
      }
    }));
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      achievements,
      userLevel,
      updateProgress,
      updateQuizScore,
      unlockAchievement,
      addExperience,
      setModuleActive,
      setModuleStudying, // Nova função
      getProgressPercentage,
      getCompletedModules,
      getTotalTimeSpent
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}; 