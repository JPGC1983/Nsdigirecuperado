import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export const DevResetButton: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    localStorage.removeItem('courseProgress');
    localStorage.removeItem('courseAchievements');
    localStorage.removeItem('userLevel');
    window.location.reload();
  };

  // Só mostra em desenvolvimento
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      {/* Botão Flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="destructive"
          size="lg"
          onClick={() => setShowConfirm(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-red-600 hover:bg-red-700"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>

      {/* Modal de Confirmação */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Reset de Desenvolvimento
              </h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Isso irá zerar <strong>TODO</strong> o progresso do curso:
              <br />• Tempo de estudo
              <br />• Módulos concluídos
              <br />• Conquistas
              <br />• Nível do usuário
            </p>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleReset}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                🔄 Reset Completo
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
