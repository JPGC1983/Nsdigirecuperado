import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, User, Mail, Phone, Building, GraduationCap, Stethoscope, CheckCircle } from "lucide-react";
import TermosUso from "./TermosUso";
import PoliticaPrivacidade from "./PoliticaPrivacidade";

interface RegistrationForm {
  nome: string;
  email: string;
  telefone: string;
  profissao: string;
  instituicao: string;
  aceitaTermos: boolean;
  aceitaNewsletter: boolean;
}

const RegistrationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState<RegistrationForm>({
    nome: "",
    email: "",
    telefone: "",
    profissao: "",
    instituicao: "",
    aceitaTermos: false,
    aceitaNewsletter: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTermosOpen, setIsTermosOpen] = useState(false);
  const [isPoliticaOpen, setIsPoliticaOpen] = useState(false);

  const handleInputChange = (field: keyof RegistrationForm, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você pode adicionar a lógica real de envio para sua API
      console.log("Dados do cadastro:", formData);
      
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          profissao: "",
          instituicao: "",
          aceitaTermos: false,
          aceitaNewsletter: false,
        });
      }, 3000);
    } catch (error) {
      console.error("Erro no cadastro:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.nome && formData.email && formData.profissao && formData.aceitaTermos;

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Cadastro Realizado!</h3>
            <p className="text-gray-600">
              Seu cadastro foi realizado com sucesso. Você receberá um email com as instruções para acessar o curso.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Cadastro no Curso
            </DialogTitle>
            <DialogDescription>
              Preencha seus dados para se inscrever no curso de Saúde Digital no SUS
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.telefone}
                onChange={(e) => handleInputChange("telefone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profissao">Profissão/Área de Atuação *</Label>
              <Select value={formData.profissao} onValueChange={(value) => handleInputChange("profissao", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua profissão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medico">Médico</SelectItem>
                  <SelectItem value="enfermeiro">Enfermeiro</SelectItem>
                  <SelectItem value="tecnico">Técnico de Enfermagem</SelectItem>
                  <SelectItem value="farmacia">Farmacêutico</SelectItem>
                  <SelectItem value="gestor">Gestor de Saúde</SelectItem>
                  <SelectItem value="estudante">Estudante</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instituicao">Instituição</Label>
              <Input
                id="instituicao"
                type="text"
                placeholder="Nome da instituição onde trabalha/estuda"
                value={formData.instituicao}
                onChange={(e) => handleInputChange("instituicao", e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="termos"
                  checked={formData.aceitaTermos}
                  onCheckedChange={(checked) => handleInputChange("aceitaTermos", checked as boolean)}
                  required
                />
                <Label htmlFor="termos" className="text-sm">
                  Aceito os <button type="button" onClick={() => setIsTermosOpen(true)} className="text-primary underline hover:text-primary/80">termos de uso</button> e 
                  <button type="button" onClick={() => setIsPoliticaOpen(true)} className="text-primary underline hover:text-primary/80"> política de privacidade</button> *
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.aceitaNewsletter}
                  onCheckedChange={(checked) => handleInputChange("aceitaNewsletter", checked as boolean)}
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Desejo receber informações sobre novos cursos e atualizações
                </Label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? "Cadastrando..." : "Confirmar Inscrição"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <TermosUso 
        isOpen={isTermosOpen}
        onClose={() => setIsTermosOpen(false)}
      />
      
      <PoliticaPrivacidade 
        isOpen={isPoliticaOpen}
        onClose={() => setIsPoliticaOpen(false)}
      />
    </>
  );
};

export default RegistrationModal; 