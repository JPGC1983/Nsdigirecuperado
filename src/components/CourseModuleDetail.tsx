import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  BookOpen, 
  Users, 
  CheckCircle, 
  Play,
  Download,
  ExternalLink,
  FileText,
  Lightbulb,
  Target,
  Award,
  Sparkles,
  Star,
  Zap,
  TrendingUp,
  Globe,
  Heart,
  ArrowLeft,
  ArrowRight,
  BookOpen as BookOpenIcon,
  Video,
  FileText as FileTextIcon,
  Award as AwardIcon
} from "lucide-react";
import { ModuleContent } from "@/data/courseContent";
import TargetAudienceSection from "./TargetAudienceSection";

interface CourseModuleDetailProps {
  module: ModuleContent;
  onClose: () => void;
  onStartModule?: (moduleId: number) => void;
}

const CourseModuleDetail = ({ module, onClose, onStartModule }: CourseModuleDetailProps) => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium border border-slate-200 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-slate-600" />
          <span>Módulo {module.id}</span>
          <Star className="w-4 h-4 text-slate-500" />
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
          {module.title}
        </h1>
        
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {module.description}
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50">
            <Clock className="w-4 h-4 text-slate-600" />
            <span className="font-semibold text-slate-700">{module.duration}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50">
            <Users className="w-4 h-4 text-slate-600" />
            <span className="font-semibold text-slate-700">Nível Intermediário</span>
          </div>
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50">
            <Award className="w-4 h-4 text-slate-600" />
            <span className="font-semibold text-slate-700">Certificado Incluso</span>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-900">
            <div className="p-2 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg">
              <Play className="w-5 h-5 text-white" />
            </div>
            Introdução ao Módulo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 leading-relaxed text-lg">
            {module.detailedContent.introduction}
          </p>
        </CardContent>
      </Card>

      {/* Target Audience */}
      <TargetAudienceSection variant="detailed" />

      {/* Topics */}
      <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-900">
            <div className="p-2 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            Tópicos Principais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {module.topics.map((topic, index) => (
              <Badge key={index} className="bg-white/80 text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors">
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg">
            <BookOpenIcon className="w-6 h-6 text-white" />
          </div>
          Conteúdo Detalhado
        </h2>
        {module.detailedContent.sections.map((section, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-700 leading-relaxed text-lg">
                {section.content}
              </p>
              
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-slate-600" />
                  Pontos-Chave:
                </h4>
                <div className="space-y-3">
                  {section.keyPoints.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                      <CheckCircle className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Practical Examples */}
      <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-900">
            <div className="p-2 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            Exemplos Práticos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {module.detailedContent.practicalExamples.map((example, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors">
                <div className="w-3 h-3 bg-gradient-to-br from-slate-500 to-gray-600 rounded-full mt-2 flex-shrink-0 shadow-md"></div>
                <span className="text-slate-700">{example}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activities */}
      <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-900">
            <div className="p-2 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg">
              <Play className="w-5 h-5 text-white" />
            </div>
            Atividades Práticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {module.detailedContent.activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                <div className="w-3 h-3 bg-gradient-to-br from-slate-500 to-gray-600 rounded-full mt-2 flex-shrink-0 shadow-md"></div>
                <span className="text-slate-700">{activity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200">
        <Button 
          variant="outline" 
          className="flex-1 border-2 hover:border-slate-500 hover:bg-slate-50 transform hover:scale-105 transition-all duration-300 group"
          onClick={onClose}
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:animate-pulse" />
          Voltar aos Módulos
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          onClick={() => {
            if (onStartModule) {
              onStartModule(module.id);
            }
            onClose();
          }}
        >
          <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
          Iniciar Módulo
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default CourseModuleDetail; 