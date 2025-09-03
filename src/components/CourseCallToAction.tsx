import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  "Conheça ferramentas como prontuário eletrônico e Meu SUS Digital",
  "Aprenda sobre Telessaúde e RNDS na prática",
  "Use dados para qualificar a gestão e o cuidado em saúde",
  "Construa uma saúde mais conectada e centrada nas pessoas"
];

const CourseCallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-background/95 backdrop-blur-sm">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Conecte-se à saúde digital e mergulhe no futuro do SUS!
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Este curso apresenta os principais conceitos da Saúde Digital e suas aplicações no SUS. 
                  Com conteúdos práticos e atualizados, este microcurso vai apoiar você na construção de uma 
                  saúde mais conectada, eficiente e centrada nas pessoas.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-left">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="bg-accent/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Duração do curso</h3>
                  <div className="text-2xl font-bold text-foreground">15 horas</div>
                </div>

                <div className="text-center">
                  <p className="text-lg text-foreground font-medium">
                    Pronto para transformar a saúde digital?
                  </p>
                </div>


              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CourseCallToAction;