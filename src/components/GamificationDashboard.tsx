import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target, Clock, Award, TrendingUp, Zap, Crown } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';

interface GamificationDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GamificationDashboard: React.FC<GamificationDashboardProps> = ({ isOpen, onClose }) => {
  const { 
    progress, 
    achievements, 
    userLevel, 
    getProgressPercentage, 
    getCompletedModules, 
    getTotalTimeSpent 
  } = useProgress();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'stats'>('overview');

  if (!isOpen) return null;

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const progressPercentage = getProgressPercentage();
  const completedModules = getCompletedModules();
  const totalTimeSpent = getTotalTimeSpent();

  const getLevelColor = (level: number) => {
    if (level >= 8) return 'text-purple-600';
    if (level >= 6) return 'text-blue-600';
    if (level >= 4) return 'text-green-600';
    return 'text-gray-600';
  };

  const getLevelIcon = (level: number) => {
    if (level >= 8) return <Crown className="w-5 h-5" />;
    if (level >= 6) return <Award className="w-5 h-5" />;
    if (level >= 4) return <Star className="w-5 h-5" />;
    return <Target className="w-5 h-5" />;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🏆 Dashboard</h2>
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => {
                  localStorage.removeItem('courseProgress');
                  localStorage.removeItem('courseAchievements');
                  localStorage.removeItem('userLevel');
                  window.location.reload();
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                🔄 Reset Completo
              </Button>
              <Button variant="outline" onClick={onClose}>
                ✕
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'outline'}
              onClick={() => setActiveTab('overview')}
              className="flex-1"
            >
              📊 Visão Geral
            </Button>
            <Button
              variant={activeTab === 'achievements' ? 'default' : 'outline'}
              onClick={() => setActiveTab('achievements')}
              className="flex-1"
            >
              🏅 Conquistas
            </Button>
            <Button
              variant={activeTab === 'stats' ? 'default' : 'outline'}
              onClick={() => setActiveTab('stats')}
              className="flex-1"
            >
              📈 Estatísticas
            </Button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* User Level Card */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getLevelIcon(userLevel.level)}
                      <div>
                        <CardTitle className={`text-xl ${getLevelColor(userLevel.level)}`}>
                          Nível {userLevel.level} - {userLevel.title}
                        </CardTitle>
                        <CardDescription>
                          Experiência: {userLevel.experience}/{userLevel.experienceToNext} XP
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{userLevel.level}</div>
                      <div className="text-sm text-gray-500">Nível</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={(userLevel.experience / userLevel.experienceToNext) * 100} className="mb-2" />
                  <p className="text-sm text-gray-600">
                    {userLevel.experienceToNext - userLevel.experience} XP para o próximo nível
                  </p>
                </CardContent>
              </Card>

              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span>Progresso Geral</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{progressPercentage}%</div>
                    <p className="text-sm text-gray-600">{completedModules}/9 módulos concluídos</p>
                    <Progress value={progressPercentage} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      <span>Conquistas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">{unlockedAchievements.length}</div>
                    <p className="text-sm text-gray-600">de {achievements.length} desbloqueadas</p>
                    <div className="flex space-x-1 mt-2">
                      {achievements.map((achievement, index) => (
                        <div
                          key={achievement.id}
                          className={`w-3 h-3 rounded-full ${
                            achievement.unlocked ? 'bg-yellow-400' : 'bg-gray-300'
                          }`}
                          title={achievement.name}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <span>Tempo de Estudo</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{totalTimeSpent}</div>
                    <p className="text-sm text-gray-600">minutos dedicados</p>
                    <div className="mt-2 text-xs text-gray-500">
                      Média: {completedModules > 0 ? Math.round(totalTimeSpent / completedModules) : 0}min/módulo
                    </div>
                    <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs text-green-700">
                        ⏱️ O tempo só é contado quando você está ativamente estudando
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🏅 Suas Conquistas</h3>
              
              {/* Unlocked Achievements */}
              {unlockedAchievements.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">✅ Desbloqueadas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {unlockedAchievements.map((achievement) => (
                      <Card key={achievement.id} className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-green-800">{achievement.name}</h5>
                              <p className="text-sm text-gray-600">{achievement.description}</p>
                              {achievement.unlockedAt && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Desbloqueada em {new Date(achievement.unlockedAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked Achievements */}
              {lockedAchievements.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">🔒 Bloqueadas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lockedAchievements.map((achievement) => (
                      <Card key={achievement.id} className="bg-gray-50 border-gray-200 opacity-60">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl filter grayscale">{achievement.icon}</div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-600">{achievement.name}</h5>
                              <p className="text-sm text-gray-500">{achievement.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Estatísticas Detalhadas</h3>
              
              {/* Module Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Progresso por Módulo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((moduleId) => {
                      const moduleProgress = progress[moduleId];
                      const isCompleted = moduleProgress?.completed || false;
                      const progressValue = moduleProgress?.progress || 0;
                      
                      return (
                        <div key={moduleId} className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                            {moduleId}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Módulo {moduleId}</span>
                              <span className="font-semibold">{progressValue}%</span>
                            </div>
                            <Progress value={progressValue} className="h-2" />
                          </div>
                          {isCompleted && (
                            <div className="text-green-600">
                              <Star className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Time Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Estatísticas de Tempo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{totalTimeSpent}</div>
                      <div className="text-sm text-gray-600">Horas Totais</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {completedModules > 0 ? Math.round(totalTimeSpent / completedModules) : 0}
                      </div>
                      <div className="text-sm text-gray-600">Média por Módulo</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 