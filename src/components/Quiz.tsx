import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Lightbulb,
  Award,
  Star,
  Zap
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
  moduloId: number;
}

const Quiz = ({ questions, onComplete, onClose, moduloId }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [score, setScore] = useState(0);

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      // Salvar resposta
      const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
      setAnswers(newAnswers);

      // Verificar se está correto
      if (selectedAnswer === currentQ.correctAnswer) {
        setScore(score + 1);
      }

      // Próxima questão ou finalizar
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz finalizado
        const finalScore = selectedAnswer === currentQ.correctAnswer ? score + 1 : score;
        onComplete(finalScore, questions.length);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
      setShowResult(false);
    }
  };

  const isCorrect = selectedAnswer === currentQ.correctAnswer;
  const isAnswered = selectedAnswer !== null;

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "Excelente! Você domina o conteúdo!";
    if (percentage >= 70) return "Muito bom! Você tem um bom conhecimento!";
    if (percentage >= 50) return "Bom! Continue estudando para melhorar!";
    return "Continue estudando! Revisar o conteúdo pode ajudar.";
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "from-green-500 to-emerald-500";
    if (percentage >= 70) return "from-blue-500 to-green-500";
    if (percentage >= 50) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="border-b border-slate-200">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-slate-900">
              <Award className="w-6 h-6 text-slate-600" />
              Quiz do Módulo {moduloId}
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onClose}
              className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
            >
              <XCircle className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Questão {currentQuestion + 1} de {questions.length}</span>
              <span className="font-semibold text-slate-900">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Questão */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge className="bg-gradient-to-r from-slate-500 to-gray-600 text-white">
                {currentQuestion + 1}
              </Badge>
              <h3 className="text-xl font-semibold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* Opções */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                  className={`
                    w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                    ${selectedAnswer === index 
                      ? isCorrect 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-red-500 bg-red-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }
                    ${isAnswered && index === currentQ.correctAnswer ? 'border-green-500 bg-green-50' : ''}
                    ${isAnswered ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${selectedAnswer === index 
                        ? isCorrect 
                          ? 'border-green-500 bg-green-500' 
                          : 'border-red-500 bg-red-500'
                        : 'border-slate-300'
                      }
                      ${isAnswered && index === currentQ.correctAnswer ? 'border-green-500 bg-green-500' : ''}
                    `}>
                      {selectedAnswer === index && (
                        isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <XCircle className="w-4 h-4 text-white" />
                        )
                      )}
                      {isAnswered && index === currentQ.correctAnswer && selectedAnswer !== index && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-slate-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explicação */}
            {isAnswered && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-slate-900">Explicação:</span>
                </div>
                <p className="text-slate-700">{currentQ.explanation}</p>
              </div>
            )}
          </div>

          {/* Navegação */}
          <div className="flex justify-between pt-4 border-t border-slate-200">
            <Button 
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <Button 
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`
                bg-gradient-to-r ${getScoreColor(score, questions.length)} 
                hover:shadow-lg transform hover:scale-105 transition-all duration-300
              `}
            >
              {currentQuestion === questions.length - 1 ? (
                <>
                  <Award className="w-4 h-4 mr-2" />
                  Finalizar Quiz
                </>
              ) : (
                <>
                  Próxima
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz; 