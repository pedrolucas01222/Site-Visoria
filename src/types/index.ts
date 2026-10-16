export type IconName =
  | "palette"
  | "clapperboard"
  | "globe"
  | "megaphone"
  | "cpu"
  | "compass"
  | "layers";

export type ServiceCategoryId =
  | "creative"
  | "media"
  | "digital"
  | "marketing"
  | "tech"
  | "complementary";

export interface ServiceCategory {
  id: ServiceCategoryId;
  /** Nome da área, ex.: "Visória Creative". */
  brand: string;
  /** Subtítulo da área, ex.: "Design e identidade visual". */
  title: string;
  shortDescription: string;
  icon: IconName;
  /** Resumo exibido na página inicial. */
  highlights: string[];
  /** Catálogo completo exibido em /servicos. */
  items: string[];
  note?: string;
}

export interface TextItem {
  title: string;
  description: string;
}
