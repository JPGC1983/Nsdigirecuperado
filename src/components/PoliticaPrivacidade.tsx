import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";

interface PoliticaPrivacidadeProps {
  isOpen: boolean;
  onClose: () => void;
}

const PoliticaPrivacidade = ({ isOpen, onClose }: PoliticaPrivacidadeProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Política de Privacidade
          </DialogTitle>
          <DialogDescription>
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-lg mb-2">1. Informações Coletadas</h3>
              <p className="text-muted-foreground mb-2">
                Coletamos as seguintes informações pessoais quando você se inscreve no curso:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de telefone (opcional)</li>
                <li>Profissão/área de atuação</li>
                <li>Instituição onde trabalha/estuda (opcional)</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">2. Como Usamos Suas Informações</h3>
              <p className="text-muted-foreground mb-2">
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                <li>Processar sua inscrição no curso</li>
                <li>Enviar informações sobre o curso e materiais complementares</li>
                <li>Emitir certificado de conclusão</li>
                <li>Melhorar nossos serviços educacionais</li>
                <li>Enviar comunicações sobre novos cursos (se autorizado)</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">3. Compartilhamento de Dados</h3>
              <p className="text-muted-foreground mb-2">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                <li>Quando exigido por lei</li>
                <li>Para proteger nossos direitos legais</li>
                <li>Com prestadores de serviços que nos ajudam a operar a plataforma (sempre com proteções adequadas)</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">4. Segurança dos Dados</h3>
              <p className="text-muted-foreground mb-2">
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">5. Retenção de Dados</h3>
              <p className="text-muted-foreground mb-2">
                Mantemos suas informações pessoais pelo tempo necessário para fornecer nossos serviços e cumprir obrigações legais. Você pode solicitar a exclusão de seus dados a qualquer momento.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">6. Seus Direitos</h3>
              <p className="text-muted-foreground mb-2">
                Você tem o direito de:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir dados imprecisos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar consentimento para marketing</li>
                <li>Portabilidade de dados</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">7. Cookies e Tecnologias Similares</h3>
              <p className="text-muted-foreground mb-2">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência na plataforma, analisar o uso do site e personalizar conteúdo.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">8. Menores de Idade</h3>
              <p className="text-muted-foreground mb-2">
                Nosso curso não é destinado a menores de 18 anos. Não coletamos intencionalmente informações pessoais de menores de idade.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">9. Alterações na Política</h3>
              <p className="text-muted-foreground mb-2">
                Podemos atualizar esta política periodicamente. Alterações significativas serão comunicadas por e-mail ou através de aviso na plataforma.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">10. Contato</h3>
              <p className="text-muted-foreground mb-2">
                Para questões sobre esta política de privacidade ou para exercer seus direitos, entre em contato através do e-mail fornecido na plataforma.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PoliticaPrivacidade; 