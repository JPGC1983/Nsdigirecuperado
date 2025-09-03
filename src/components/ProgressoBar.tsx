import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Award, RotateCcw } from "lucide-react";
import { resetAllProgress } from "@/utils/clearProgress";

interface ProgressoBarProps {
  progresso: number;
  totalModulos: number;
  modulosConcluidos: number;
  tempoEstimado: string;
  showDetails?: boolean;
  className?: string;
}

const ProgressoBar = ({ 
  progresso, 
  totalModulos, 
  modulosConcluidos, 
  tempoEstimado,
  showDetails = true,
  className = ""
}: ProgressoBarProps) => {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-lg ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Seu Progresso</h3>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-slate-700">
              {modulosConcluidos}/{totalModulos} módulos
            </span>
          </div>
        </div>

        {/* Barra de Progresso Principal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Progresso Geral</span>
            <span className="font-semibold text-slate-900">{progresso}%</span>
          </div>
          <Progress 
            value={progresso} 
            className="h-3 bg-slate-200"
          />
        </div>

        {/* Detalhes */}
        {showDetails && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Tempo Estimado</p>
                <p className="font-semibold text-slate-900">{tempoEstimado}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Concluídos</p>
                <p className="font-semibold text-slate-900">{modulosConcluidos}</p>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem de Motivação */}
        {progresso > 0 && progresso < 100 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <p className="text-sm text-slate-700 text-center">
              {progresso < 25 && "Ótimo começo! Continue assim!"}
              {progresso >= 25 && progresso < 50 && "Você está no caminho certo!"}
              {progresso >= 50 && progresso < 75 && "Mais da metade do caminho percorrido!"}
              {progresso >= 75 && progresso < 100 && "Quase lá! Você está quase terminando!"}
            </p>
          </div>
        )}

        {/* Mensagem de Conclusão */}
        {progresso === 100 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <p className="text-sm text-slate-700 text-center font-semibold">
              🎉 Parabéns! Você completou o curso!
            </p>
          </div>
        )}

        {/* Botão para Resetar Progresso */}
        {progresso > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetAllProgress}
              className="w-full text-xs text-slate-600 hover:text-slate-800 border-slate-300 hover:border-slate-400"
            >
              <RotateCcw className="w-3 h-3 mr-2" />
              Resetar Progresso
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressoBar; 