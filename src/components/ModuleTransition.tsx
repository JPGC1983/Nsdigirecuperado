import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Star, Sparkles, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ModuleTransitionProps {
  completedModuleId: number;
  nextModuleId: number;
  onClose: () => void;
}

const ModuleTransition = ({ completedModuleId, nextModuleId, onClose }: ModuleTransitionProps) => {
  const navigate = useNavigate();

  const handleNextModule = () => {
    navigate(`/modulos/${nextModuleId}`);
    onClose();
  };

  const handleBackToModules = () => {
    navigate('/modulos');
    onClose();
  };

  // Textos personalizados baseados no módulo concluído
  const getModuleSpecificContent = (moduleId: number) => {
    const content = {
      1: {
        title: "🏁 Módulo 1 Concluído!",
        subtitle: "Você deu o primeiro passo rumo ao domínio da Saúde Digital. Que tal continuar essa jornada e descobrir como a tecnologia está conectando saberes, pessoas e serviços no SUS?",
        fact: "💡 Sabia que a Organização Mundial da Saúde considera a Saúde Digital um pilar estratégico para o futuro dos sistemas de saúde? Vamos entender como isso se aplica à realidade do SUS."
      },
      2: {
        title: "🏁 Módulo 2 Concluído!",
        subtitle: "Excelente! Você já entende como a telemedicina está transformando o acesso à saúde. Agora vamos explorar como os prontuários eletrônicos estão revolucionando a gestão da informação em saúde.",
        fact: "💡 A telemedicina no Brasil já atende mais de 80% dos municípios, conectando unidades remotas com centros de referência especializada."
      },
      3: {
        title: "🏁 Módulo 3 Concluído!",
        subtitle: "Perfeito! Você compreendeu a importância dos prontuários eletrônicos. Agora vamos descobrir como a interoperabilidade está conectando diferentes sistemas de saúde.",
        fact: "💡 A RNDS (Rede Nacional de Dados em Saúde) já conecta mais de 15.000 estabelecimentos de saúde em todo o Brasil."
      },
      4: {
        title: "🏁 Módulo 4 Concluído!",
        subtitle: "Impressionante! Você já domina os conceitos de interoperabilidade. Agora vamos explorar como a inteligência artificial está revolucionando o diagnóstico e tratamento.",
        fact: "💡 A IA na saúde pode reduzir em até 30% o tempo de diagnóstico e aumentar a precisão em até 95% em alguns casos."
      },
      5: {
        title: "🏁 Módulo 5 Concluído!",
        subtitle: "Fantástico! Você entendeu o potencial da IA na saúde. Agora vamos descobrir como a segurança digital protege a privacidade dos pacientes.",
        fact: "💡 A LGPD (Lei Geral de Proteção de Dados) garante que os dados de saúde sejam tratados com máxima segurança e privacidade."
      },
      6: {
        title: "🏁 Módulo 6 Concluído!",
        subtitle: "Excelente! Você compreendeu a importância da segurança digital. Agora vamos explorar como a gestão de dados está otimizando os serviços de saúde.",
        fact: "💡 O Big Data na saúde pode prever surtos de doenças com até 3 meses de antecedência, salvando milhares de vidas."
      },
      7: {
        title: "🏁 Módulo 7 Concluído!",
        subtitle: "Incrível! Você domina a gestão de dados em saúde. Agora vamos descobrir como a inovação tecnológica está criando novos modelos de cuidado.",
        fact: "💡 As startups de saúde digital brasileiras já receberam mais de R$ 2 bilhões em investimentos nos últimos anos."
      },
      8: {
        title: "🏁 Módulo 8 Concluído!",
        subtitle: "Extraordinário! Você entendeu a inovação em saúde digital. Agora vamos explorar como avaliar e implementar essas tecnologias no SUS.",
        fact: "💡 A avaliação de tecnologias em saúde (ATS) pode economizar até 40% dos recursos do sistema de saúde."
      },
      9: {
        title: "🏁 Módulo 9 Concluído!",
        subtitle: "Parabéns! Você completou toda a jornada da Saúde Digital! Agora você está preparado para implementar e liderar transformações digitais no SUS.",
        fact: "💡 Você agora faz parte de uma nova geração de profissionais que está transformando a saúde digital no Brasil!"
      }
    };
    return content[moduleId as keyof typeof content] || content[1];
  };

  const moduleContent = getModuleSpecificContent(completedModuleId);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-3xl">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-2xl animate-in fade-in duration-500">
          <CardContent className="p-8 text-center space-y-6">
            {/* Header com animação */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-6 h-6 text-yellow-500 animate-bounce" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-blue-800 flex items-center justify-center gap-3">
                <Star className="w-8 h-8 text-yellow-500" />
                {moduleContent.title}
                <Star className="w-8 h-8 text-yellow-500" />
              </h2>
            </div>

            {/* Conteúdo motivacional */}
            <div className="space-y-6">
              <p className="text-xl text-blue-700 leading-relaxed">
                {moduleContent.subtitle}
              </p>
              
              <div className="bg-white/80 rounded-xl p-6 border border-blue-200 shadow-lg">
                <p className="text-lg font-bold text-blue-800">
                  📊 Progresso: {completedModuleId} de 9 módulos concluídos
                </p>
              </div>
            </div>

            {/* Estatísticas de progresso */}
            <div className="grid grid-cols-2 gap-6 py-6">
              <div className="bg-white/90 rounded-xl p-6 border border-blue-200 shadow-lg">
                <div className="text-3xl font-bold text-green-600">{completedModuleId}/9</div>
                <div className="text-sm text-blue-600 font-medium">Módulos Concluídos</div>
              </div>
              <div className="bg-white/90 rounded-xl p-6 border border-blue-200 shadow-lg">
                <div className="text-3xl font-bold text-blue-600">{Math.round((completedModuleId / 9) * 100)}%</div>
                <div className="text-sm text-blue-600 font-medium">Progresso Geral</div>
              </div>
            </div>

            {/* Fatos interessantes */}
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl border border-blue-300">
              <p className="text-blue-800 font-medium italic text-lg">
                {moduleContent.fact}
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="outline" 
                onClick={handleBackToModules}
                className="flex-1 border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-700"
              >
                Voltar aos Módulos
              </Button>
              {completedModuleId < 9 && (
                <Button 
                  onClick={handleNextModule}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Continuar para o Módulo {nextModuleId}
                </Button>
              )}
              {completedModuleId === 9 && (
                <Button 
                  onClick={handleBackToModules}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Ver Certificado
                </Button>
              )}
            </div>

            {/* Dica motivacional */}
            <div className="pt-4 border-t border-blue-200">
              <p className="text-sm text-blue-600 font-medium">
                💡 <strong>Dica:</strong> Cada módulo complementa o anterior. Continue sua jornada de aprendizado!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModuleTransition; 