import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  ExternalLink, 
  BookOpen, 
  ArrowLeft,
  Eye,
  Book,
  Lightbulb,
  Target,
  Award
} from "lucide-react";

interface CartilhaViewerProps {
  onClose: () => void;
}

const CartilhaViewer = ({ onClose }: CartilhaViewerProps) => {
  const [activeSection, setActiveSection] = useState(0);

  const cartilhaSections = [
    {
      title: "Introdução à Saúde Digital",
      content: `A saúde digital representa a integração de tecnologias digitais no setor da saúde para melhorar a qualidade do cuidado, aumentar a eficiência e promover a equidade no acesso aos serviços de saúde.

Principais conceitos:
• Transformação digital na saúde pública
• Tecnologias emergentes (IA, IoT, Blockchain)
• Impacto na gestão pública e atendimento
• Redução de custos e melhoria da qualidade`,
      icon: Lightbulb
    },
    {
      title: "Estratégia de Saúde Digital 2020-2028",
      content: `A estratégia nacional estabelece diretrizes claras para modernização do SUS através de 5 pilares estratégicos:

1. INFRAESTRUTURA
• Conectividade e banda larga
• Centros de dados e nuvem
• Segurança da informação

2. APLICAÇÕES
• Sistemas de informação
• Prontuário eletrônico
• Telemedicina

3. DADOS
• Interoperabilidade
• Padrões de dados
• Analytics e IA

4. GOVERNANÇA
• Marco regulatório
• Gestão de mudança
• Capacitação

5. SEGURANÇA
• Proteção de dados
• Cibersegurança
• Compliance`,
      icon: Target
    },
    {
      title: "RNDS - Rede Nacional de Dados em Saúde",
      content: `A RNDS é a espinha dorsal da interoperabilidade em saúde no Brasil, conectando diferentes sistemas e permitindo o compartilhamento seguro de informações.

Componentes principais:
• Padrões HL7 FHIR
• Arquitetura distribuída e escalável
• Segurança e privacidade dos dados
• Protocolos de conexão e APIs

Processo de conexão:
1. Mapeamento de sistemas existentes
2. Certificação de sistemas para RNDS
3. Gestão de dados e consentimento
4. Processo de homologação`,
      icon: Award
    },
    {
      title: "Programa SUS Digital",
      content: `O Programa SUS Digital representa a estratégia do Ministério da Saúde para digitalização dos serviços de saúde através de três plataformas principais:

MEU SUS DIGITAL
• Funcionalidades para cidadãos
• Acesso a resultados de exames
• Agendamento de consultas
• Histórico de atendimentos

SUS DIGITAL PROFISSIONAL
• Prontuário eletrônico do paciente (PEP)
• Telemedicina e teleconsultoria
• Gestão de pacientes
• Prescrição eletrônica

SUS DIGITAL GESTOR
• Dashboards de gestão
• Indicadores de performance
• Gestão de recursos
• Relatórios estratégicos`,
      icon: Book
    },
    {
      title: "Telessaúde no SUS",
      content: `A telessaúde representa uma das principais inovações da saúde digital, permitindo o acesso a cuidados de saúde à distância.

Modalidades:
• Teleconsultoria e segunda opinião
• Teleinterconsulta e telecirurgia
• Teleeducação e capacitação
• Telemonitoramento de pacientes

Implementação:
• Infraestrutura tecnológica necessária
• Capacitação de profissionais de saúde
• Gestão de qualidade e protocolos
• Registro e monitoramento de procedimentos`,
      icon: Eye
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Cartilha Saúde Digital</h1>
                <p className="text-blue-100">Documento de referência oficial</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fechar
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Índice</h3>
            <div className="space-y-2">
              {cartilhaSections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      activeSection === index
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Download</h4>
              <p className="text-sm text-blue-700 mb-3">
                Baixe a cartilha completa em formato DOCX
              </p>
              <Button 
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => window.open('/Cartilha Saude Digital v2.docx', '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar Cartilha
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {cartilhaSections[activeSection] && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                     {(() => {
                       const IconComponent = cartilhaSections[activeSection].icon;
                       return <IconComponent className="w-6 h-6 text-white" />;
                     })()}
                   </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {cartilhaSections[activeSection].title}
                    </h2>
                    <Badge className="bg-blue-100 text-blue-700">
                      Seção {activeSection + 1} de {cartilhaSections.length}
                    </Badge>
                  </div>
                </div>

                <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-0">
                  <CardContent className="p-6">
                    <div className="prose prose-lg max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                        {cartilhaSections[activeSection].content}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                    disabled={activeSection === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                  <Button
                    onClick={() => setActiveSection(Math.min(cartilhaSections.length - 1, activeSection + 1))}
                    disabled={activeSection === cartilhaSections.length - 1}
                  >
                    Próximo
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartilhaViewer; 