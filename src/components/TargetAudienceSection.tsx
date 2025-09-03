import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Users, 
  GraduationCap, 
  Sparkles, 
  Star,
  CheckCircle,
  Target,
  Lightbulb,
  TrendingUp
} from "lucide-react";

const audiences = [
  {
    icon: Stethoscope,
    title: "Profissionais da Saúde",
    subtitle: "Médicos, Enfermeiros, Técnicos",
    description: "Profissionais que desejam se atualizar sobre tecnologias digitais aplicadas à saúde",
    benefits: [
      "Melhore a qualidade do atendimento",
      "Otimize processos clínicos",
      "Integre sistemas de saúde"
    ]
  },
  {
    icon: Users,
    title: "Gestores Públicos",
    subtitle: "Administradores, Coordenadores",
    description: "Gestores interessados em implementar soluções digitais no SUS",
    benefits: [
      "Tome decisões baseadas em dados",
      "Implemente políticas digitais",
      "Gerencie recursos eficientemente"
    ]
  },
  {
    icon: GraduationCap,
    title: "Estudantes",
    subtitle: "Estudantes em Geral",
    description: "Estudantes interessados em saúde digital e transformação tecnológica",
    benefits: [
      "Prepare-se para o mercado",
      "Desenvolva competências digitais",
      "Entenda o futuro da saúde"
    ]
  }
];

interface TargetAudienceSectionProps {
  variant?: 'compact' | 'detailed';
  className?: string;
}

const TargetAudienceSection = ({ variant = 'detailed', className = '' }: TargetAudienceSectionProps) => {
  if (variant === 'compact') {
    return (
      <Card className={`bg-gradient-to-br from-blue-50 to-slate-100 border-0 shadow-lg ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-900">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            Público-Alvo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {audiences.map((audience, index) => {
              const IconComponent = audience.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/80 rounded-lg hover:bg-white/90 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">{audience.title}</h4>
                    <p className="text-xs text-slate-600 truncate">{audience.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-gradient-to-br from-blue-50 to-slate-100 border-0 shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-900">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          Para Quem é Este Conteúdo?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <div 
                key={index} 
                className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:bg-white/90 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{audience.title}</h4>
                    <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                      {audience.subtitle}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {audience.description}
                </p>

                <div className="space-y-2">
                  <h5 className="font-semibold text-blue-700 text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Benefícios:
                  </h5>
                  <div className="space-y-2">
                    {audience.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetAudienceSection; 