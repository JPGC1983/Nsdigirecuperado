import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Clock, 
  CheckCircle, 
  BookOpen,
  Target,
  Lightbulb,
  Award,
  Users,
  Settings,
  Database,
  Shield,
  Building,
  FileText,
  BarChart3,
  Sparkles,
  Star,
  ExternalLink,
  Download,
  Eye,
  Zap,
  Brain,
  Info
} from "lucide-react";
import modulosData from "@/data/modulos.json";
import { getQuizByModuleId } from "@/data/quizData";
import ModuleQuizComponent from "@/components/ModuleQuiz";
import ModuleTransition from "@/components/ModuleTransition";

interface Modulo {
  id: number;
  titulo: string;
  descricao: string;
  duracao: string;
  tags: string[];
  corIcone: string;
  videoUrl: string;
  resumo: string;
  aplicacoesPraticas: string[];
  linksUteis: {
    titulo: string;
    url: string;
    descricao: string;
  }[];
  secoes: {
    titulo: string;
    conteudo: string;
    pontosChave: string[];
  }[];
}

const ModuloPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');
  const { markModuleAsCompleted, isModuleCompleted } = useProgress();
  const [modulo, setModulo] = useState<Modulo | null>(null);
  const [progresso, setProgresso] = useState(0);
  const [concluido, setConcluido] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const totalModulos = modulosData.modulos.length;

  const carregarProgresso = useCallback((moduloId: number) => {
    const progressoSalvo = JSON.parse(localStorage.getItem('progresso') || '{}');
    const moduloProgresso = progressoSalvo[`modulo_${moduloId}`];
    if (moduloProgresso) {
      setProgresso(moduloProgresso.progresso || 0);
      setConcluido(moduloProgresso.concluido || false);
    } else if (isModuleCompleted(moduloId)) {
      // Sincroniza o estado local se o contexto diz que está completo, mas não há registro local.
      setProgresso(100);
      setConcluido(true);
    }
  }, [isModuleCompleted]);

  useEffect(() => {
    if (id) {
      const moduloEncontrado = modulosData.modulos.find(m => m.id === Number(id));
      if (moduloEncontrado) {
        setModulo(moduloEncontrado);
        carregarProgresso(Number(id));
      }
      setIsPreview(view === 'preview');
    }
  }, [id, view, carregarProgresso]);

  const salvarProgresso = useCallback((novoProgresso: number, moduloConcluido: boolean = false) => {
    const progressoAtual = JSON.parse(localStorage.getItem('progresso') || '{}');
    progressoAtual[`modulo_${id}`] = {
      progresso: novoProgresso,
      concluido: moduloConcluido,
      ultimoAcesso: new Date().toISOString()
    };
    localStorage.setItem('progresso', JSON.stringify(progressoAtual));
    setProgresso(novoProgresso);
    setConcluido(moduloConcluido);
  }, [id]);

  const marcarComoConcluido = useCallback(() => {
    salvarProgresso(100, true);
    markModuleAsCompleted(Number(id));
    setShowTransition(true);
  }, [salvarProgresso, markModuleAsCompleted, id]);

  const handleQuizComplete = useCallback((score: number, totalQuestions: number) => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 60) {
      salvarProgresso(100, true);
      markModuleAsCompleted(Number(id));
      setShowTransition(true);
    } else {
      // Se não atingiu 60%, não marca como concluído mas salva o progresso
      salvarProgresso(Math.max(progresso, 30), false);
    }
    setShowQuiz(false);
  }, [progresso, salvarProgresso, markModuleAsCompleted, id]);

  const navegarParaModulo = useCallback((direcao: 'anterior' | 'proximo') => {
    const moduloAtual = Number(id);
    
    if (direcao === 'anterior') {
      if (moduloAtual === 1) {
        navigate('/');
        return;
      }
      // Caso contrário, vai para o módulo anterior
      const moduloAnterior = moduloAtual - 1;
      if (moduloAnterior >= 1) {
        navigate(`/modulos/${moduloAnterior}`);
      }
    } else {
      // Navegação para o próximo módulo
      const proximoModulo = moduloAtual + 1;
      if (proximoModulo <= totalModulos) {
        navigate(`/modulos/${proximoModulo}`);
      }
    }
  }, [id, navigate, totalModulos]);

  const getIconComponent = (index: number) => {
    const iconMap = [
      BookOpen,    // Módulo 1
      Target,      // Módulo 2
      Database,    // Módulo 3
      Lightbulb,   // Módulo 4
      Shield,      // Módulo 5
      Sparkles,    // Módulo 6
      BarChart3,   // Módulo 7
      Settings,    // Módulo 8
      Award        // Módulo 9
    ];
    return iconMap[index] || BookOpen;
  };

  if (!modulo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando módulo...</p>
        </div>
      </div>
    );
  }

  const IconComponent = getIconComponent(modulo.id - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header com progresso */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                             <Button 
                 variant="outline" 
                 size="sm"
                 onClick={() => navigate('/')}
                 className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
               >
                 <ArrowLeft className="w-4 h-4 mr-2" />
                 Voltar
               </Button>
              
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${modulo.corIcone} flex items-center justify-center`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Módulo {modulo.id}</h1>
                  <p className="text-sm text-slate-600">{modulo.titulo}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Progresso</p>
                <p className="text-lg font-bold text-slate-900">{progresso}%</p>
              </div>
              <Progress value={progresso} className="w-24 h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header do Módulo */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium border border-slate-200">
                <Sparkles className="w-4 h-4 text-slate-600" />
                <span>Módulo {modulo.id}</span>
                <Star className="w-4 h-4 text-slate-500" />
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {modulo.titulo}
              </h1>
              
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {modulo.descricao}
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span className="font-semibold text-slate-700">{modulo.duracao}</span>
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

            {/* Vídeo */}
            {!isPreview && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-slate-900">
                    <Play className="w-5 h-5 text-slate-600" />
                    Videoaula do Módulo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {modulo.videoUrl ? (
                    <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                      <video controls className="w-full h-full">
                        <source src={modulo.videoUrl} type="video/mp4" />
                        Seu navegador não suporta a reprodução de vídeo.
                      </video>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto">
                          <Play className="w-8 h-8 text-slate-400" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-slate-700">
                            Videoaula em Desenvolvimento
                          </h3>
                          <p className="text-slate-500 text-sm max-w-md">
                            Este módulo está focado no conteúdo teórico e prático. 
                            As videoaulas serão adicionadas em breve.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Resumo */}
            <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <BookOpen className="w-5 h-5 text-slate-600" />
                  Resumo do Módulo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {modulo.resumo}
                </p>
              </CardContent>
            </Card>

            {/* Seções de Conteúdo */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Target className="w-6 h-6 text-slate-600" />
                Conteúdo Detalhado
              </h2>
              
              {modulo.secoes.map((secao, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900 flex items-center gap-3">
                      <div className={`p-2 bg-gradient-to-br ${modulo.corIcone} rounded-lg`}>
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      {secao.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-slate-700 leading-relaxed text-lg">
                      {secao.conteudo}
                    </p>
                    
                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-slate-600" />
                        Pontos-Chave:
                      </h4>
                      <div className="space-y-3">
                        {secao.pontosChave.map((ponto, pontoIndex) => (
                          <div key={pontoIndex} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                            <CheckCircle className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700">{ponto}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Aplicações Práticas */}
            <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <Target className="w-5 h-5 text-slate-600" />
                  Aplicações Práticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modulo.aplicacoesPraticas.map((aplicacao, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors">
                      <div className={`w-3 h-3 bg-gradient-to-br ${modulo.corIcone} rounded-full mt-2 flex-shrink-0 shadow-md`}></div>
                      <span className="text-slate-700">{aplicacao}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Links Úteis */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <ExternalLink className="w-5 h-5 text-slate-600" />
                  Links Úteis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {modulo.linksUteis.map((link, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <h4 className="font-semibold text-slate-900 mb-2">{link.titulo}</h4>
                    <p className="text-sm text-slate-600 mb-3">{link.descricao}</p>
                                         <Button 
                       variant="outline" 
                       size="sm"
                       className="w-full border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                       onClick={() => window.open(link.url, '_blank')}
                     >
                       <ExternalLink className="w-4 h-4 mr-2" />
                       Acessar
                     </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progresso e Ações */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <CheckCircle className="w-5 h-5 text-slate-600" />
                  Seu Progresso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Progresso atual</span>
                    <span>{progresso}%</span>
                  </div>
                  <Progress value={progresso} className="h-2" />
                </div>



                <div className="space-y-3">
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                    onClick={() => setShowQuiz(true)}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Fazer Quiz do Módulo
                  </Button>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline"
                          className="w-full border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                          onClick={marcarComoConcluido}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Marcar como Concluído
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <div className="space-y-2">
                          <p className="font-semibold">Legenda do Progresso:</p>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                              <span>0-29%: Não iniciado</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span>30-99%: Em progresso</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>100%: Concluído</span>
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="text-xs text-slate-500 text-center p-2 bg-slate-50 rounded-lg">
                    💡 <strong>Dica:</strong> Faça o quiz para testar seus conhecimentos ou marque como concluído após estudar o conteúdo.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navegação */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <ArrowRight className="w-5 h-5 text-slate-600" />
                  Navegação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline"
                  className="w-full border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                  onClick={() => navegarParaModulo('anterior')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {Number(id) === 1 ? 'Voltar ao Início' : 'Módulo Anterior'}
                </Button>

                <Button 
                  className={`w-full bg-gradient-to-r ${modulo.corIcone} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                  onClick={() => navegarParaModulo('proximo')}
                  disabled={Number(id) >= totalModulos}
                >
                  Próximo Módulo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && getQuizByModuleId(Number(id)) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ModuleQuizComponent
              quiz={getQuizByModuleId(Number(id))!}
              onComplete={handleQuizComplete}
              onClose={() => setShowQuiz(false)}
            />
          </div>
        </div>
      )}

      {/* Module Transition Modal */}
      {showTransition && (
        <ModuleTransition
          completedModuleId={Number(id)}
          nextModuleId={Number(id) + 1}
          onClose={() => setShowTransition(false)}
        />
      )}
    </div>
  );
};

export default ModuloPage; 