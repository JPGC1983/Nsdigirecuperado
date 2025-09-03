import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Users, 
  Stethoscope, 
  GraduationCap, 
  Clock, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  Trophy,
  Star,
  TrendingUp,
  Video,
  Home
} from 'lucide-react';
import { courseModulesContent } from '@/data/courseContent';
import { useProgress } from '@/contexts/ProgressContext';
import { GamificationDashboard } from '@/components/GamificationDashboard';
import { AchievementNotificationManager } from '@/components/AchievementNotification';
import { TeleconsultationSimulator } from '@/components/TeleconsultationSimulator';
import { useNavigate } from 'react-router-dom';

export default function Modulos() {
  const { progress, updateProgress, addExperience, setModuleActive } = useProgress();
  const [expandedTopics, setExpandedTopics] = useState<{ [key: number]: boolean }>({});
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTopics = (moduleId: number) => {
    setExpandedTopics(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const getModuleColors = (moduleId: number) => {
    return {
      icon: "from-blue-400 to-blue-500",
      bg: "from-blue-50 to-blue-100",
      badge: "from-blue-400 to-blue-500"
    };
  };

  const getIconComponent = (moduleId: number) => {
    const iconMap: { [key: number]: React.ComponentType<any> } = {
      1: Target,
      2: Users,
      3: Stethoscope,
      4: GraduationCap,
      5: Clock,
      6: BookOpen,
      7: Target,
      8: Users,
      9: BookOpen
    };
    return iconMap[moduleId] || Target;
  };

  const handleModuleStart = (moduleId: number) => {
    // Tratamento especial para o módulo 9 (Manual SUS Digital)
    if (moduleId === 9) {
      // Abrir o PDF do Manual SUS Digital diretamente
      window.open('/Manual_SUS_Digital.pdf', '_blank');
      return;
    }
    
    // Adicionar experiência ao iniciar módulo
    addExperience(10);
    updateProgress(moduleId, 25);
    // Ativar contagem de tempo em tempo real
    setModuleActive(moduleId, true);
  };

  const handleModuleComplete = (moduleId: number) => {
    // Adicionar experiência ao completar módulo
    addExperience(50);
    updateProgress(moduleId, 100, true);
    // Desativar contagem de tempo
    setModuleActive(moduleId, false);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (!courseModulesContent || courseModulesContent.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nenhum módulo encontrado</h2>
          <p className="text-gray-600">Não há módulos disponíveis no momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header com Gamificação */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
            <Button
              onClick={handleGoHome}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 hover:border-blue-300 transition-all duration-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md group w-fit"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Voltar ao Início</span>
            </Button>
            <div className="sm:border-l sm:border-gray-300 sm:pl-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Módulos do Curso</h1>
              <p className="text-gray-600">Explore os módulos e acompanhe seu progresso</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
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
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Progresso Geral</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round((Object.values(progress).filter(p => p.completed).length / 9) * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Módulos Concluídos</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Object.values(progress).filter(p => p.completed).length}/9
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Tempo de Estudo</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Object.values(progress).reduce((total, p) => total + (p.timeSpent || 0), 0)}h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {courseModulesContent.map((module) => {
          const IconComponent = getIconComponent(module.id);
          const colors = getModuleColors(module.id);
          const moduleProgress = progress[module.id];
          const isCompleted = moduleProgress?.completed || false;
          const progressValue = moduleProgress?.progress || 0;

          return (
            <Card key={module.id} className="h-[650px] flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-50`} />
              
              {/* Header */}
              <CardHeader className="relative z-10 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {module.title}
                    </CardTitle>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <Badge className={`bg-gradient-to-r ${colors.badge} text-white text-xs`}>
                      {module.id === 9 ? "Recursos Complementares" : module.duration}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              {/* Content */}
              <CardContent className="relative z-10 flex-1 flex flex-col p-6">
                <div className="flex-1 flex flex-col">
                  <div className="h-20 flex items-center">
                    <CardDescription className="text-slate-600 text-base leading-relaxed line-clamp-3">
                      {module.description}
                    </CardDescription>
                  </div>

                  <div className="h-16 flex items-center">
                    <div className="flex flex-wrap gap-2">
                      {module.topics.slice(0, 3).map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {module.topics.length > 3 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTopics(module.id)}
                          className="text-xs h-6 px-2"
                        >
                          {expandedTopics[module.id] ? (
                            <>
                              <ChevronUp className="w-3 h-3 mr-1" />
                              Ver menos
                            </>
                          ) : (
                            <>
                              +{module.topics.length - 3} mais
                              <ChevronDown className="w-3 h-3 ml-1" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  {expandedTopics[module.id] && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2">
                        {module.topics.slice(3).map((topic, topicIndex) => (
                          <Badge key={topicIndex + 3} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Section */}
                <div className="mt-auto space-y-4">
                  {/* Target Audience Preview */}
                  <div className="h-12 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-slate-500">Público-alvo</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <Stethoscope className="w-3 h-3 text-blue-600" />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="w-3 h-3 text-green-600" />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <GraduationCap className="w-3 h-3 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  {/* Progress Info */}
                  <div className="h-12 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {module.id === 9 ? (
                        <BookOpen className="w-4 h-4 text-slate-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-600" />
                      )}
                      <span className="text-xs text-slate-500">
                        {module.id === 9 ? "Acesso livre" : `${progressValue}% concluído`}
                      </span>
                    </div>
                    {module.id !== 9 && (
                      <div className="w-16">
                        <Progress value={progressValue} className="h-2" />
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="h-12 flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        // Lógica para abrir modal de detalhes
                        console.log(`Ver detalhes do módulo ${module.id}`);
                      }}
                    >
                      Ver Detalhes
                    </Button>
                    {module.id === 9 ? (
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800"
                        onClick={() => handleModuleStart(module.id)}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Acessar
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        onClick={() => {
                          if (isCompleted) {
                            handleModuleComplete(module.id);
                          } else {
                            handleModuleStart(module.id);
                          }
                        }}
                      >
                        {isCompleted ? "Revisar" : "Iniciar"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gamification Dashboard */}
      <GamificationDashboard 
        isOpen={isDashboardOpen} 
        onClose={() => setIsDashboardOpen(false)} 
      />

      {/* Teleconsultation Simulator */}
      <TeleconsultationSimulator 
        isOpen={isSimulatorOpen} 
        onClose={() => setIsSimulatorOpen(false)} 
      />

      {/* Achievement Notifications */}
      <AchievementNotificationManager />
    </div>
  );
} 