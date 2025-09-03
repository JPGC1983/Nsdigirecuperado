import { Separator } from "@/components/ui/separator";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const CourseFooter = () => {
  return (
    <footer className="bg-gradient-to-b from-muted/20 to-muted/40 border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Sobre o Curso */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground">
              Saúde Digital no SUS
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Explore interoperabilidade, RNDS e telessaúde neste curso prático 
              para profissionais da saúde, gestores públicos e estudantes. 
              <span className="font-semibold text-primary"> Conecte-se ao futuro do SUS!</span>
            </p>
          </div>

          {/* Desenvolvido por */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground">
              Desenvolvido por
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                <span className="text-sm font-medium text-muted-foreground">NÚCLEO DE SAÚDE DIGITAL – SES/GAB/ATI-NSDIGI</span>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-medium">saudedigital@saude.mg.gov.br</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-medium">Belo Horizonte, Minas Gerais</span>
                </div>
              </div>
            </div>
          </div>

          {/* Links Úteis */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground">
              Links Úteis
            </h3>
            <div className="space-y-3">
              <a 
                href="https://datasus.saude.gov.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-background/50 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 font-medium"
              >
                DATASUS
              </a>
              <a 
                href="https://meususdigital.saude.gov.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-background/50 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 font-medium"
              >
                MEUSUS
              </a>
              <a 
                href="https://saude.gov.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-background/50 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 font-medium"
              >
                Ministério da Saúde
              </a>
              <a 
                href="https://rnds.saude.gov.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-background/50 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 font-medium"
              >
                RNDS
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Logos Section */}
        <div className="py-12">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-muted-foreground mb-2">
              Parceiros Institucionais
            </h4>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* Container único com os três logos */}
            <div className="flex flex-col items-center space-y-3 group">
              <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                {/* SES Logo */}
                <div className="flex flex-col items-center">
                  <img 
                    src="/logo ses 1.png" 
                    alt="SES - Secretaria de Estado de Saúde" 
                    className="h-16 w-auto object-contain"
                  />
                </div>

                {/* Minas Gerais */}
                <div className="flex flex-col items-center">
                  <img 
                    src="/cb7d09a1-97df-4fe9-a523-bbeaa64f526e.jpg" 
                    alt="Minas Gerais" 
                    className="h-16 w-auto object-contain"
                  />
                </div>

                {/* Ministério da Saúde */}
                <div className="flex flex-col items-center">
                  <img 
                    src="/sus-digital-ministerio-1.png" 
                    alt="Ministério da Saúde" 
                    className="h-16 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="text-center py-6">
          <span className="text-sm text-muted-foreground">
            © 2025 Núcleo de Saúde Digital – SES/GAB/ATI-NSDIGI
          </span>
        </div>
      </div>
    </footer>
  );
};

export default CourseFooter;