const CourseEpilogue = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Sobre o Curso
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p>
              Este curso foi desenvolvido pelo <strong className="text-primary">Núcleo de Saúde Digital – SES/GAB/ATI-NSDIGI</strong>, com o objetivo de apoiar a formação de profissionais e gestores da área da saúde no entendimento e aplicação dos conceitos fundamentais da <strong>Saúde Digital no contexto do SUS</strong>.
            </p>
            <p>
              Ao longo dos módulos, você terá contato com os principais pilares que sustentam a transformação digital no sistema público de saúde brasileiro, com ênfase na <strong>interoperabilidade de dados</strong>, na utilização da <strong>Rede Nacional de Dados em Saúde (RNDS)</strong>, e no fortalecimento das práticas de <strong>telessaúde</strong> e <strong>teleconsultoria</strong>.
            </p>
            <p>
              Além disso, exploraremos o papel estratégico do <strong>aplicativo Meu SUS Digital (antigo Conecte SUS)</strong> como ferramenta de acesso a informações de saúde e de integração entre os níveis de atenção. Com uma abordagem prática, orientada por diretrizes do Ministério da Saúde, este curso proporciona uma base sólida para profissionais que desejam se atualizar e contribuir com a qualificação dos serviços de saúde digital no Brasil.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseEpilogue;