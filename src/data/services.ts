import type { ServiceCategory } from "@/types";

/**
 * Catálogo de serviços. Para adicionar ou remover um serviço, edite a lista `items`
 * da categoria correspondente. A página /servicos, a home e o formulário usam estes dados.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "creative",
    brand: "Visória Creative",
    title: "Design e identidade visual",
    icon: "palette",
    shortDescription:
      "Marcas, materiais gráficos e peças visuais com coerência e personalidade, do logotipo ao material impresso.",
    highlights: ["Criação de logotipos", "Identidade visual completa", "Design para redes sociais", "Apresentações comerciais"],
    items: [
      "Criação de logotipos",
      "Identidade visual completa",
      "Manual de marca",
      "Redesign de marcas",
      "Naming e desenvolvimento de nomes",
      "Paleta de cores e tipografia",
      "Papelaria corporativa",
      "Cartões de visita",
      "Assinaturas de e-mail",
      "Apresentações comerciais",
      "Catálogos e portfólios",
      "Flyers, panfletos e folders",
      "Banners digitais e impressos",
      "Cardápios",
      "Convites",
      "Embalagens e rótulos",
      "Mockups",
      "Infográficos",
      "Diagramação de e-books e documentos",
      "Ilustrações e elementos gráficos",
      "Design para redes sociais",
      "Templates de conteúdo",
      "Capas para vídeos",
      "Criativos publicitários",
      "Artes para eventos",
      "Comunicação visual para materiais impressos",
    ],
  },
  {
    id: "media",
    brand: "Visória Media",
    title: "Audiovisual e fotografia",
    icon: "clapperboard",
    shortDescription:
      "Vídeos, fotografias e motion graphics pensados para contar a história da marca em cada formato e plataforma.",
    highlights: ["Vídeos institucionais e comerciais", "Reels, Shorts e TikToks", "Fotografia de produtos", "Motion graphics"],
    items: [
      "Produção de vídeos institucionais",
      "Vídeos comerciais",
      "Vídeos publicitários",
      "Filmagem de eventos",
      "Cobertura de inaugurações",
      "Vídeos de produtos",
      "Vídeos para restaurantes e comércios",
      "Reels, Shorts e TikToks",
      "Entrevistas e depoimentos",
      "Vídeos de bastidores",
      "Vídeos de imóveis",
      "Vídeos esportivos",
      "Videoclipes",
      "Roteirização",
      "Fotografia comercial",
      "Fotografia de produtos",
      "Fotografia gastronômica",
      "Fotografia de eventos",
      "Fotografia corporativa",
      "Tratamento e edição de fotografias",
      "Edição de vídeos curtos e longos",
      "Motion graphics",
      "Vinhetas",
      "Animação de logotipos",
      "Legendas",
      "Tratamento de áudio",
      "Adaptação de vídeos para diferentes formatos",
    ],
  },
  {
    id: "digital",
    brand: "Visória Digital",
    title: "Sites e comércio eletrônico",
    icon: "globe",
    shortDescription:
      "Sites, landing pages e lojas virtuais responsivos, com design cuidadoso e foco em clareza para o visitante.",
    highlights: ["Sites institucionais", "Landing pages", "Lojas virtuais", "Catálogos digitais"],
    items: [
      "Sites institucionais",
      "Landing pages",
      "Portfólios online",
      "Sites para profissionais",
      "Sites para eventos",
      "Sites para restaurantes",
      "Catálogos digitais",
      "Cardápios digitais",
      "Blogs",
      "Formulários de contato",
      "Páginas de captura de leads",
      "Desenvolvimento de interfaces responsivas",
      "Reformulação de sites",
      "Integração com mapas e redes sociais",
      "Publicação e hospedagem, quando contratadas",
      "Manutenção e atualização",
      "Criação de lojas virtuais",
      "Configuração de pagamentos e frete",
      "Cadastro e organização de produtos",
    ],
  },
  {
    id: "marketing",
    brand: "Visória Marketing",
    title: "Marketing e publicidade",
    icon: "megaphone",
    shortDescription:
      "Planejamento, conteúdo e campanhas para comunicar com consistência e acompanhar o desempenho com clareza.",
    highlights: ["Gestão de redes sociais", "Planejamento editorial", "Campanhas pagas", "Relatórios de desempenho"],
    note:
      "O orçamento de mídia paga (valor investido diretamente nas plataformas de anúncio) é separado do valor do serviço de gestão dos anúncios.",
    items: [
      "Planejamento de marketing digital",
      "Gestão de redes sociais",
      "Planejamento editorial",
      "Calendário de publicações",
      "Criação de legendas",
      "Copywriting",
      "Agendamento de publicações",
      "Campanhas de lançamento",
      "Divulgação de eventos",
      "Marketing local",
      "Marketing de influência",
      "Campanhas no Meta Ads",
      "Campanhas no Google Ads",
      "Campanhas no YouTube Ads",
      "Campanhas no TikTok Ads",
      "Geração de leads",
      "Remarketing",
      "Criação de anúncios",
      "Relatórios de desempenho",
    ],
  },
  {
    id: "tech",
    brand: "Visória Tech",
    title: "Tecnologia, programação e IA",
    icon: "cpu",
    shortDescription:
      "Sistemas e automações que organizam processos e dão forma digital a ideias de negócio.",
    highlights: ["Aplicações web e sistemas internos", "Automação de processos", "Assistentes virtuais", "MVPs e prototipagem"],
    items: [
      "Desenvolvimento de aplicações web",
      "Sistemas internos",
      "Sistemas de cadastro e controle",
      "Painéis administrativos",
      "Sistemas de agendamento",
      "Sistemas de orçamento",
      "Sistemas de gestão de clientes",
      "Automação de tarefas",
      "MVPs",
      "Assistentes virtuais",
      "Automação de relatórios",
      "Automação de processos administrativos",
      "Fluxos de trabalho automatizados",
      "Consultoria de digitalização",
      "Prototipagem de soluções digitais",
    ],
  },
  {
    id: "complementary",
    brand: "Serviços complementares",
    title: "Possibilidades adicionais",
    icon: "layers",
    shortDescription:
      "Projetos que ampliam o alcance da marca em ambientes, eventos e novos formatos, avaliados caso a caso.",
    highlights: ["Pitch decks", "Sinalização e fachadas", "E-books", "Consultoria para adoção de IA"],
    note:
      "Estes serviços são apresentados como possibilidades adicionais. A viabilidade, o formato e a execução (direta ou com parceiros) são definidos em conversa, projeto a projeto.",
    items: [
      "Comunicação visual para ambientes",
      "Fachadas, placas e sinalização",
      "Adesivos e materiais para pontos de venda",
      "Apresentações institucionais",
      "Pitch decks",
      "E-books",
      "Relatórios visuais",
      "Identidade visual para eventos",
      "Convites e materiais de divulgação",
      "Cobertura audiovisual de eventos",
      "Modelagem e renderização 3D",
      "Consultoria para adoção de IA",
      "Produtos digitais e templates",
    ],
  },
];

/** As cinco áreas principais (exclui "complementares"), usadas na home e no rodapé. */
export const mainAreas = serviceCategories.filter((c) => c.id !== "complementary");

/** Opções do campo "serviço desejado" do formulário. */
export const serviceOptions = serviceCategories.map((c) => ({
  id: c.id,
  label: c.id === "complementary" ? "Serviços complementares" : c.brand,
  hint: c.title,
}));

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
