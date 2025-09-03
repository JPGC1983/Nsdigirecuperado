import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Users, Clock, Award, ArrowRight, FileText, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RegistrationModal from "./RegistrationModal";

interface CourseHeroProps {
  onShowCartilha?: () => void;
}

const CourseHero = ({ onShowCartilha }: CourseHeroProps) => {
  const navigate = useNavigate();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleStartCourse = () => {
    // Navegar para o primeiro módulo do curso
    navigate('/modulos/1');
  };

  const handleCadastro = () => {
    // Abrir modal de cadastro
    setShowRegistrationModal(true);
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                <Play className="w-4 h-4" />
                Curso Online
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-blue-900 leading-tight">
                Saúde Digital no{" "}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  SUS
                </span>
              </h1>
              <p className="text-xl text-blue-800 leading-relaxed font-medium">
                Interoperabilidade, RNDS e Telessaúde para profissionais da saúde, 
                gestores públicos e estudantes.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Profissionais & Estudantes</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium">15 horas</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">Nível Iniciante</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                onClick={handleCadastro}
              >
                <UserPlus className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Cadastrar
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 group border-2 border-emerald-500 hover:border-emerald-600 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 font-semibold"
                onClick={handleStartCourse}
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              {onShowCartilha && (
                <Button 
                  variant="outline"
                  size="lg" 
                  className="text-lg px-8 py-6 group border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50 text-blue-700 hover:text-blue-800 font-semibold"
                  onClick={onShowCartilha}
                >
                  <FileText className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Ver Cartilha
                </Button>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-blue-100">
              <video 
                src="/SUS_Digital_Health_Unit_Activation.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-50/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de Cadastro */}
      <RegistrationModal 
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </section>
  );
};

export default CourseHero;