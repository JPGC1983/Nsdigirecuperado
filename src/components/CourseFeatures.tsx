import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  FileText, 
  ClipboardCheck, 
  Award,
  Play,
  BarChart3,
  CheckCircle,
  Trophy,
  ArrowRight,
  Clock,
  Users,
  Star
} from "lucide-react";

const features = [
  {
    icon: Play,
    title: "Vídeos Explicativos",
    description: "Aprenda através de vídeos curtos e objetivos.",
    details: "",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: BarChart3,
    title: "Infográficos",
    description: "Visualize conceitos através de diagramas interativos.",
    details: "",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-50 to-emerald-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600"
  },
  {
    icon: CheckCircle,
    title: "Quiz Interativo",
    description: "Teste seus conhecimentos e consolide o aprendizado em saúde digital.",
    details: "",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: Trophy,
    title: "Certificado",
    description: "Obtenha seu certificado.",
    details: "",
    color: "from-orange-500 to-orange-600",
    bgColor: "from-orange-50 to-orange-100",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600"
  }
];

const CourseFeatures = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">

          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
            Recursos do Curso
          </h2>
          <p className="text-xl text-blue-800 max-w-3xl mx-auto font-medium leading-relaxed">
            Recursos diversos para seu aprendizado profissional em saúde digital.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-200 bg-white/90 backdrop-blur-sm overflow-hidden relative">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <CardContent className="p-8 text-center space-y-6 relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-blue-900 group-hover:text-blue-800 transition-colors">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-blue-800 text-base leading-relaxed font-medium">
                    {feature.description}
                  </p>
                  

                  
                  {/* Action Button */}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 font-semibold group-hover:shadow-md transition-all duration-300`}
                  >
                    Iniciar
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        

      </div>
    </section>
  );
};

export default CourseFeatures;