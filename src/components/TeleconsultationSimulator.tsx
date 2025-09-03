import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Phone, 
  MessageSquare, 
  FileText, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Download,
  Eye,
  Edit,
  Info,
  BookOpen,
  Lightbulb,
  Target,
  Heart,
  Activity,
  Thermometer,
  Gauge,
  Database
} from 'lucide-react';
import { exportToRNDS, validateFHIRPayload, type FHIRPayload } from '@/api/rndsExport';

interface TeleconsultationSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  symptoms: string[];
  vitalSigns: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    oxygenSaturation: number;
  };
  medicalHistory: string[];
  chiefComplaint: string;
  scenario: string;
}

interface StepData {
  completed: boolean;
  data: any;
  timestamp?: Date;
}

const PATIENT_SCENARIOS: Patient[] = [
  {
    id: "P001",
    name: "Maria Silva",
    age: 45,
    gender: "Feminino",
    symptoms: ["Dor de cabeça", "Febre", "Cansaço"],
    vitalSigns: {
      bloodPressure: "120/80",
      heartRate: 85,
      temperature: 37.8,
      oxygenSaturation: 98
    },
    medicalHistory: ["Hipertensão", "Diabetes tipo 2"],
    chiefComplaint: "Dor de cabeça intensa há 2 dias, acompanhada de febre e cansaço",
    scenario: "Paciente com quadro viral"
  },
  {
    id: "P002",
    name: "João Santos",
    age: 62,
    gender: "Masculino",
    symptoms: ["Dor no peito", "Falta de ar", "Sudorese"],
    vitalSigns: {
      bloodPressure: "150/95",
      heartRate: 110,
      temperature: 36.5,
      oxygenSaturation: 92
    },
    medicalHistory: ["Hipertensão", "Tabagismo", "Obesidade"],
    chiefComplaint: "Dor no peito que começou há 1 hora, com falta de ar e sudorese",
    scenario: "Paciente com possível síndrome coronariana"
  },
  {
    id: "P003",
    name: "Ana Costa",
    age: 28,
    gender: "Feminino",
    symptoms: ["Dor abdominal", "Náusea", "Vômitos"],
    vitalSigns: {
      bloodPressure: "110/70",
      heartRate: 95,
      temperature: 37.2,
      oxygenSaturation: 99
    },
    medicalHistory: ["Gastrite"],
    chiefComplaint: "Dor abdominal intensa há 6 horas, com náusea e vômitos",
    scenario: "Paciente com dor abdominal aguda"
  }
];

const STEP_EXPLANATIONS = {
  0: {
    title: "Identificação do Paciente",
    description: "Nesta etapa, você deve verificar os dados do paciente e confirmar sua identidade. Observe o histórico médico e a queixa principal.",
    tips: [
      "Verifique se os dados estão corretos",
      "Analise o histórico médico relevante",
      "Identifique a queixa principal",
      "Considere fatores de risco"
    ]
  },
  1: {
    title: "Anamnese",
    description: "Realize uma anamnese detalhada. Descreva os sintomas, duração, intensidade e fatores associados. Use as informações do paciente como base.",
    tips: [
      "Descreva sintomas detalhados",
      "Inclua duração e intensidade",
      "Identifique fatores desencadeantes",
      "Avalie sinais vitais"
    ]
  },
  2: {
    title: "Exame Físico Virtual",
    description: "No exame físico virtual, observe o aspecto geral do paciente através do vídeo. Avalie sinais visuais e oriente sobre autoexame quando necessário.",
    tips: [
      "Observe o aspecto geral",
      "Avalie sinais visuais",
      "Oriente sobre autoexame",
      "Documente achados"
    ]
  },
  3: {
    title: "Diagnóstico",
    description: "Com base na anamnese e exame físico, formule um diagnóstico. Seja específico e inclua diagnósticos diferenciais quando apropriado.",
    tips: [
      "Baseie-se nos achados clínicos",
      "Considere diagnósticos diferenciais",
      "Seja específico e claro",
      "Justifique sua hipótese"
    ]
  },
  4: {
    title: "Prescrição e Orientações",
    description: "Prescreva medicamentos adequados e forneça orientações claras. Inclua dosagem, frequência e duração do tratamento.",
    tips: [
      "Prescreva medicamentos adequados",
      "Inclua dosagem e frequência",
      "Forneça orientações claras",
      "Agende retorno se necessário"
    ]
  },
  5: {
    title: "Finalização",
    description: "Revise todas as informações da consulta, confirme o plano terapêutico e finalize a teleconsulta com orientações finais.",
    tips: [
      "Revise todas as informações",
      "Confirme o plano terapêutico",
      "Forneça orientações finais",
      "Agende retorno se necessário"
    ]
  }
};

const DIAGNOSIS_EXAMPLES = {
  "Paciente com quadro viral": [
    "Síndrome gripal",
    "Resfriado comum",
    "Faringite viral",
    "Cefaleia tensional"
  ],
  "Paciente com possível síndrome coronariana": [
    "Síndrome coronariana aguda",
    "Angina instável",
    "Infarto agudo do miocárdio",
    "Dor torácica atípica"
  ],
  "Paciente com dor abdominal aguda": [
    "Gastrite aguda",
    "Síndrome do intestino irritável",
    "Apendicite aguda",
    "Cólica biliar"
  ]
};

const PRESCRIPTION_EXAMPLES = {
  "Síndrome gripal": "Paracetamol 500mg - 1 comprimido a cada 6 horas por 5 dias\nIbuprofeno 400mg - 1 comprimido a cada 8 horas por 3 dias\nRepouso e hidratação abundante",
  "Síndrome coronariana aguda": "AAS 100mg - 1 comprimido ao dia\nAtorvastatina 20mg - 1 comprimido ao dia\nRepouso absoluto e retorno imediato em caso de piora",
  "Gastrite aguda": "Omeprazol 20mg - 1 comprimido em jejum por 14 dias\nDomperidona 10mg - 1 comprimido 30 min antes das refeições\nDieta leve e evitar alimentos ácidos"
};

export const TeleconsultationSimulator: React.FC<TeleconsultationSimulatorProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPatient, setCurrentPatient] = useState<Patient>(PATIENT_SCENARIOS[0]);
  const [stepData, setStepData] = useState<StepData[]>([]);
  const [consultationNotes, setConsultationNotes] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [anamnese, setAnamnese] = useState('');
  const [exameFisico, setExameFisico] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(6).fill(false));
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isExportingRNDS, setIsExportingRNDS] = useState(false);

  const steps = [
    "Identificação do Paciente",
    "Anamnese",
    "Exame Físico",
    "Diagnóstico",
    "Prescrição",
    "Finalização"
  ];

  useEffect(() => {
    if (isOpen) {
      // Reset state when opening
      setCurrentStep(0);
      setCurrentPatient(PATIENT_SCENARIOS[0]);
      setStepData([]);
      setConsultationNotes('');
      setDiagnosis('');
      setPrescription('');
      setAnamnese('');
      setExameFisico('');
      setShowSummary(false);
      setCompletedSteps(new Array(6).fill(false));
      setValidationErrors([]);
      setVideoTime(0);
      setVideoDuration(0);
      setIsVideoPlaying(false);
    }
  }, [isOpen]);

  const handleStartConsultation = () => {
    setIsConnected(true);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      markStepCompleted(currentStep);
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = (): boolean => {
    const errors: string[] = [];
    
    switch (currentStep) {
      case 1: // Anamnese
        if (!anamnese.trim()) {
          errors.push("A anamnese é obrigatória");
        }
        break;
      case 2: // Exame Físico
        if (!exameFisico.trim()) {
          errors.push("O exame físico é obrigatório");
        }
        break;
      case 3: // Diagnóstico
        if (!diagnosis.trim()) {
          errors.push("O diagnóstico é obrigatório");
        }
        break;
      case 4: // Prescrição
        if (!prescription.trim()) {
          errors.push("A prescrição é obrigatória");
        }
        break;
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const markStepCompleted = (step: number) => {
    const newCompleted = [...completedSteps];
    newCompleted[step] = true;
    setCompletedSteps(newCompleted);
  };

  const handlePatientChange = (patient: Patient) => {
    setCurrentPatient(patient);
    // Reset form data when changing patient
    setConsultationNotes('');
    setDiagnosis('');
    setPrescription('');
    setAnamnese('');
    setExameFisico('');
    setCompletedSteps(new Array(6).fill(false));
  };

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setVideoTime(video.currentTime);
  };

  const handleVideoLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setVideoDuration(video.duration);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExportToRNDS = async () => {
    setIsExportingRNDS(true);
    
    try {
      const payload: FHIRPayload = {
        resourceType: "Encounter",
        status: "finished",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          code: "AMB",
          display: "ambulatory"
        },
        subject: {
          reference: `Patient/${currentPatient.id}`,
          display: currentPatient.name
        },
        participant: [
          {
            individual: {
              reference: `Practitioner/12345678901`,
              display: "Dr. João Silva - UBS Centro"
            }
          }
        ],
        period: {
          start: new Date().toISOString(),
          end: new Date().toISOString()
        },
        reasonCode: [
          {
            text: currentPatient.chiefComplaint
          }
        ],
        diagnosis: [
          {
            condition: {
              text: diagnosis || "Diagnóstico pendente"
            }
          }
        ],
        note: [
          {
            text: `Anamnese: ${anamnese}\nExame Físico: ${exameFisico}\nPrescrição: ${prescription}\nObservações: ${consultationNotes}`
          }
        ],
        extension: [
          {
            url: "http://hl7.org/fhir/StructureDefinition/encounter-telemedicine",
            valueBoolean: true
          }
        ]
      };

      // Validar dados antes da exportação
      const validationErrors = validateFHIRPayload(payload);
      if (validationErrors.length > 0) {
        throw new Error(`Dados inválidos: ${validationErrors.join(', ')}`);
      }

      // Exportar para RNDS usando a API simulada
      const result = await exportToRNDS(payload);
      
      alert(`✅ Exportação para RNDS concluída com sucesso!\n\nID do Encontro: ${result.encounterId}\nStatus: ${result.message}\n\nOs dados da teleconsulta foram enviados para o Registro Nacional de Dados de Saúde seguindo o padrão FHIR.`);
      
    } catch (error) {
      console.error("Erro ao exportar para RNDS:", error);
      alert(`❌ Erro ao exportar para RNDS: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsExportingRNDS(false);
    }
  };

  const exportConsultation = () => {
    const consultationReport = `
RELATÓRIO DE TELECONSULTA
========================

Paciente: ${currentPatient.name}
ID: ${currentPatient.id}
Idade: ${currentPatient.age} anos
Gênero: ${currentPatient.gender}
Data: ${new Date().toLocaleDateString('pt-BR')}

QUEIXA PRINCIPAL:
${currentPatient.chiefComplaint}

HISTÓRICO MÉDICO:
${currentPatient.medicalHistory.join(', ')}

SINAIS VITAIS:
- Pressão Arterial: ${currentPatient.vitalSigns.bloodPressure}
- Frequência Cardíaca: ${currentPatient.vitalSigns.heartRate} bpm
- Temperatura: ${currentPatient.vitalSigns.temperature}°C
- Saturação O2: ${currentPatient.vitalSigns.oxygenSaturation}%

ANAMNESE:
${anamnese}

EXAME FÍSICO:
${exameFisico}

DIAGNÓSTICO:
${diagnosis}

PRESCRIÇÃO:
${prescription}

OBSERVAÇÕES:
${consultationNotes}

---
Relatório gerado pelo Simulador de Teleconsulta SUS Digital
    `;

    const blob = new Blob([consultationReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teleconsulta_${currentPatient.name}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            {/* Patient Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Escolha do Cenário
                </CardTitle>
                <CardDescription>
                  Selecione um cenário clínico para praticar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PATIENT_SCENARIOS.map((patient, index) => (
                    <Card 
                      key={patient.id}
                      className={`cursor-pointer transition-all ${
                        currentPatient.id === patient.id 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => handlePatientChange(patient)}
                    >
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <h4 className="font-semibold">{patient.name}</h4>
                          <p className="text-sm text-gray-600">{patient.age} anos</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {patient.scenario}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Dados do Paciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nome</p>
                    <p className="font-semibold">{currentPatient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Idade</p>
                    <p className="font-semibold">{currentPatient.age} anos</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gênero</p>
                    <p className="font-semibold">{currentPatient.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ID</p>
                    <p className="font-semibold">{currentPatient.id}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Queixa Principal:</p>
                  <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-sm font-medium">{currentPatient.chiefComplaint}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Histórico Médico:</p>
                  <div className="flex flex-wrap gap-1">
                    {currentPatient.medicalHistory.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Anamnese
                </CardTitle>
                <CardDescription>
                  Descreva detalhadamente a anamnese baseada nas informações do paciente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Sintomas Relatados:</p>
                    <div className="flex flex-wrap gap-2">
                      {currentPatient.symptoms.map((symptom, index) => (
                        <Badge key={index} variant="outline" className="text-red-600 border-red-200">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Sinais Vitais:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">PA:</span>
                        <span className="font-semibold">{currentPatient.vitalSigns.bloodPressure}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-gray-600">FC:</span>
                        <span className="font-semibold">{currentPatient.vitalSigns.heartRate} bpm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600">Temp:</span>
                        <span className="font-semibold">{currentPatient.vitalSigns.temperature}°C</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">SpO2:</span>
                        <span className="font-semibold">{currentPatient.vitalSigns.oxygenSaturation}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Anamnese Detalhada <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={anamnese}
                      onChange={(e) => setAnamnese(e.target.value)}
                      placeholder="Descreva a anamnese detalhada, incluindo duração dos sintomas, intensidade, fatores desencadeantes, etc..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Exemplo: Paciente relata dor de cabeça há 2 dias, de início súbito, intensidade 8/10, localizada na região frontal...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Exame Físico Virtual
                </CardTitle>
                <CardDescription>
                  Descreva os achados do exame físico observados através do vídeo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Área de Vídeo - Teleconsulta</p>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                      <video
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        poster="/placeholder.svg"
                        onTimeUpdate={handleVideoTimeUpdate}
                        onLoadedMetadata={handleVideoLoadedMetadata}
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                      >
                        <source src="/Teleconsulta_no_SUS__Simulação.mp4" type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                      
                      {/* Video Info Overlay */}
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {formatTime(videoTime)} / {formatTime(videoDuration)}
                      </div>
                      
                      {/* Play Status Indicator */}
                      {isVideoPlaying && (
                        <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          AO VIVO
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs text-gray-500">
                        Paciente: {currentPatient.name} | Estudo de Caso - Teleconsulta SUS Digital
                      </p>
                    </div>
                  </div>

                  {/* Video Study Case Information */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-800 mb-2">📹 Estudo de Caso - Teleconsulta</h4>
                          <p className="text-sm text-blue-700 mb-2">
                            Este vídeo apresenta um estudo de caso real de teleconsulta no SUS Digital. 
                            Observe atentamente a interação médico-paciente e os procedimentos realizados.
                          </p>
                          <div className="text-xs text-blue-600 space-y-1">
                            <p><strong>Objetivos do Estudo:</strong></p>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                              <li>Demonstrar o fluxo de uma teleconsulta</li>
                              <li>Mostrar técnicas de anamnese virtual</li>
                              <li>Exemplificar exame físico adaptado</li>
                              <li>Ilustrar comunicação efetiva à distância</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Aspecto Geral</p>
                      <p className="text-xs text-gray-600">Normal</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Estado Geral</p>
                      <p className="text-xs text-gray-600">Aguardando avaliação</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Exame Físico <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={exameFisico}
                      onChange={(e) => setExameFisico(e.target.value)}
                      placeholder="Descreva os achados do exame físico observados através do vídeo..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Exemplo: Paciente em bom estado geral, hidratada, sem sinais de desconforto respiratório...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Diagnóstico
                </CardTitle>
                <CardDescription>
                  Formule o diagnóstico baseado na anamnese e exame físico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">💡 Exemplos de Diagnóstico:</h4>
                    <div className="text-sm text-blue-700">
                      {DIAGNOSIS_EXAMPLES[currentPatient.scenario]?.map((example, index) => (
                        <div key={index} className="mb-1">• {example}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Diagnóstico Principal <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      placeholder="Descreva o diagnóstico principal e diagnósticos diferenciais..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Observações:</label>
                    <textarea
                      value={consultationNotes}
                      onChange={(e) => setConsultationNotes(e.target.value)}
                      placeholder="Anotações adicionais da consulta..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Prescrição e Orientações
                </CardTitle>
                <CardDescription>
                  Prescreva medicamentos e forneça orientações adequadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">💡 Exemplo de Prescrição:</h4>
                    <div className="text-sm text-green-700 whitespace-pre-line">
                      {Object.entries(PRESCRIPTION_EXAMPLES).find(([key]) => 
                        DIAGNOSIS_EXAMPLES[currentPatient.scenario]?.includes(key)
                      )?.[1] || "Consulte as referências médicas para prescrição adequada"}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Prescrição Médica <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      placeholder="Prescreva medicamentos com dosagem, frequência e duração..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={5}
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-2">Orientações Gerais:</p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Repouso adequado</li>
                      <li>• Hidratação abundante</li>
                      <li>• Retorno em caso de piora</li>
                      <li>• Seguir prescrição médica</li>
                      <li>• Evitar automedicação</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Finalização da Consulta
                </CardTitle>
                <CardDescription>
                  Revise todas as informações e finalize a teleconsulta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Consulta Finalizada</h3>
                    <p className="text-gray-600">Teleconsulta realizada com sucesso</p>
                  </div>

                  {/* RNDS Information Card */}
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Database className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-green-800 mb-2">📋 Integração com RNDS</h4>
                          <p className="text-sm text-green-700 mb-2">
                            O Registro Nacional de Dados de Saúde (RNDS) é a base nacional de dados de saúde do SUS. 
                            A exportação segue o padrão FHIR (Fast Healthcare Interoperability Resources) para garantir 
                            interoperabilidade e integração com outros sistemas de saúde.
                          </p>
                          <div className="text-xs text-green-600 space-y-1">
                            <p><strong>Dados exportados:</strong></p>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                              <li>Informações do paciente e médico</li>
                              <li>Anamnese e exame físico</li>
                              <li>Diagnóstico e prescrição</li>
                              <li>Metadados da teleconsulta</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Resumo da Consulta:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paciente:</span>
                        <span className="font-medium">{currentPatient.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duração:</span>
                        <span className="font-medium">15 minutos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className="bg-green-100 text-green-800">Concluída</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Data:</span>
                        <span className="font-medium">{new Date().toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Button 
                        onClick={exportConsultation}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Relatório
                      </Button>
                      <Button 
                        onClick={() => setShowSummary(true)}
                        variant="outline"
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Resumo
                      </Button>
                    </div>
                    
                    <Button 
                      onClick={handleExportToRNDS}
                      disabled={isExportingRNDS}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
                    >
                      {isExportingRNDS ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Exportando para RNDS...
                        </>
                      ) : (
                        <>
                          <Database className="w-4 h-4 mr-2" />
                          Exportar para RNDS (FHIR)
                        </>
                      )}
                    </Button>
                    
                    <div className="text-xs text-gray-500 text-center">
                      <p>📋 RNDS: Registro Nacional de Dados de Saúde</p>
                      <p>Os dados serão enviados no padrão FHIR para integração com o SUS Digital</p>
                    </div>
                  </div>

                  {showSummary && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle className="text-lg">Resumo Completo</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h5 className="font-medium mb-2">Anamnese:</h5>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{anamnese}</p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Exame Físico:</h5>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{exameFisico}</p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Diagnóstico:</h5>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{diagnosis}</p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Prescrição:</h5>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded whitespace-pre-line">{prescription}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">🏥 Simulador de Teleconsulta</h2>
              <p className="text-sm text-gray-600">SUS Digital - Prática de Teleconsulta</p>
            </div>
            <Button variant="outline" onClick={onClose}>
              ✕
            </Button>
          </div>

          {!isConnected ? (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Video className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Iniciar Teleconsulta</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Simule uma consulta médica virtual completa com diferentes cenários clínicos. 
                  Pratique anamnese, exame físico virtual, diagnóstico e prescrição.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg max-w-2xl mx-auto">
                <h4 className="font-medium text-blue-800 mb-2">🎯 Objetivos da Prática:</h4>
                <ul className="text-sm text-blue-700 text-left space-y-1">
                  <li>• Desenvolver habilidades em teleconsulta</li>
                  <li>• Praticar anamnese e exame físico virtual</li>
                  <li>• Exercitar raciocínio clínico</li>
                  <li>• Familiarizar-se com ferramentas digitais</li>
                </ul>
              </div>
              <Button 
                onClick={handleStartConsultation}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Phone className="w-4 h-4 mr-2" />
                Iniciar Consulta
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso da Consulta</span>
                  <span>{currentStep + 1}/{steps.length}</span>
                </div>
                <Progress value={((currentStep + 1) / steps.length) * 100} />
                <div className="flex justify-between text-xs text-gray-500">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-1">
                      {completedSteps[index] ? (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      ) : (
                        <div className={`w-3 h-3 rounded-full ${
                          index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                        }`} />
                      )}
                      <span className={index === currentStep ? 'font-medium' : ''}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Explanation */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">
                        {STEP_EXPLANATIONS[currentStep]?.title}
                      </h3>
                      <p className="text-sm text-blue-800 mb-2">
                        {STEP_EXPLANATIONS[currentStep]?.description}
                      </p>
                      <div className="text-xs text-blue-700">
                        <strong>Dicas:</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {STEP_EXPLANATIONS[currentStep]?.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-800 mb-1">Campos Obrigatórios:</h4>
                        <ul className="text-sm text-red-700 space-y-1">
                          {validationErrors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step Content */}
              {getStepContent()}

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsConnected(false);
                      setCurrentStep(0);
                      setConsultationNotes('');
                      setDiagnosis('');
                      setPrescription('');
                      setAnamnese('');
                      setExameFisico('');
                      setCompletedSteps(new Array(6).fill(false));
                      setValidationErrors([]);
                    }}
                  >
                    Cancelar
                  </Button>
                  
                  {currentStep < steps.length - 1 ? (
                    <Button 
                      onClick={handleNextStep}
                      className="flex items-center gap-2"
                    >
                      Próximo
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={onClose}
                      className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Finalizar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};