import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Brain, 
  Target,
  AlertCircle,
  ArrowRight,
  RotateCcw
} from "lucide-react";
import { ModuleQuiz, QuizQuestion } from "@/data/quizData";

interface ModuleQuizProps {
  quiz: ModuleQuiz;
  onComplete: (score: number, totalQuestions: number) => void;
  onClose: () => void;
}

const ModuleQuizComponent = ({ quiz, onComplete, onClose }: ModuleQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      // Save answer
      const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
      setAnswers(newAnswers);

      // Check if correct
      if (selectedAnswer === currentQ.correctAnswer) {
        setScore(score + 1);
      }

      // Next question or finish
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowExplanation(false);
      } else {
        // Quiz completed
        const finalScore = selectedAnswer === currentQ.correctAnswer ? score + 1 : score;
        onComplete(finalScore, quiz.questions.length);
        setQuizCompleted(true);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers({});
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const getScorePercentage = () => {
    return Math.round((score / quiz.questions.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80) return "Excelente! Você domina o conteúdo!";
    if (percentage >= 60) return "Bom trabalho! Continue estudando!";
    if (percentage >= 40) return "Precisa revisar alguns conceitos.";
    return "Recomendamos revisar o módulo antes de continuar.";
  };

  const getScoreColor = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  if (quizCompleted) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-800">
            <Trophy className="w-6 h-6" />
            Quiz Concluído!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor()} mb-2`}>
              {score}/{quiz.questions.length}
            </div>
            <div className="text-lg font-semibold text-slate-700 mb-4">
              {getScorePercentage()}% de acerto
            </div>
            <p className="text-slate-600 mb-6">{getScoreMessage()}</p>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleRetry}
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
            <Button 
              onClick={onClose}
              className="flex-1"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-slate-900">{quiz.title}</CardTitle>
          <Badge variant="outline" className="text-sm">
            Questão {currentQuestion + 1} de {quiz.questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQ.correctAnswer;
              const isWrong = isSelected && !isCorrect;

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full justify-start text-left h-auto p-4 transition-all duration-200 ${
                    isSelected
                      ? isCorrect
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-red-500 bg-red-50 text-red-700"
                      : "hover:bg-slate-50"
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                >
                  <div className="flex items-center gap-3">
                    {isSelected && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                    {isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    {!isSelected && (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
                    )}
                    <span className="flex-1">{option}</span>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-800">Explicação:</span>
              </div>
              <p className="text-blue-700 text-sm">{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-slate-300"
            >
              Sair do Quiz
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              {currentQuestion < quiz.questions.length - 1 ? "Próxima Questão" : "Finalizar Quiz"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleQuizComponent; 