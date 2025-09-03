export interface ModuleContent {
  id: number;
  title: string;
  duration: string;
  description: string;
  topics: string[];
  detailedContent: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      keyPoints: string[];
    }[];
    practicalExamples: string[];
    activities: string[];
    resources: string[];
  };
  icon: string;
}

export const courseModulesContent: ModuleContent[] = [
  {
    id: 1,
    title: "Módulo 1: Entendendo a Saúde Digital",
    duration: "2h",
    description: "Conceitos fundamentais da saúde digital, aplicações práticas e sua importância para municípios. Inclui exemplos reais como a jornada da Dona Marta e planejamento estratégico de vacinação.",
    topics: ["O que é saúde digital", "Aplicações práticas", "Exemplos reais", "Jornada do paciente", "Planejamento estratégico"],
    detailedContent: {
      introduction: "Neste módulo, você será introduzido aos conceitos fundamentais da saúde digital e sua aplicação no contexto do SUS.",
      sections: [
        {
          title: "Definição e Conceitos",
          content: "A saúde digital representa a integração de tecnologias digitais no setor da saúde para melhorar a qualidade do cuidado, aumentar a eficiência e promover a equidade no acesso aos serviços de saúde. Esta transformação inclui desde prontuários eletrônicos até inteligência artificial aplicada ao diagnóstico.",
          keyPoints: [
            "Transformação digital na saúde pública",
            "Tecnologias emergentes (IA, IoT, Blockchain)",
            "Impacto na gestão pública e atendimento",
            "Redução de custos e melhoria da qualidade"
          ]
        },
        {
          title: "Aplicações Práticas",
          content: "Exploraremos casos reais de implementação da saúde digital, incluindo a jornada da Dona Marta e outros exemplos práticos. Veremos como a tecnologia pode transformar o atendimento em saúde pública.",
          keyPoints: [
            "Prontuário eletrônico do paciente (PEP)",
            "Telemedicina e teleconsultoria",
            "Sistemas de informação em saúde",
            "Aplicativos móveis para saúde"
          ]
        },
        {
          title: "Benefícios e Impactos",
          content: "A implementação da saúde digital traz benefícios significativos para gestores, profissionais e pacientes. Vamos analisar os impactos positivos e como medir o sucesso das iniciativas.",
          keyPoints: [
            "Redução de custos operacionais",
            "Melhoria na qualidade do atendimento",
            "Acesso mais equitativo aos serviços",
            "Dados para tomada de decisão"
          ]
        }
      ],
      practicalExamples: [
        "Jornada da Dona Marta - exemplo completo de atendimento integrado",
        "Planejamento estratégico de vacinação com dados digitais",
        "Gestão de estoques de medicamentos com IoT",
        "Monitoramento remoto de pacientes crônicos",
        "Sistema de alerta para epidemias"
      ],
      activities: [
        "Análise de casos práticos de saúde digital",
        "Identificação de oportunidades de digitalização no SUS",
        "Mapeamento de fluxos de atendimento digital",
        "Simulação de prontuário eletrônico",
        "Desenvolvimento de indicadores de qualidade"
      ],
      resources: [
        "Documentos de referência do Ministério da Saúde",
        "Guias de implementação de saúde digital",
        "Ferramentas de avaliação de maturidade digital",
        "Cartilha de boas práticas em saúde digital",
        "Vídeos demonstrativos de casos de sucesso"
      ]
    },
    icon: "Brain"
  },
  {
    id: 2,
    title: "Módulo 2: Governança e Estratégia de Saúde Digital",
    duration: "2h",
    description: "Estratégia de saúde digital para o Brasil 2020-2028, políticas públicas, governança e marco regulatório para transformação digital no SUS.",
    topics: ["Estratégia nacional", "Políticas públicas", "Governança", "Marco regulatório", "Transformação digital"],
    detailedContent: {
      introduction: "Este módulo aborda a estratégia nacional de saúde digital e os marcos regulatórios que orientam a transformação digital no SUS.",
      sections: [
        {
          title: "Estratégia de Saúde Digital 2020-2028",
          content: "Análise detalhada da estratégia nacional e seus pilares fundamentais para a transformação digital da saúde no Brasil. A estratégia estabelece diretrizes claras para modernização do SUS.",
          keyPoints: [
            "5 Pilares estratégicos (Infraestrutura, Aplicações, Dados, Governança, Segurança)",
            "Objetivos específicos por eixo temático",
            "Indicadores de sucesso e monitoramento",
            "Cronograma de implementação"
          ]
        },
        {
          title: "Marco Regulatório",
          content: "Exploração das leis, decretos e regulamentações que fundamentam a saúde digital no Brasil. Entendimento das obrigações legais e responsabilidades.",
          keyPoints: [
            "LGPD na saúde e tratamento de dados",
            "Regulamentações específicas do CFM",
            "Compliance e segurança da informação",
            "Responsabilidades dos gestores"
          ]
        },
        {
          title: "Governança e Liderança",
          content: "Estruturas de governança necessárias para implementação da saúde digital. Papéis e responsabilidades dos diferentes atores.",
          keyPoints: [
            "Estrutura de governança municipal",
            "Papéis de liderança e coordenação",
            "Gestão de mudança organizacional",
            "Monitoramento e avaliação"
          ]
        }
      ],
      practicalExamples: [
        "Implementação da estratégia em municípios de diferentes portes",
        "Casos de sucesso de governança em saúde digital",
        "Gestão de dados em saúde com compliance",
        "Estruturação de comitês de saúde digital",
        "Planejamento estratégico municipal"
      ],
      activities: [
        "Análise de políticas públicas de saúde digital",
        "Mapeamento de stakeholders e responsabilidades",
        "Desenvolvimento de planos de ação municipais",
        "Criação de estrutura de governança",
        "Elaboração de indicadores de monitoramento"
      ],
      resources: [
        "Estratégia de Saúde Digital 2020-2028 (documento completo)",
        "Marco legal da saúde digital e regulamentações",
        "Guias de implementação de governança",
        "Modelos de estrutura organizacional",
        "Ferramentas de planejamento estratégico"
      ]
    },
    icon: "Settings"
  },
  {
    id: 3,
    title: "Módulo 3: Telessaúde no SUS",
    duration: "2h",
    description: "Teleconsultoria no Estado de Minas Gerais, registro de procedimentos nos sistemas de informação e implementação prática da telessaúde.",
    topics: ["Teleconsultoria", "Registro de procedimentos", "Sistemas de informação", "Implementação prática", "Casos de uso"],
    detailedContent: {
      introduction: "A telessaúde representa uma das principais inovações da saúde digital, permitindo o acesso a cuidados de saúde à distância.",
      sections: [
        {
          title: "Fundamentos da Telessaúde",
          content: "Conceitos básicos, modalidades e aplicações da telessaúde no contexto do SUS. Entendimento das diferentes formas de atendimento remoto.",
          keyPoints: [
            "Teleconsultoria e segunda opinião",
            "Teleinterconsulta e telecirurgia",
            "Teleeducação e capacitação",
            "Telemonitoramento de pacientes"
          ]
        },
        {
          title: "Implementação Prática",
          content: "Passos para implementação da telessaúde, incluindo aspectos técnicos e operacionais. Foco na experiência de Minas Gerais.",
          keyPoints: [
            "Infraestrutura tecnológica necessária",
            "Capacitação de profissionais de saúde",
            "Gestão de qualidade e protocolos",
            "Registro e monitoramento de procedimentos"
          ]
        },
        {
          title: "Regulamentação e Compliance",
          content: "Aspectos regulatórios da telessaúde, incluindo resoluções do CFM e portarias do Ministério da Saúde.",
          keyPoints: [
            "Resoluções do CFM sobre telessaúde",
            "Portarias do Ministério da Saúde",
            "Aspectos éticos e legais",
            "Proteção de dados em telemedicina"
          ]
        }
      ],
      practicalExamples: [
        "Teleconsultoria em Minas Gerais - casos reais",
        "Registro de procedimentos no sistema",
        "Integração com sistemas existentes",
        "Telemonitoramento de pacientes crônicos",
        "Teleeducação para profissionais da APS"
      ],
      activities: [
        "Simulação de teleconsultoria com casos reais",
        "Análise de fluxos de atendimento remoto",
        "Planejamento de implementação de telessaúde",
        "Desenvolvimento de protocolos de telemedicina",
        "Avaliação de infraestrutura necessária"
      ],
      resources: [
        "Protocolos de telessaúde do Ministério da Saúde",
        "Ferramentas de teleconsultoria e plataformas",
        "Guias de implementação de telessaúde",
        "Resoluções do CFM sobre telemedicina",
        "Casos de sucesso de Minas Gerais"
      ]
    },
    icon: "Camera"
  },
  {
    id: 4,
    title: "Módulo 4: Leis e Regulamentações",
    duration: "1h",
    description: "Marco legal da saúde digital, LGPD, regulamentações específicas para telessaúde e proteção de dados em saúde.",
    topics: ["LGPD", "Marco legal", "Regulamentações", "Proteção de dados", "Compliance"],
    detailedContent: {
      introduction: "O marco legal é fundamental para garantir a segurança e privacidade dos dados em saúde digital.",
      sections: [
        {
          title: "Lei Geral de Proteção de Dados (LGPD)",
          content: "Aplicação da LGPD no contexto da saúde digital e suas implicações práticas. Entendimento dos direitos e obrigações.",
          keyPoints: [
            "Princípios da LGPD aplicados à saúde",
            "Direitos dos titulares de dados de saúde",
            "Obrigações dos controladores e operadores",
            "Bases legais para tratamento de dados"
          ]
        },
        {
          title: "Regulamentações Específicas",
          content: "Normas e regulamentações específicas para telessaúde e sistemas de informação em saúde. Marco regulatório completo.",
          keyPoints: [
            "Resoluções do CFM sobre telemedicina",
            "Portarias do Ministério da Saúde",
            "Normas técnicas e padrões",
            "Regulamentações estaduais e municipais"
          ]
        },
        {
          title: "Compliance e Auditoria",
          content: "Processos de compliance e auditoria em saúde digital. Como garantir conformidade legal.",
          keyPoints: [
            "Programas de compliance em saúde",
            "Auditoria de sistemas de informação",
            "Gestão de riscos regulatórios",
            "Treinamento e capacitação"
          ]
        }
      ],
      practicalExamples: [
        "Implementação da LGPD em sistemas de saúde",
        "Casos de compliance em hospitais",
        "Gestão de consentimento de pacientes",
        "Auditoria de sistemas de informação",
        "Desenvolvimento de políticas de privacidade"
      ],
      activities: [
        "Análise de casos de compliance em saúde",
        "Desenvolvimento de políticas de privacidade",
        "Auditoria de sistemas de informação",
        "Elaboração de termos de consentimento",
        "Simulação de processos de compliance"
      ],
      resources: [
        "Texto completo da LGPD",
        "Guias de compliance em saúde digital",
        "Ferramentas de proteção de dados",
        "Modelos de políticas de privacidade",
        "Checklist de compliance para saúde"
      ]
    },
    icon: "Shield"
  },
  {
    id: 5,
    title: "Módulo 5: RNDS – Rede Nacional de Dados em Saúde",
    duration: "2h",
    description: "Como a interoperabilidade da RNDS funciona, como conectar à RNDS, integrar vs interoperar e a Rede Mineira de Dados em Saúde (RMDS).",
    topics: ["Interoperabilidade RNDS", "Conexão à RNDS", "Integração vs Interoperação", "RMDS", "Arquitetura"],
    detailedContent: {
      introduction: "A RNDS é a espinha dorsal da interoperabilidade em saúde no Brasil, conectando diferentes sistemas e permitindo o compartilhamento seguro de informações.",
      sections: [
        {
          title: "Arquitetura da RNDS",
          content: "Compreensão da estrutura técnica e organizacional da RNDS. Entendimento dos componentes e fluxos de dados através do padrão FHIR.",
          keyPoints: [
            "Componentes principais da RNDS",
            "Padrões de interoperabilidade (HL7 FHIR integrado)",
            "Segurança e privacidade dos dados",
            "Arquitetura distribuída e escalável"
          ]
        },
        {
          title: "Conexão e Integração",
          content: "Processos para conectar sistemas à RNDS e diferenças entre integração e interoperabilidade. Foco na experiência da RMDS.",
          keyPoints: [
            "Protocolos de conexão e APIs",
            "Certificação de sistemas para RNDS",
            "Gestão de dados e consentimento",
            "Processo de homologação"
          ]
        },
        {
          title: "Experiência da RMDS",
          content: "A experiência da Rede Mineira de Dados em Saúde como exemplo prático de implementação de interoperabilidade.",
          keyPoints: [
            "Histórico e evolução da RMDS",
            "Casos de uso implementados",
            "Lições aprendidas",
            "Replicabilidade para outros estados"
          ]
        }
      ],
      practicalExamples: [
        "Conexão de sistemas municipais à RNDS",
        "Experiência completa da RMDS",
        "Casos de uso reais de interoperabilidade",
        "Processo de certificação de sistemas",
        "Implementação de APIs de saúde"
      ],
      activities: [
        "Mapeamento de sistemas existentes no município",
        "Planejamento de conexão à RNDS",
        "Análise de interoperabilidade e padrões",
        "Desenvolvimento de APIs de saúde",
        "Simulação de processo de certificação"
      ],
      resources: [
        "Guia Oficial RNDS: https://rnds-guia.saude.gov.br/docs/introducao",
        "Documentação técnica completa da RNDS",
        "Guias de implementação de interoperabilidade",
        "Ferramentas de desenvolvimento de APIs",
        "Casos de estudo da RMDS"
      ]
    },
    icon: "Database"
  },
  {
    id: 6,
    title: "Módulo 6: Programa SUS Digital",
    duration: "2h",
    description: "Meu SUS Digital, SUS Digital Profissional e SUS Digital Gestor - as três plataformas principais do programa.",
    topics: ["Meu SUS Digital", "SUS Digital Profissional", "SUS Digital Gestor", "Plataformas", "Funcionalidades"],
    detailedContent: {
      introduction: "O Programa SUS Digital representa a estratégia do Ministério da Saúde para digitalização dos serviços de saúde.",
      sections: [
        {
          title: "Meu SUS Digital",
          content: "Plataforma para cidadãos, permitindo acesso a serviços de saúde e informações pessoais. Interface amigável e acessível.",
          keyPoints: [
            "Funcionalidades para cidadãos (agendamento, resultados)",
            "Acesso a resultados de exames",
            "Agendamento de consultas e procedimentos",
            "Histórico de atendimentos e vacinas"
          ]
        },
        {
          title: "SUS Digital Profissional",
          content: "Ferramentas para profissionais de saúde, incluindo prontuário eletrônico e telemedicina. Interface especializada para médicos e enfermeiros.",
          keyPoints: [
            "Prontuário eletrônico do paciente (PEP)",
            "Telemedicina e teleconsultoria",
            "Gestão de pacientes e agendamento",
            "Prescrição eletrônica e dispensação"
          ]
        },
        {
          title: "SUS Digital Gestor",
          content: "Plataforma para gestores, com ferramentas de gestão e análise de dados. Interface administrativa para tomada de decisão.",
          keyPoints: [
            "Dashboards de gestão e monitoramento",
            "Indicadores de performance e qualidade",
            "Gestão de recursos e estoques",
            "Relatórios e análises estratégicas"
          ]
        },
        {
          title: "Integração entre Plataformas",
          content: "Como as três plataformas se integram e compartilham dados de forma segura e eficiente.",
          keyPoints: [
            "Fluxo de dados entre plataformas",
            "Segurança e privacidade",
            "Sincronização em tempo real",
            "Gestão de permissões e acessos"
          ]
        }
      ],
      practicalExamples: [
        "Uso das plataformas em municípios de diferentes portes",
        "Casos de sucesso de implementação",
        "Integração entre plataformas SUS Digital",
        "Migração de sistemas legados",
        "Capacitação de usuários"
      ],
      activities: [
        "Exploração prática das plataformas SUS Digital",
        "Análise de funcionalidades e casos de uso",
        "Planejamento de implementação municipal",
        "Desenvolvimento de planos de migração",
        "Elaboração de planos de capacitação"
      ],
      resources: [
        "Manuais completos das plataformas SUS Digital",
        "Guias de uso para diferentes perfis",
        "Suporte técnico e capacitação",
        "Casos de estudo de implementação",
        "Ferramentas de migração de dados"
      ]
    },
    icon: "Building"
  },
  {
    id: 7,
    title: "Módulo 7: E-SUS APS",
    duration: "2h",
    description: "Sistema de informação da Atenção Primária à Saúde, coleta de dados, indicadores e gestão da APS.",
    topics: ["Atenção Primária", "Coleta de dados", "Indicadores", "Gestão APS", "Sistemas"],
    detailedContent: {
      introduction: "O E-SUS APS é o sistema de informação oficial da Atenção Primária à Saúde no Brasil.",
      sections: [
        {
          title: "Arquitetura do E-SUS APS",
          content: "Compreensão da estrutura e componentes do sistema E-SUS APS. Entendimento da arquitetura distribuída.",
          keyPoints: [
            "Componentes principais do sistema",
            "Fluxos de dados e sincronização",
            "Integração com outros sistemas do SUS",
            "Arquitetura cliente-servidor"
          ]
        },
        {
          title: "Coleta e Gestão de Dados",
          content: "Processos de coleta, validação e gestão de dados na APS. Foco na qualidade e completude dos dados.",
          keyPoints: [
            "Fichas de coleta padronizadas",
            "Validação de dados e consistência",
            "Indicadores de qualidade da APS",
            "Gestão de equipes e territórios"
          ]
        },
        {
          title: "Indicadores e Monitoramento",
          content: "Indicadores de qualidade e monitoramento da Atenção Primária à Saúde através do E-SUS APS.",
          keyPoints: [
            "Indicadores de qualidade da APS",
            "Monitoramento de equipes",
            "Relatórios de gestão",
            "Avaliação de performance"
          ]
        }
      ],
      practicalExamples: [
        "Implementação do E-SUS APS em municípios",
        "Casos de uso reais de coleta de dados",
        "Gestão de equipes da APS",
        "Monitoramento de indicadores de qualidade",
        "Integração com sistemas municipais"
      ],
      activities: [
        "Análise de dados da APS e indicadores",
        "Desenvolvimento de indicadores de qualidade",
        "Planejamento de coleta de dados",
        "Simulação de gestão de equipes",
        "Elaboração de relatórios de gestão"
      ],
      resources: [
        "Manuais completos do E-SUS APS",
        "Guias de implementação e configuração",
        "Ferramentas de análise de dados",
        "Indicadores de qualidade da APS",
        "Casos de estudo de implementação"
      ]
    },
    icon: "FileText"
  },
  {
    id: 8,
    title: "Módulo 8: Análise e Uso de Dados em Saúde",
    duration: "2h",
    description: "Big data em saúde, analytics, dashboards, indicadores de performance e tomada de decisão baseada em dados.",
    topics: ["Big data", "Analytics", "Dashboards", "Indicadores", "Tomada de decisão"],
    detailedContent: {
      introduction: "A análise de dados em saúde permite melhorar a qualidade do cuidado e a eficiência da gestão.",
      sections: [
        {
          title: "Big Data em Saúde",
          content: "Conceitos e aplicações de big data no contexto da saúde pública. Entendimento das fontes e técnicas de análise.",
          keyPoints: [
            "Fontes de dados em saúde (SIS, SINAN, etc.)",
            "Técnicas de análise e mineração de dados",
            "Aplicações práticas em saúde pública",
            "Machine Learning em saúde"
          ]
        },
        {
          title: "Dashboards e Indicadores",
          content: "Desenvolvimento e uso de dashboards para gestão em saúde. Foco na visualização e interpretação de dados.",
          keyPoints: [
            "Tipos de indicadores de saúde",
            "Desenvolvimento de dashboards interativos",
            "Interpretação de dados e tendências",
            "Tomada de decisão baseada em dados"
          ]
        },
        {
          title: "Tomada de Decisão",
          content: "Como usar dados para tomada de decisão em saúde pública. Análise preditiva e prescritiva.",
          keyPoints: [
            "Análise preditiva em saúde",
            "Modelos de decisão",
            "Avaliação de impacto",
            "Monitoramento de resultados"
          ]
        }
      ],
      practicalExamples: [
        "Dashboards de gestão municipal em tempo real",
        "Análise de indicadores de saúde pública",
        "Tomada de decisão baseada em dados",
        "Predição de surtos epidemiológicos",
        "Otimização de recursos de saúde"
      ],
      activities: [
        "Desenvolvimento de indicadores de saúde",
        "Criação de dashboards interativos",
        "Análise de dados reais de saúde pública",
        "Desenvolvimento de modelos preditivos",
        "Simulação de tomada de decisão"
      ],
      resources: [
        "Ferramentas de análise de dados (R, Python, Power BI)",
        "Guias de desenvolvimento de dashboards",
        "Casos de estudo de análise em saúde",
        "Datasets públicos de saúde",
        "Tutoriais de Machine Learning em saúde"
      ]
    },
    icon: "BarChart3"
  },
  {
    id: 9,
    title: "Módulo 9: Materiais Complementares",
    duration: "Consultar",
    description: "Recursos adicionais, links para portais oficiais, documentos de referência e ferramentas práticas para implementação.",
    topics: ["Recursos adicionais", "Portais oficiais", "Documentos", "Ferramentas", "Implementação"],
    detailedContent: {
      introduction: "Este módulo reúne recursos complementares para aprofundamento e implementação prática da saúde digital.",
      sections: [
        {
          title: "Portais e Recursos Oficiais",
          content: "Links e recursos dos principais portais oficiais de saúde digital. Acesso direto às ferramentas e documentos oficiais.",
          keyPoints: [
            "Portais do Ministério da Saúde",
            "Documentos de referência e normativas",
            "Ferramentas oficiais de implementação",
            "Biblioteca digital de saúde"
          ]
        },
        {
          title: "Ferramentas Práticas",
          content: "Ferramentas e recursos para implementação da saúde digital. Recursos práticos para gestores e profissionais.",
          keyPoints: [
            "Guias de implementação passo a passo",
            "Ferramentas de avaliação de maturidade",
            "Recursos de capacitação e treinamento",
            "Modelos e templates prontos"
          ]
        },
        {
          title: "Comunidade e Networking",
          content: "Como conectar-se com outros profissionais e gestores de saúde digital. Troca de experiências e boas práticas.",
          keyPoints: [
            "Fóruns e grupos de discussão",
            "Eventos e webinars",
            "Redes de colaboração",
            "Mentoria e coaching"
          ]
        }
      ],
      practicalExamples: [
        "Uso de ferramentas oficiais do Ministério da Saúde",
        "Implementação em municípios de diferentes portes",
        "Casos de sucesso de saúde digital",
        "Networking com outros gestores",
        "Participação em eventos e webinars"
      ],
      activities: [
        "Exploração de portais oficiais de saúde digital",
        "Análise de ferramentas e recursos disponíveis",
        "Planejamento de implementação municipal",
        "Participação em fóruns e grupos de discussão",
        "Desenvolvimento de rede de contatos"
      ],
      resources: [
        "Links para portais oficiais do Ministério da Saúde",
        "Documentos de referência e normativas",
        "Ferramentas de implementação e avaliação",
        "Diretório de eventos e webinars",
        "Rede de profissionais de saúde digital"
      ]
    },
    icon: "BookOpen"
  }
];

export default courseModulesContent;