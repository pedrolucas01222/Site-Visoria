import type { TextItem } from "@/types";

/** Textos institucionais centralizados. Edite aqui para alterar o conteúdo do site. */

export const hero = {
  title: "Ideias que ganham forma. Marcas que vão além.",
  text: "Unimos design, tecnologia e audiovisual para transformar ideias em experiências digitais que conectam marcas e pessoas.",
};

export const intro = {
  title: "Criatividade com propósito. Tecnologia com direção.",
  text: "A Visória Studio desenvolve soluções criativas e digitais para empresas que desejam fortalecer sua marca, melhorar sua comunicação e ampliar suas possibilidades no ambiente digital.",
};

export const processSteps: TextItem[] = [
  { title: "Descoberta", description: "Entendemos o negócio, os objetivos e o público antes de desenhar qualquer solução." },
  { title: "Estratégia", description: "Definimos o caminho mais adequado para o projeto: escopo, prioridades e formato." },
  { title: "Criação", description: "Desenvolvemos a solução e realizamos as revisões acordadas ao longo do trabalho." },
  { title: "Entrega", description: "Publicamos, entregamos os arquivos e orientamos você no uso do que foi produzido." },
];

export const differentials: TextItem[] = [
  { title: "Soluções pensadas para cada projeto", description: "Nada de fórmulas prontas: o ponto de partida é o seu contexto." },
  { title: "Criação e tecnologia integradas", description: "Design, vídeo e desenvolvimento conversam desde o início, sem retrabalho entre equipes." },
  { title: "Comunicação clara", description: "Você sabe em que etapa o projeto está e o que é necessário para avançar." },
  { title: "Foco nos objetivos do cliente", description: "Cada decisão de design ou código precisa ter uma função para o seu negócio." },
  { title: "Organização e consistência visual", description: "Padrões, arquivos e entregas organizados para que a marca se mantenha coerente." },
  { title: "Acompanhamento contínuo", description: "Possibilidade de manter o trabalho evoluindo depois da entrega, quando fizer sentido." },
];

export const finalCta = {
  title: "Sua próxima ideia pode começar aqui.",
  text: "Conte um pouco sobre seu projeto e vamos encontrar a melhor forma de tirar sua ideia do papel.",
};

export const about = {
  paragraphs: [
    "A Visória Studio nasceu da união entre criatividade, comunicação e tecnologia. Nosso objetivo é desenvolver soluções que ajudem marcas e empresas a se apresentar melhor, comunicar suas ideias e aproveitar as oportunidades do ambiente digital.",
    "Acreditamos que um bom projeto vai além da aparência: ele precisa ter propósito, coerência e uma função clara para o negócio.",
  ],
  purpose:
    "Ajudar empresas, marcas, profissionais e empreendedores a construir uma presença digital profissional, fortalecer sua identidade e desenvolver soluções que resolvam problemas reais.",
  vision:
    "Construir uma marca capaz de crescer nacionalmente e, com o tempo, expandir para novas áreas, equipes e unidades de negócio, sem perder a consistência e o rigor que orientam cada projeto.",
  values: [
    { title: "Clareza", description: "Comunicação direta com o cliente e entre as áreas do projeto." },
    { title: "Coerência", description: "Identidade, conteúdo e tecnologia seguindo a mesma direção." },
    { title: "Precisão", description: "Atenção ao detalhe em layout, código, texto e entrega." },
    { title: "Evolução", description: "Revisão constante de métodos, ferramentas e resultados." },
    { title: "Responsabilidade", description: "Honestidade sobre prazos, escopo e o que é possível entregar." },
  ] satisfies TextItem[],
  philosophy: [
    "Começamos pelas perguntas, não pelo layout. Entender quem é o cliente e quem ele quer alcançar evita decisões decorativas.",
    "Tratamos design e tecnologia como partes da mesma solução. Uma identidade bonita que não funciona no site, ou um site rápido sem personalidade, resolvem só metade do problema.",
    "Preferimos prometer menos e entregar com consistência. Não garantimos resultados de mercado; garantimos método, transparência e cuidado com o que é produzido.",
  ],
  commitments: [
    { title: "Qualidade", description: "Revisão técnica e visual antes de cada entrega." },
    { title: "Clareza", description: "Escopo, etapas e prazos combinados por escrito." },
    { title: "Evolução", description: "Abertura para ajustes e melhorias ao longo do relacionamento." },
  ] satisfies TextItem[],
};

export const privacy = {
  intro:
    "Esta Política de Privacidade descreve, de forma geral, como a Visória Studio trata os dados pessoais enviados por meio deste site. Este texto é um modelo inicial e deve ser revisado por um profissional jurídico e atualizado conforme os dados e as ferramentas efetivamente utilizados.",
  sections: [
    {
      title: "Quem é o controlador dos dados",
      body: [
        "A Visória Studio é a responsável pelo tratamento dos dados coletados neste site. Os dados completos da empresa (razão social, CNPJ e endereço) devem ser inseridos aqui assim que forem definidos.",
      ],
    },
    {
      title: "Quais dados coletamos",
      body: [
        "Coletamos apenas os dados que você informa voluntariamente no formulário de orçamento: nome, empresa (opcional), e-mail, WhatsApp (opcional), serviços de interesse, tipo e descrição do projeto, prazo e faixa de investimento (opcionais) e como conheceu a Visória.",
        "Este site não utiliza cookies de rastreamento nem ferramentas de análise de audiência por padrão. Caso sejam adicionados no futuro, esta política e o aviso de consentimento devem ser atualizados.",
      ],
    },
    {
      title: "Para que usamos os dados",
      body: [
        "Usamos os dados exclusivamente para responder à sua solicitação, elaborar propostas e manter a comunicação sobre o projeto. Não vendemos nem compartilhamos seus dados para fins de publicidade de terceiros.",
      ],
    },
    {
      title: "Base legal",
      body: [
        "O tratamento ocorre com base no seu consentimento, manifestado ao aceitar esta política no formulário, e para a execução de procedimentos preliminares relacionados a um possível contrato, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
      ],
    },
    {
      title: "Com quem os dados podem ser compartilhados",
      body: [
        "Os dados podem ser processados por prestadores de serviço necessários ao funcionamento do site, como a plataforma de hospedagem e o serviço de envio de e-mails ou de formulários configurado. Liste aqui os fornecedores efetivamente utilizados.",
      ],
    },
    {
      title: "Por quanto tempo guardamos os dados",
      body: [
        "Mantemos os dados pelo tempo necessário para atender à sua solicitação e cumprir obrigações legais. Contatos que não resultarem em projeto devem ser excluídos em prazo definido pela empresa (12 meses).",
      ],
    },
    {
      title: "Seus direitos",
      body: [
        "Você pode solicitar confirmação do tratamento, acesso, correção, anonimização, portabilidade, eliminação dos dados e revogação do consentimento, entre outros direitos previstos na LGPD. Para exercê-los, utilize o canal de contato informado na página de contato.",
      ],
    },
    {
      title: "Segurança",
      body: [
        "Adotamos medidas técnicas razoáveis para proteger os dados, como validação no servidor, comunicação criptografada (HTTPS) e armazenamento de credenciais em variáveis de ambiente.",
      ],
    },
    {
      title: "Alterações desta política",
      body: ["Esta política pode ser atualizada. A versão vigente estará sempre disponível nesta página."],
    },
  ],
};
