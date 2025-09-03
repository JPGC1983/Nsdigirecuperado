import React from 'react';
import { Clock, Play, Pause } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useStudyTimer } from '@/hooks/useStudyTimer';

interface StudyTimerIndicatorProps {
  moduleId: number;
  className?: string;
}

export const StudyTimerIndicator: React.FC<StudyTimerIndicatorProps> = ({ 
  moduleId, 
  className = '' 
}) => {
  const { isStudying, localTime } = useStudyTimer(moduleId);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        {isStudying ? (
          <Play className="w-4 h-4 text-green-600 animate-pulse" />
        ) : (
          <Pause className="w-4 h-4 text-gray-500" />
        )}
        <Clock className="w-4 h-4 text-gray-600" />
      </div>
      
      <Badge 
        variant={isStudying ? "default" : "secondary"}
        className={isStudying ? "bg-green-100 text-green-800 border-green-200" : ""}
      >
        {formatTime(localTime)}
      </Badge>
      
      <span className="text-xs text-gray-500">
        {isStudying ? 'Estudando...' : 'Pausado'}
      </span>
    </div>
  );
};
