import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

interface TermosUsoProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermosUso = ({ isOpen, onClose }: TermosUsoProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Termos de Uso
          </DialogTitle>
          <DialogDescription>
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-lg mb-2">1. Aceitação dos Termos</h3>
              <p className="text-muted-foreground mb-2">
                Ao acessar e utilizar o curso "Saúde Digital no SUS", você concorda em cumprir e estar vinculado a estes Termos de Uso.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">2. Descrição do Serviço</h3>
              <p className="text-muted-foreground mb-2">
                O curso oferece conteúdo educacional sobre tecnologias digitais aplicadas à saúde, incluindo interoperabilidade, RNDS e telessaúde no contexto do Sistema Único de Saúde (SUS).
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">3. Elegibilidade</h3>
              <p className="text-muted-foreground mb-2">
                O curso é destinado a profissionais da saúde, gestores públicos e estudantes interessados em saúde digital. Você deve ter pelo menos 18 anos para se inscrever.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">4. Uso Aceitável</h3>
              <p className="text-muted-foreground mb-2">
                Você concorda em utilizar o curso apenas para fins educacionais legítimos. É proibido:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                <li>Compartilhar credenciais de acesso</li>
                <li>Reproduzir ou distribuir conteúdo sem autorização</li>
                <li>Usar o curso para fins comerciais não autorizados</li>
                <li>Interferir no funcionamento da plataforma</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">5. Propriedade Intelectual</h3>
              <p className="text-muted-foreground mb-2">
                Todo o conteúdo do curso, incluindo textos, vídeos, imagens e materiais complementares, é protegido por direitos autorais e propriedade intelectual.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">6. Certificado</h3>
              <p className="text-muted-foreground mb-2">
                O certificado será emitido apenas para participantes que completarem todos os módulos e avaliações obrigatórias com aproveitamento mínimo de 70%.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">7. Limitação de Responsabilidade</h3>
              <p className="text-muted-foreground mb-2">
                O curso é fornecido "como está". Não garantimos que o conteúdo seja livre de erros ou que atenda às necessidades específicas de cada participante.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">8. Modificações</h3>
              <p className="text-muted-foreground mb-2">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas por e-mail.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">9. Contato</h3>
              <p className="text-muted-foreground mb-2">
                Para dúvidas sobre estes termos, entre em contato através do e-mail fornecido na plataforma.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermosUso; 