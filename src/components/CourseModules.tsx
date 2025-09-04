import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Play, 
  Sparkles, 
  Star, 
  Zap, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  ArrowRight, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  FileText,
  Stethoscope,
  GraduationCap
} from "lucide-react";
import { courseModulesContent, ModuleContent } from "@/data/courseContent";

import { useProgress } from "@/contexts/ProgressContext";

interface CourseModulesProps {
  onShowCartilha?: () => void;
}

const CourseModules = ({ onShowCartilha }: CourseModulesProps) => {
  const navigate = useNavigate();

  const {
    progress,
    getProgressPercentage,
    getCompletedModules,
    setModuleActive,
    setModuleStudying
  } = useProgress();

  const isModuleCompleted = (moduleId: number) => {
    return Boolean(progress[moduleId]?.completed);
  };

  const getModuleProgress = (moduleId: number) => {
    return progress[moduleId];
  };

  const handleModuleClick = (module: ModuleContent) => {
    // Navegar diretamente para a página do módulo
    navigate(`/modulos/${module.id}`);
  };



  const handleStartModule = (moduleId: number) => {
    // Ativar o módulo e iniciar o estudo
    setModuleActive(moduleId, true);
    setModuleStudying(moduleId, true);
    
    // Navegar para o módulo
    navigate(`/modulos/${moduleId}`);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      Brain: Lightbulb,
      Settings: Target,
      Camera: Eye,
      Shield: Award,
      Database: TrendingUp,
      Building: Users,
      FileText: Clock,
      BarChart3: TrendingUp,
      BookOpen: Lightbulb
    };
    return iconMap[iconName] || Lightbulb;
  };

  const getModuleColors = (moduleId: number) => {
    return {
      icon: "from-blue-400 to-blue-500",
      bg: "from-blue-50 to-blue-100",
      badge: "from-blue-400 to-blue-500"
    };
  };



  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium border border-slate-200 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-slate-600" />
            <span>Curso Estruturado</span>
            <Star className="w-4 h-4 text-slate-500" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Módulos do Curso
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore todos os módulos e descubra o conteúdo completo do curso de Saúde Digital
          </p>

          {/* Botão de Reset para Desenvolvimento */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm('Resetar todo o progresso? Isso irá zerar tempo, módulos e conquistas.')) {
                    localStorage.removeItem('courseProgress');
                    localStorage.removeItem('courseAchievements');
                    localStorage.removeItem('userLevel');
                    window.location.reload();
                  }
                }}
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                🔄 Reset Progresso (Dev)
              </Button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">15h</div>
              <div className="text-xs text-slate-600">Duração Total</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 text-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">9</div>
              <div className="text-xs text-slate-600">Módulos</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 text-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">{getCompletedModules()}</div>
              <div className="text-xs text-slate-600">Concluídos</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 text-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-4 h-4 text-orange-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">{getProgressPercentage()}%</div>
              <div className="text-xs text-slate-600">Progresso</div>
            </div>
          </div>
        </div>

                 {/* Modules Grid */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseModulesContent.map((module, index) => {
            const IconComponent = getIconComponent(module.icon);
            const colors = getModuleColors(module.id);
            const isCompleted = isModuleCompleted(module.id);
            
            return (
              <Card 
                key={module.id} 
                className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden group ${colors.bg} relative`}
                onClick={() => handleModuleClick(module)}
              >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${getModuleProgress(module.id)?.progress || 0}%` }}
                  ></div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 from-slate-500/10 to-gray-600/10"></div>
                
                                 <CardHeader className="relative z-10 pb-4">
                   <div className="flex items-start justify-between mb-3">
                     <div className="flex items-center gap-3">
                       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.icon} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative`}>
                         <IconComponent className="w-6 h-6 text-white" />
                         {isCompleted && (
                           <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                             <CheckCircle className="w-3 h-3 text-white" />
                           </div>
                         )}
                       </div>
                       <div>
                         <span className="text-xs text-slate-600 font-medium">Módulo {module.id}</span>
                         <CardTitle className="text-lg font-bold text-slate-900 leading-tight">
                           {module.title}
                         </CardTitle>
                       </div>
                     </div>
                     <Badge className={`bg-gradient-to-r ${colors.badge} text-white border-0 shadow-md text-xs`}>
                       {module.duration}
                     </Badge>
                   </div>
                 </CardHeader>

                 <CardContent className="relative z-10 space-y-3">
                   <CardDescription className="text-slate-600 text-sm leading-relaxed">
                     {module.description}
                   </CardDescription>

                   <div className="flex flex-wrap gap-1.5">
                     {module.topics.slice(0, 3).map((topic, topicIndex) => (
                       <Badge key={topicIndex} className="bg-white/80 text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors text-xs">
                         {topic}
                       </Badge>
                     ))}
                     {module.topics.length > 3 && (
                       <Badge className="bg-slate-100 text-slate-600 border border-slate-200 text-xs">
                         +{module.topics.length - 3} mais
                       </Badge>
                     )}
                   </div>

                   {/* Target Audience Preview */}
                   <div className="flex items-center gap-2 pt-1">
                     <Target className="w-3 h-3 text-blue-500" />
                     <div className="flex gap-1">
                       <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                         <Stethoscope className="w-2.5 h-2.5 text-blue-600" />
                       </div>
                       <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                         <Users className="w-2.5 h-2.5 text-green-600" />
                       </div>
                       <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                         <GraduationCap className="w-2.5 h-2.5 text-purple-600" />
                       </div>
                     </div>
                     <span className="text-xs text-slate-500">Público-alvo</span>
                   </div>

                   {/* Progress Info */}
                   <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                     <div className="flex items-center gap-2">
                       <Clock className="w-3 h-3 text-slate-500" />
                       <span className="text-xs text-slate-600">{module.duration}</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                       <span className="text-xs text-slate-500">
                         {getModuleProgress(module.id)?.progress || 0}% concluído
                       </span>
                     </div>
                   </div>

                   <div className="flex gap-3 pt-4">
                     <Button 
                       variant="outline" 
                       size="sm"
                       className="flex-1 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transform hover:scale-105 transition-all duration-300 group text-xs h-8"
                       onClick={(e) => {
                         e.stopPropagation();
                         handleModuleClick(module);
                       }}
                     >
                       <Eye className="w-3 h-3 mr-1 group-hover:animate-pulse" />
                       Ver Detalhes
                     </Button>
                     <Button 
                       size="sm"
                       className={`flex-1 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group text-xs h-8 ${
                         isCompleted 
                           ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                           : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                       }`}
                       onClick={(e) => {
                         e.stopPropagation();
                         handleStartModule(module.id);
                       }}
                     >
                       {isCompleted ? (
                         <>
                           <CheckCircle className="w-3 h-3 mr-1 group-hover:animate-pulse" />
                           Concluído
                         </>
                       ) : (
                         <>
                           <Play className="w-3 h-3 mr-1 group-hover:animate-pulse" />
                           Iniciar
                         </>
                       )}
                     </Button>
                   </div>
                 </CardContent>
              </Card>
            );
          })}
        </div>

                                   {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Pronto para começar sua jornada?
              </h3>
              <p className="text-blue-800 mb-6 max-w-2xl mx-auto font-medium">
                Desenvolva as competências essenciais em Saúde Digital para alavancar sua trajetória profissional.
              </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate("/modulos")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group text-white font-semibold"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Ver Todos os Módulos
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              {onShowCartilha && (
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-emerald-500 hover:border-emerald-600 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group font-semibold"
                  onClick={onShowCartilha}
                >
                  <FileText className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Ver Cartilha Oficial
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseModules;
