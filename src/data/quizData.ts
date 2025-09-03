export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface ModuleQuiz {
  moduleId: number;
  title: string;
  questions: QuizQuestion[];
}

export const quizData: ModuleQuiz[] = [
  {
    moduleId: 1,
    title: "Quiz Módulo 1: Entendendo a Saúde Digital",
    questions: [
      {
        id: 1,
        question: "O que é Saúde Digital, segundo a OMS?",
        options: [
          "Uso de prontuários eletrônicos",
          "Consultas online",
          "Campo do conhecimento e prática com tecnologias digitais para melhorar a saúde",
          "Aplicativos de celular"
        ],
        correctAnswer: 2,
        explanation: "A OMS define Saúde Digital como o campo do conhecimento e prática com tecnologias digitais para melhorar a saúde."
      },
      {
        id: 2,
        question: "Qual das tecnologias abaixo está associada à Saúde Digital?",
        options: [
          "Fax e papel carbono",
          "Inteligência Artificial, Big Data, IoT",
          "Impressora matricial e CD-ROM",
          "Satélite e telefone fixo"
        ],
        correctAnswer: 1,
        explanation: "As tecnologias emergentes como IA, Big Data e IoT são fundamentais para a Saúde Digital."
      },
      {
        id: 3,
        question: "Qual fator impulsionou a Saúde Digital durante a pandemia?",
        options: [
          "Aumento de leitos hospitalares",
          "Distribuição de remédios",
          "Necessidade de atendimentos remotos",
          "Fechamento das UBS"
        ],
        correctAnswer: 2,
        explanation: "A pandemia acelerou a adoção da telemedicina e atendimentos remotos."
      },
      {
        id: 4,
        question: "Interoperabilidade significa:",
        options: [
          "Compartilhamento seguro e compreensível de dados entre sistemas",
          "Impressão de prontuários",
          "Troca de mensagens por e-mail",
          "Importação de planilhas do Excel"
        ],
        correctAnswer: 0,
        explanation: "Interoperabilidade é a capacidade de sistemas diferentes trocarem dados de forma segura e compreensível."
      },
      {
        id: 5,
        question: "Qual é um exemplo de aplicação prática da Saúde Digital?",
        options: [
          "Uso de drones",
          "Planejamento vacinal com dados do SISAB",
          "Impressão de cartazes",
          "Criação de grupos de WhatsApp"
        ],
        correctAnswer: 1,
        explanation: "O uso de dados do SISAB para planejamento vacinal é um excelente exemplo de Saúde Digital aplicada."
      }
    ]
  },
  {
    moduleId: 2,
    title: "Quiz Módulo 2: Telemedicina e Telessaúde",
    questions: [
      {
        id: 1,
        question: "Qual modalidade de telemedicina permite consultas à distância?",
        options: [
          "Telediagnóstico",
          "Teleconsulta",
          "Telemonitoramento",
          "Telecirurgia"
        ],
        correctAnswer: 1,
        explanation: "A teleconsulta permite que médicos e pacientes se comuniquem à distância."
      },
      {
        id: 2,
        question: "Qual resolução do CFM regulamenta a telemedicina no Brasil?",
        options: [
          "Resolução CFM nº 1.234/2020",
          "Resolução CFM nº 2.314/2022",
          "Resolução CFM nº 3.456/2021",
          "Resolução CFM nº 4.567/2023"
        ],
        correctAnswer: 1,
        explanation: "A Resolução CFM nº 2.314/2022 estabelece as diretrizes para a prática da telemedicina."
      },
      {
        id: 3,
        question: "O que é o Telecardio?",
        options: [
          "Um aplicativo de celular",
          "Sistema de interpretação de eletrocardiogramas à distância",
          "Um tipo de consulta presencial",
          "Um software de prontuário"
        ],
        correctAnswer: 1,
        explanation: "O Telecardio permite que cardiologistas interpretem ECGs realizados em unidades remotas."
      },
      {
        id: 4,
        question: "Qual programa nacional coordena as ações de telemedicina no SUS?",
        options: [
          "Programa Nacional de Imunização",
          "Programa Nacional de Telessaúde (PNT)",
          "Programa Nacional de Atenção Básica",
          "Programa Nacional de Saúde Mental"
        ],
        correctAnswer: 1,
        explanation: "O PNT coordena as ações de telemedicina no Sistema Único de Saúde."
      },
      {
        id: 5,
        question: "A telemedicina substitui completamente o atendimento presencial?",
        options: [
          "Sim, sempre",
          "Não, ela complementa o atendimento presencial",
          "Depende do tipo de especialidade",
          "Apenas em casos de emergência"
        ],
        correctAnswer: 1,
        explanation: "A telemedicina complementa o atendimento presencial, não o substitui completamente."
      }
    ]
  },
  {
    moduleId: 3,
    title: "Quiz Módulo 3: Prontuário Eletrônico",
    questions: [
      {
        id: 1,
        question: "O que significa PEP?",
        options: [
          "Prontuário Eletrônico do Paciente",
          "Programa de Educação Permanente",
          "Protocolo de Emergência Primária",
          "Plano de Estratégia Pública"
        ],
        correctAnswer: 0,
        explanation: "PEP significa Prontuário Eletrônico do Paciente."
      },
      {
        id: 2,
        question: "Qual lei regulamenta a proteção de dados no PEP?",
        options: [
          "Lei de Diretrizes e Bases",
          "Lei Geral de Proteção de Dados (LGPD)",
          "Lei Orgânica da Saúde",
          "Lei de Responsabilidade Fiscal"
        ],
        correctAnswer: 1,
        explanation: "A LGPD estabelece as diretrizes para proteção de dados pessoais, incluindo dados de saúde."
      },
      {
        id: 3,
        question: "O que é a RNDS?",
        options: [
          "Rede Nacional de Dados em Saúde",
          "Rede Nacional de Diagnóstico Social",
          "Rede Nacional de Desenvolvimento Sustentável",
          "Rede Nacional de Direitos Sociais"
        ],
        correctAnswer: 0,
        explanation: "RNDS é a Rede Nacional de Dados em Saúde, que permite troca de informações entre sistemas."
      },
      {
        id: 4,
        question: "Qual padrão internacional é usado pela RNDS?",
        options: [
          "HTML e CSS",
          "HL7 FHIR",
          "XML e JSON",
          "SQL e MySQL"
        ],
        correctAnswer: 1,
        explanation: "A RNDS utiliza o padrão HL7 FHIR para garantir interoperabilidade."
      },
      {
        id: 5,
        question: "Qual princípio de segurança garante que cada profissional tenha acesso apenas às informações necessárias?",
        options: [
          "Princípio da transparência",
          "Princípio do menor privilégio",
          "Princípio da responsabilidade",
          "Princípio da confidencialidade"
        ],
        correctAnswer: 1,
        explanation: "O princípio do menor privilégio garante acesso apenas às informações necessárias para a função."
      }
    ]
  },
  {
    moduleId: 4,
    title: "Quiz Módulo 4: Inteligência Artificial na Saúde",
    questions: [
      {
        id: 1,
        question: "Qual é a principal aplicação da IA na saúde atualmente?",
        options: [
          "Substituir médicos completamente",
          "Diagnóstico por imagem assistido por computador",
          "Automatizar cirurgias",
          "Gerenciar estoques de medicamentos"
        ],
        correctAnswer: 1,
        explanation: "O diagnóstico por imagem assistido por computador é uma das principais aplicações da IA na saúde."
      },
      {
        id: 2,
        question: "O que significa 'machine learning' no contexto da saúde?",
        options: [
          "Aprendizado de máquina que melhora com dados",
          "Uso de robôs em cirurgias",
          "Sistemas de telemedicina",
          "Prontuários eletrônicos"
        ],
        correctAnswer: 0,
        explanation: "Machine learning é um tipo de IA que melhora sua performance com base nos dados fornecidos."
      },
      {
        id: 3,
        question: "Qual é um exemplo de IA aplicada na predição de riscos?",
        options: [
          "Interpretação de raio-X",
          "Predição de readmissão hospitalar",
          "Agendamento de consultas",
          "Controle de estoque"
        ],
        correctAnswer: 1,
        explanation: "A predição de readmissão hospitalar é um exemplo importante de IA aplicada na saúde."
      },
      {
        id: 4,
        question: "Qual é um desafio ético da IA na saúde?",
        options: [
          "Custo dos equipamentos",
          "Viés algorítmico e transparência",
          "Velocidade de processamento",
          "Compatibilidade de sistemas"
        ],
        correctAnswer: 1,
        explanation: "O viés algorítmico e a falta de transparência são desafios éticos importantes da IA na saúde."
      },
      {
        id: 5,
        question: "O que é 'explicabilidade' em IA para saúde?",
        options: [
          "Velocidade do algoritmo",
          "Capacidade de explicar como a IA chegou a uma decisão",
          "Custo do sistema",
          "Facilidade de uso"
        ],
        correctAnswer: 1,
        explanation: "A explicabilidade é crucial para que médicos e pacientes confiem nas decisões da IA."
      }
    ]
  },
  {
    moduleId: 5,
    title: "Quiz Módulo 5: Segurança e Privacidade",
    questions: [
      {
        id: 1,
        question: "Qual lei regulamenta a proteção de dados pessoais no Brasil?",
        options: [
          "Lei de Diretrizes e Bases",
          "Lei Geral de Proteção de Dados (LGPD)",
          "Lei Orgânica da Saúde",
          "Lei de Responsabilidade Fiscal"
        ],
        correctAnswer: 1,
        explanation: "A LGPD estabelece as diretrizes para proteção de dados pessoais, incluindo dados de saúde."
      },
      {
        id: 2,
        question: "O que são dados sensíveis na LGPD?",
        options: [
          "Apenas dados financeiros",
          "Dados sobre origem racial, saúde, vida sexual, entre outros",
          "Apenas dados de identificação",
          "Dados de localização"
        ],
        correctAnswer: 1,
        explanation: "Dados sensíveis incluem informações sobre origem racial, saúde, vida sexual, entre outros."
      },
      {
        id: 3,
        question: "Qual princípio da LGPD garante que o tratamento seja limitado ao mínimo necessário?",
        options: [
          "Princípio da finalidade",
          "Princípio da minimização",
          "Princípio da transparência",
          "Princípio da responsabilização"
        ],
        correctAnswer: 1,
        explanation: "O princípio da minimização garante que apenas dados necessários sejam coletados."
      },
      {
        id: 4,
        question: "O que é criptografia de dados?",
        options: [
          "Backup automático",
          "Conversão de dados em código ilegível",
          "Compressão de arquivos",
          "Organização de pastas"
        ],
        correctAnswer: 1,
        explanation: "Criptografia converte dados em código ilegível para proteger informações sensíveis."
      },
      {
        id: 5,
        question: "Qual é uma boa prática de segurança em saúde digital?",
        options: [
          "Compartilhar senhas com colegas",
          "Usar autenticação de dois fatores",
          "Salvar dados em pen drives",
          "Usar Wi-Fi público"
        ],
        correctAnswer: 1,
        explanation: "A autenticação de dois fatores é uma excelente prática de segurança."
      }
    ]
  },
  {
    moduleId: 6,
    title: "Quiz Módulo 6: Inovação em Saúde",
    questions: [
      {
        id: 1,
        question: "O que são healthtechs?",
        options: [
          "Apenas hospitais digitais",
          "Startups que desenvolvem soluções tecnológicas para saúde",
          "Aplicativos de fitness",
          "Equipamentos médicos"
        ],
        correctAnswer: 1,
        explanation: "Healthtechs são startups que desenvolvem soluções tecnológicas inovadoras para saúde."
      },
      {
        id: 2,
        question: "Qual é uma tendência emergente em saúde digital?",
        options: [
          "Uso de prontuários em papel",
          "Medicina de precisão e personalização",
          "Consultas apenas presenciais",
          "Sistemas isolados"
        ],
        correctAnswer: 1,
        explanation: "A medicina de precisão e personalização é uma tendência importante em saúde digital."
      },
      {
        id: 3,
        question: "O que é 'open innovation' em saúde?",
        options: [
          "Software gratuito",
          "Colaboração entre diferentes organizações para inovação",
          "Apenas pesquisa acadêmica",
          "Patentes abertas"
        ],
        correctAnswer: 1,
        explanation: "Open innovation envolve colaboração entre diferentes organizações para desenvolver soluções."
      },
      {
        id: 4,
        question: "Qual é um exemplo de inovação em saúde pública?",
        options: [
          "Apenas equipamentos caros",
          "Sistemas de vigilância epidemiológica digital",
          "Consultas particulares",
          "Medicamentos importados"
        ],
        correctAnswer: 1,
        explanation: "Sistemas de vigilância epidemiológica digital são exemplos de inovação em saúde pública."
      },
      {
        id: 5,
        question: "O que é 'design thinking' aplicado à saúde?",
        options: [
          "Apenas design de interfaces",
          "Metodologia centrada no usuário para resolver problemas",
          "Arquitetura de hospitais",
          "Design de equipamentos"
        ],
        correctAnswer: 1,
        explanation: "Design thinking é uma metodologia centrada no usuário para resolver problemas complexos."
      }
    ]
  },
  {
    moduleId: 7,
    title: "Quiz Módulo 7: Gestão de Dados",
    questions: [
      {
        id: 1,
        question: "O que é Big Data na saúde?",
        options: [
          "Apenas dados de prontuários",
          "Grandes volumes de dados estruturados e não estruturados",
          "Dados de laboratório",
          "Informações de consultas"
        ],
        correctAnswer: 1,
        explanation: "Big Data na saúde inclui grandes volumes de dados estruturados e não estruturados."
      },
      {
        id: 2,
        question: "Qual é um exemplo de analytics em saúde?",
        options: [
          "Apenas relatórios simples",
          "Predição de surtos epidemiológicos",
          "Contagem de pacientes",
          "Lista de medicamentos"
        ],
        correctAnswer: 1,
        explanation: "A predição de surtos epidemiológicos é um exemplo avançado de analytics em saúde."
      },
      {
        id: 3,
        question: "O que são dashboards em saúde?",
        options: [
          "Apenas gráficos",
          "Interfaces visuais para monitoramento de indicadores",
          "Relatórios em PDF",
          "Planilhas do Excel"
        ],
        correctAnswer: 1,
        explanation: "Dashboards são interfaces visuais para monitoramento de indicadores em tempo real."
      },
      {
        id: 4,
        question: "Qual é um desafio do Big Data em saúde?",
        options: [
          "Apenas custo",
          "Qualidade dos dados e interoperabilidade",
          "Velocidade da internet",
          "Tamanho dos arquivos"
        ],
        correctAnswer: 1,
        explanation: "A qualidade dos dados e interoperabilidade são desafios importantes do Big Data em saúde."
      },
      {
        id: 5,
        question: "O que é 'data governance' em saúde?",
        options: [
          "Apenas backup de dados",
          "Conjunto de políticas para gestão de dados",
          "Compressão de arquivos",
          "Migração de sistemas"
        ],
        correctAnswer: 1,
        explanation: "Data governance é o conjunto de políticas e processos para gestão adequada de dados."
      }
    ]
  },
  {
    moduleId: 8,
    title: "Quiz Módulo 8: Interoperabilidade",
    questions: [
      {
        id: 1,
        question: "O que é interoperabilidade em saúde?",
        options: [
          "Apenas troca de e-mails",
          "Capacidade de sistemas trocarem dados de forma compreensível",
          "Uso de sistemas isolados",
          "Backup de dados"
        ],
        correctAnswer: 1,
        explanation: "Interoperabilidade é a capacidade de sistemas diferentes trocarem dados de forma compreensível."
      },
      {
        id: 2,
        question: "Qual padrão internacional é usado para interoperabilidade?",
        options: [
          "HTML e CSS",
          "HL7 FHIR",
          "XML e JSON",
          "SQL e MySQL"
        ],
        correctAnswer: 1,
        explanation: "HL7 FHIR é o padrão internacional mais usado para interoperabilidade em saúde."
      },
      {
        id: 3,
        question: "O que significa FHIR?",
        options: [
          "Fast Health Information Resources",
          "Fast Healthcare Interoperability Resources",
          "Federal Health Information Registry",
          "Fast Health Integration Rules"
        ],
        correctAnswer: 1,
        explanation: "FHIR significa Fast Healthcare Interoperability Resources."
      },
      {
        id: 4,
        question: "Qual é um nível de interoperabilidade?",
        options: [
          "Apenas técnico",
          "Técnico, semântico e organizacional",
          "Apenas semântico",
          "Apenas organizacional"
        ],
        correctAnswer: 1,
        explanation: "Os níveis de interoperabilidade incluem técnico, semântico e organizacional."
      },
      {
        id: 5,
        question: "O que é IHE?",
        options: [
          "International Health Exchange",
          "Integrating the Healthcare Enterprise",
          "International Healthcare Equipment",
          "Internet Health Exchange"
        ],
        correctAnswer: 1,
        explanation: "IHE significa Integrating the Healthcare Enterprise, uma iniciativa para interoperabilidade."
      }
    ]
  },
  {
    moduleId: 9,
    title: "Quiz Módulo 9: Certificação e Conformidade",
    questions: [
      {
        id: 1,
        question: "O que é certificação em saúde digital?",
        options: [
          "Apenas documentação",
          "Processo de avaliação que atesta conformidade com padrões",
          "Registro de software",
          "Teste de equipamentos"
        ],
        correctAnswer: 1,
        explanation: "Certificação é o processo de avaliação que atesta conformidade com padrões estabelecidos."
      },
      {
        id: 2,
        question: "Qual órgão regulamenta equipamentos médicos no Brasil?",
        options: [
          "Ministério da Saúde",
          "ANVISA",
          "CFM",
          "CONEP"
        ],
        correctAnswer: 1,
        explanation: "A ANVISA é responsável pela regulamentação de equipamentos médicos no Brasil."
      },
      {
        id: 3,
        question: "O que é auditoria em saúde digital?",
        options: [
          "Apenas verificação de documentos",
          "Avaliação sistemática de conformidade e qualidade",
          "Inspeção de equipamentos",
          "Teste de software"
        ],
        correctAnswer: 1,
        explanation: "Auditoria é a avaliação sistemática de conformidade e qualidade dos sistemas."
      },
      {
        id: 4,
        question: "Qual norma técnica é importante para saúde digital?",
        options: [
          "Apenas normas internacionais",
          "Normas ABNT, ISO e regulamentações específicas",
          "Apenas normas ISO",
          "Apenas normas ABNT"
        ],
        correctAnswer: 1,
        explanation: "Normas ABNT, ISO e regulamentações específicas são importantes para saúde digital."
      },
      {
        id: 5,
        question: "O que é conformidade regulatória?",
        options: [
          "Apenas seguir leis",
          "Adequação às normas e regulamentações aplicáveis",
          "Registro de patentes",
          "Certificação de qualidade"
        ],
        correctAnswer: 1,
        explanation: "Conformidade regulatória é a adequação às normas e regulamentações aplicáveis."
      }
    ]
  }
];

export const getQuizByModuleId = (moduleId: number): ModuleQuiz | undefined => {
  return quizData.find(quiz => quiz.moduleId === moduleId);
};

export const getAllQuizzes = (): ModuleQuiz[] => {
  return quizData;
}; 