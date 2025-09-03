import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Clock, 
  CheckCircle, 
  BookOpen, 
  Eye,
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
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ModuloCardProps {
  id: number;
  titulo: string;
  descricao: string;
  duracao: string;
  tags: string[];
  link: string;
  corIcone: string;
  indiceModulo: number;
  progresso?: number;
  concluido?: boolean;
}

const ModuloCard = ({ 
  id, 
  titulo, 
  descricao, 
  duracao, 
  tags, 
  link, 
  corIcone, 
  indiceModulo,
  progresso = 0,
  concluido = false
}: ModuloCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Mapeamento de ícones baseado no índice do módulo
  const getIconComponent = (index: number) => {
    const iconMap = [
      BookOpen,    // Módulo 1 - Fundamentos
      Target,      // Módulo 2 - Telemedicina
      Database,    // Módulo 3 - Prontuário
      Lightbulb,   // Módulo 4 - IA
      Shield,      // Módulo 5 - Segurança
      Sparkles,    // Módulo 6 - Inovação
      BarChart3,   // Módulo 7 - Gestão de Dados
      Settings,    // Módulo 8 - Interoperabilidade
      Award        // Módulo 9 - Certificação
    ];
    return iconMap[index] || BookOpen;
  };

  const IconComponent = getIconComponent(indiceModulo);

  const handleIniciar = () => {
    // Salvar progresso atual
    const progressoAtual = JSON.parse(localStorage.getItem('progresso') || '{}');
    progressoAtual[`modulo_${id}`] = {
      progresso: 0,
      concluido: false,
      ultimoAcesso: new Date().toISOString()
    };
    localStorage.setItem('progresso', JSON.stringify(progressoAtual));
    
    // Navegar para o módulo
    navigate(`/modulos/${id}`);
  };

  const handleVerDetalhes = () => {
    navigate(`/modulos/${id}?view=preview`);
  };

  return (
    <Card 
      className={`
        relative overflow-hidden transition-all duration-300 cursor-pointer
        bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl
        transform hover:scale-105 group
        ${concluido ? 'ring-2 ring-green-200 bg-green-50/50' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay de progresso */}
      {progresso > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>
      )}

      {/* Badge de concluído */}
      {concluido && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-green-500 text-white p-1 rounded-full">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`
              w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center
              bg-gradient-to-br ${corIcone} group-hover:scale-110 transition-transform duration-300
            `}>
              <IconComponent className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-sm text-slate-600 font-medium">Módulo {id}</span>
              <CardTitle className="text-xl font-bold text-slate-900 leading-tight mt-1">
                {titulo}
              </CardTitle>
            </div>
          </div>
          
          <Badge className={`
            bg-gradient-to-r ${corIcone} text-white border-0 shadow-md
            ${concluido ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}
          `}>
            {duracao}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-sm">
          {descricao}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
              +{tags.length - 3} mais
            </Badge>
          )}
        </div>

        {/* Barra de progresso */}
        {progresso > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Progresso</span>
              <span>{progresso}%</span>
            </div>
            <Progress value={progresso} className="h-2" />
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transform hover:scale-105 transition-all duration-300 group"
            onClick={handleVerDetalhes}
          >
            <Eye className="w-4 h-4 mr-2 group-hover:animate-pulse" />
            Ver Detalhes
          </Button>
          
          <Button 
            size="sm"
            className={`
              flex-1 bg-gradient-to-r ${corIcone} hover:shadow-lg transform hover:scale-105 
              transition-all duration-300 group
              ${concluido ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}
            `}
            onClick={handleIniciar}
          >
            {concluido ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Revisar
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Iniciar
              </>
            )}
          </Button>
        </div>
      </CardContent>

      {/* Efeito de hover */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 from-slate-500/5 to-gray-600/5" />
    </Card>
  );
};

export default ModuloCard; 