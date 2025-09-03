import { useEffect, useRef, useState, useCallback } from 'react';
import { useProgress } from '@/contexts/ProgressContext';

export const useStudyTimer = (moduleId: number) => {
  const { progress, setModuleStudying } = useProgress();
  const [isStudying, setIsStudying] = useState(false);
  const [localTime, setLocalTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // Inicializar tempo local do módulo
  useEffect(() => {
    const moduleData = progress[moduleId];
    if (moduleData?.timeSpent) {
      setLocalTime(moduleData.timeSpent);
    }
  }, [moduleId, progress]);

  const startStudying = useCallback(() => {
    setIsStudying(true);
    setModuleStudying(moduleId, true);
    
    // Iniciar contador local
    intervalRef.current = setInterval(() => {
      setLocalTime(prev => prev + 1);
    }, 60000); // Incrementar a cada minuto
  }, [moduleId, setModuleStudying]);

  const pauseStudying = useCallback(() => {
    setIsStudying(false);
    setModuleStudying(moduleId, false);
    
    // Parar contador local
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [moduleId, setModuleStudying]);

  const stopStudying = useCallback(() => {
    setIsStudying(false);
    setModuleStudying(moduleId, false);
    
    // Parar contador local
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [moduleId, setModuleStudying]);

  // Detectar atividade do usuário
  useEffect(() => {
    const handleUserActivity = () => {
      lastActivityRef.current = Date.now();
      
      // Se não estiver estudando, iniciar
      if (!isStudying) {
        startStudying();
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [isStudying, startStudying]);

  // Verificar inatividade
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityRef.current;
      
      // Se passou mais de 30 minutos sem atividade, pausar estudo
      if (timeSinceLastActivity > 1800000 && isStudying) {
        pauseStudying();
      }
    };

    const inactivityInterval = setInterval(checkInactivity, 60000); // Verificar a cada minuto

    return () => clearInterval(inactivityInterval);
  }, [isStudying, pauseStudying]);

  // Limpar intervalo quando componente for desmontado
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isStudying,
    localTime,
    startStudying,
    pauseStudying,
    stopStudying
  };
};
npm run dev
 
