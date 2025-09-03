import { useState } from "react";
import CourseHero from "@/components/CourseHero";
import CourseModules from "@/components/CourseModules";
import CourseFeatures from "@/components/CourseFeatures";
import CourseCallToAction from "@/components/CourseCallToAction";
import CourseEpilogue from "@/components/CourseEpilogue";
import CourseFooter from "@/components/CourseFooter";
import CartilhaViewer from "@/components/CartilhaViewer";

const Index = () => {
  const [showCartilha, setShowCartilha] = useState(false);

  return (
    <div className="min-h-screen">
      <CourseHero onShowCartilha={() => setShowCartilha(true)} />
      <CourseCallToAction />
      <CourseEpilogue />
      <CourseModules onShowCartilha={() => setShowCartilha(true)} />
      <CourseFeatures />
      
      {/* Seção de Benefícios do SUS Digital */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🏥 Por que o SUS Digital é Importante?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A transformação digital do SUS representa um marco na saúde pública brasileira, 
              oferecendo ferramentas modernas para melhorar o atendimento à população.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">📱 Benefícios para os Profissionais</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Acesso rápido ao prontuário do paciente</li>
                <li>• Comunicação eficiente entre equipes</li>
                <li>• Redução de papelada e burocracia</li>
                <li>• Integração de dados em tempo real</li>
                <li>• Ferramentas de apoio à decisão clínica</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">👥 Benefícios para os Cidadãos</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Agendamento online de consultas</li>
                <li>• Acesso ao histórico médico</li>
                <li>• Teleconsultas e atendimento remoto</li>
                <li>• Menor tempo de espera</li>
                <li>• Maior qualidade no atendimento</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🎯 Objetivo do Curso
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Capacitar profissionais de saúde para utilizar as ferramentas do SUS Digital, 
                garantindo um atendimento mais eficiente e humanizado para todos os brasileiros.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/modulos" 
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  📚 Iniciar Curso
                </a>
                <button 
                  onClick={() => onShowCartilha && onShowCartilha()}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📖 Baixar Cartilha
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CourseFooter />
      
      {showCartilha && (
        <CartilhaViewer onClose={() => setShowCartilha(false)} />
      )}
    </div>
  );
};

export default Index;
