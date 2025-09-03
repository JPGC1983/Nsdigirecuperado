import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Trophy,
  Lightbulb,
  BookOpen
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface CourseQuizProps {
  moduleId: number;
  questions: QuizQuestion[];
  onComplete: (score: number, totalQuestions: number) => void;
}

const CourseQuiz = ({ moduleId, questions, onComplete }: CourseQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz completed
        const finalScore = selectedAnswer === questions[currentQuestion].correctAnswer ? score + 1 : score;
        onComplete(finalScore, questions.length);
      }
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const getProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  const getScorePercentage = () => {
    return (score / questions.length) * 100;
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80) return "Excelente! Você domina o conteúdo!";
    if (percentage >= 60) return "Bom trabalho! Continue estudando!";
    if (percentage >= 40) return "Precisa revisar alguns conceitos.";
    return "Recomendamos revisar o módulo antes de continuar.";
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="text-sm font-medium">Quiz - Módulo {moduleId}</span>
        </div>
        <h2 className="text-2xl font-bold">Teste seus Conhecimentos</h2>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>Questão {currentQuestion + 1} de {questions.length}</span>
          <span>Pontuação: {score}/{questions.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progresso</span>
          <span>{Math.round(getProgress())}%</span>
        </div>
        <Progress value={getProgress()} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  showResult && index === currentQ.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : showResult && selectedAnswer === index && index !== currentQ.correctAnswer
                    ? 'border-red-500 bg-red-50'
                    : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index ? 'border-primary bg-primary text-white' : 'border-gray-300'
                  }`}>
                    {showResult && index === currentQ.correctAnswer && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQ.correctAnswer && (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Explicação</span>
              </div>
              <p className="text-sm text-blue-700">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {!showResult && selectedAnswer !== null && (
              <Button onClick={handleShowResult} variant="outline" className="flex-1">
                Ver Resultado
              </Button>
            )}
            {showResult && (
              <Button onClick={handleNextQuestion} className="flex-1">
                {currentQuestion < questions.length - 1 ? 'Próxima Questão' : 'Finalizar Quiz'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Score Display */}
      {currentQuestion === questions.length - 1 && showResult && (
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h3 className="text-xl font-bold">Quiz Concluído!</h3>
            </div>
            <div className="text-3xl font-bold text-primary">
              {score}/{questions.length}
            </div>
            <div className="text-sm text-muted-foreground">
              {getScoreMessage()}
            </div>
            <Badge variant={getScorePercentage() >= 60 ? "default" : "secondary"}>
              {getScorePercentage()}% de acerto
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseQuiz; 