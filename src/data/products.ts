export interface Product {
  id: string;
  name: string;
  description?: string;
  platform?: string;
  url: string; // link — pode ser o link de afiliado
  image?: string;
}

export type NewProduct = Omit<Product, "id">;

// Produtos padrão (usado como fallback e inicialização)
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    name: "Fone Bluetooth Premium",
    description: "Som cristalino e bateria de longa duração para o dia todo",
    platform: "Temu",
    url: "https://temu.com",
  },
  {
    id: "prod_2",
    name: "Conjunto Streetwear",
    description: "Estilo urbano moderno com tecido confortável e durável",
    platform: "Shein",
    url: "https://shein.com",
  },
  {
    id: "prod_3",
    name: "Ring Light Profissional",
    description: "Iluminação perfeita para seus vídeos e fotos",
    platform: "AliExpress",
    url: "https://aliexpress.com",
  },
  {
    id: "prod_4",
    name: "Smartwatch Fitness",
    description: "Monitore sua saúde e receba notificações no pulso",
    platform: "Amazon",
    url: "https://amazon.com.br",
  },
  {
    id: "prod_5",
    name: "Autland",
    description: "Produto especial Autland para suas necessidades",
    platform: "Amazon",
    url: "https://amazon.com.br",
  },
];

export default DEFAULT_PRODUCTS;
