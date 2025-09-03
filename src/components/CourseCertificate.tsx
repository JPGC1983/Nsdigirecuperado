import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share2, 
  Award, 
  Calendar,
  Clock,
  CheckCircle
} from "lucide-react";

interface CourseCertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  totalHours: number;
  modulesCompleted: number;
  finalScore: number;
  certificateId: string;
}

const CourseCertificate = ({ 
  studentName, 
  courseName, 
  completionDate, 
  totalHours, 
  modulesCompleted, 
  finalScore,
  certificateId 
}: CourseCertificateProps) => {
  const handleDownload = () => {
    // Implement PDF download functionality
    console.log('Downloading certificate...');
  };

  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Certificado de Conclusão',
        text: `Concluí o curso ${courseName} com sucesso!`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-12 h-12 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Certificado de Conclusão</h1>
              <p className="text-muted-foreground">Curso de Saúde Digital no SUS</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            ID: {certificateId}
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Main Content */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">Certificamos que</p>
              <h2 className="text-2xl font-bold text-foreground border-b-2 border-primary/30 pb-2">
                {studentName}
              </h2>
              <p className="text-lg text-muted-foreground">concluiu com êxito o curso</p>
              <h3 className="text-xl font-semibold text-primary">
                {courseName}
              </h3>
            </div>

            {/* Course Details */}
            <div className="grid md:grid-cols-3 gap-6 py-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Módulos Concluídos</span>
                </div>
                <p className="text-2xl font-bold">{modulesCompleted}/9</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Carga Horária</span>
                </div>
                <p className="text-2xl font-bold">{totalHours}h</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Award className="w-5 h-5" />
                  <span className="font-semibold">Pontuação Final</span>
                </div>
                <p className="text-2xl font-bold">{finalScore}%</p>
              </div>
            </div>

            {/* Completion Date */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Concluído em {completionDate}</span>
            </div>
          </div>

          {/* Course Description */}
          <div className="bg-white/50 rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-foreground">Sobre o Curso</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Este curso aborda os principais conceitos da Saúde Digital e suas aplicações no SUS, 
              incluindo prontuário eletrônico, telessaúde, RNDS, análise de dados e muito mais. 
              O participante demonstrou competência nos temas fundamentais da transformação digital em saúde.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-foreground mb-2">Tópicos Abordados:</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Saúde Digital e SUS</li>
                  <li>• Governança e Estratégia</li>
                  <li>• Telessaúde e RNDS</li>
                  <li>• Marco Legal e LGPD</li>
                  <li>• Análise de Dados em Saúde</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Competências Desenvolvidas:</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Compreensão da saúde digital</li>
                  <li>• Gestão de sistemas de informação</li>
                  <li>• Implementação de telessaúde</li>
                  <li>• Análise de dados em saúde</li>
                  <li>• Compliance e segurança</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Baixar Certificado (PDF)
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground space-y-2">
            <p>
              Este certificado é válido e pode ser verificado através do ID único: {certificateId}
            </p>
            <p>
              Emitido pelo Sistema de Educação em Saúde Digital - Ministério da Saúde
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCertificate; 