/**
 * Mocks de produtos para o marketplace H.A.C. Arena
 * Dados detalhados e realistas de periféricos gamers
 */
export const PRODUTOS_MOCK = [
  // Teclados
  {
    id: 1,
    nome: "Teclado Mecânico H.A.C. Nova RGB",
    categoria: "Teclados",
    marca: "H.A.C.",
    preco: 349.90,
    precoOriginal: 429.90,
    nota: 4.8,
    estoque: 15,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=Teclado+Nova",
    descricaoCurta: "Teclado mecânico com switches azuis, iluminação RGB Chroma e layout ABNT2.",
    descricaoCompleta: "O Teclado H.A.C. Nova foi projetado para jogadores que exigem precisão e durabilidade. Com switches mecânicos azuis táteis, cada pressionamento de tecla é sentido e ouvido, garantindo que nenhum comando seja perdido no calor da batalha. Sua iluminação RGB Chroma é totalmente customizável via software.",
    especificacoes: {
      "Tipo de Switch": "Mecânico Azul",
      "Layout": "ABNT2",
      "Iluminação": "RGB Chroma 16.8M Cores",
      "Conectividade": "USB 2.0 Gold Plated",
      "Material": "Alumínio e ABS",
      "Anti-Ghosting": "100% (N-Key Rollover)"
    },
    destaque: true,
    novo: false,
    maisVendido: true
  },
  {
    id: 2,
    nome: "Teclado Gamer Stealth Silent",
    categoria: "Teclados",
    marca: "SilentTech",
    preco: 259.00,
    nota: 4.5,
    estoque: 8,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=Teclado+Stealth+Silent",
    descricaoCurta: "Teclado ultra silencioso com teclas low profile e resistência a respingos.",
    descricaoCompleta: "Jogue durante a noite sem incomodar ninguém com o Stealth Silent. Suas teclas de membrana de alta qualidade oferecem uma resposta rápida com o mínimo de ruído, enquanto o design ergonômico garante conforto por horas.",
    especificacoes: {
      "Tipo": "Membrana Silent",
      "Perfil": "Low Profile",
      "Resistência": "Resistente a Respingos",
      "Macro": "5 Teclas Dedicadas",
      "Cabo": "1.8m Trançado"
    },
    destaque: false,
    novo: true,
    maisVendido: false
  },

  // Mouses
  {
    id: 3,
    nome: "Mouse Gamer Swift 12K DPI",
    categoria: "Mouses",
    marca: "H.A.C.",
    preco: 189.90,
    precoOriginal: 219.00,
    nota: 4.9,
    estoque: 25,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=Mouse+Swift+12K",
    descricaoCurta: "Mouse ergonômico com sensor PixArt de 12.000 DPI.",
    descricaoCompleta: "Velocidade e precisão extrema. O Mouse Swift utiliza o sensor óptico PixArt 3327, um dos favoritos dos pro-players, oferecendo rastreamento 1:1 e aceleração zero.",
    especificacoes: {
      "Sensor": "PixArt 3327 Óptico",
      "DPI Máximo": "12.000 DPI",
      "Botões": "6 Programáveis",
      "Peso": "85g (Ajustável)",
      "Switches": "Omron 20M cliques"
    },
    destaque: true,
    novo: false,
    maisVendido: true
  },
  {
    id: 4,
    nome: "Mouse Wireless Pro Shadow",
    categoria: "Mouses",
    marca: "Shadow",
    preco: 450.00,
    nota: 4.7,
    estoque: 5,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=Mouse+Shadow+Pro",
    descricaoCurta: "Mouse sem fio ultra leve (60g) para alta performance competitiva.",
    descricaoCompleta: "Elimine os cabos e a fricção. O Shadow Pro Wireless entrega latência de 1ms através de sua conexão 2.4GHz proprietária, em um corpo ultra leve de apenas 60 gramas.",
    especificacoes: {
      "Conexão": "Wireless 2.4GHz / USB-C",
      "Sensor": "Hero 25K",
      "Peso": "60g",
      "Bateria": "Até 80 horas",
      "Pés": "PTFE Virgem"
    },
    destaque: false,
    novo: true,
    maisVendido: false
  },

  // Headsets
  {
    id: 5,
    nome: "Headset 7.1 Surround Arena V2",
    categoria: "Headsets",
    marca: "H.A.C.",
    preco: 299.90,
    nota: 4.6,
    estoque: 12,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=Headset+Arena",
    descricaoCurta: "Som surround 7.1 virtual e drivers de 50mm para imersão total.",
    descricaoCompleta: "Ouça cada passo dos seus inimigos. O Arena V2 combina conforto extremo com earcups de couro sintético e uma placa de som USB que entrega áudio 7.1 posicional de alta fidelidade.",
    especificacoes: {
      "Driver": "50mm Neodímio",
      "Áudio": "Surround 7.1 Virtual",
      "Microfone": "Cancelamento de Ruído / Destacável",
      "Compatibilidade": "PC, PS4, PS5, Xbox",
      "Conexão": "USB / P3 3.5mm"
    },
    destaque: true,
    novo: false,
    maisVendido: false
  },

  // Monitores
  {
    id: 6,
    nome: "Monitor Gamer 24\" 144Hz Vision",
    categoria: "Monitores",
    marca: "VisionX",
    preco: 1299.00,
    precoOriginal: 1499.00,
    nota: 4.8,
    estoque: 10,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=Monitor+Vision",
    descricaoCurta: "Monitor Full HD 1ms IPS com tecnologia FreeSync.",
    descricaoCompleta: "Fluidez absoluta para seus jogos favoritos. Com 144Hz de taxa de atualização, o desfoque de movimento é coisa do passado. O painel IPS garante cores vibrantes e ângulos de visão de 178 graus.",
    especificacoes: {
      "Tamanho": "24 Polegadas",
      "Painel": "IPS",
      "Resolução": "1920x1080 (FHD)",
      "Refresh": "144Hz",
      "Resposta": "1ms (MPRT)",
      "Sync": "AMD FreeSync Premium"
    },
    destaque: true,
    novo: false,
    maisVendido: false
  },

  // Mousepads
  {
    id: 7,
    nome: "Mousepad Speed Extended H.A.C.",
    categoria: "Mousepads",
    marca: "H.A.C.",
    preco: 89.90,
    nota: 4.9,
    estoque: 40,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=Mousepad+HAC",
    descricaoCurta: "Mousepad extra grande 900x400mm com bordas costuradas.",
    descricaoCompleta: "O complemento ideal para o seu setup. Com superfície de tecido de baixa fricção otimizada para sensores ópticos e laser, e base de borracha natural para não deslizar na mesa.",
    especificacoes: {
      "Dimensões": "900 x 400 x 3 mm",
      "Superfície": "Tecido Speed",
      "Base": "Borracha Antiderrapante",
      "Bordas": "Costura Reforçada",
      "Lavável": "Sim"
    },
    destaque: false,
    novo: false,
    maisVendido: true
  },

  // Cadeiras
  {
    id: 8,
    nome: "Cadeira Gamer H.A.C. Throne Black",
    categoria: "Cadeiras",
    marca: "H.A.C.",
    preco: 1299.00,
    nota: 4.7,
    estoque: 5,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=Cadeira+Throne",
    descricaoCurta: "Cadeira ergonômica com inclinação de 180° e braços 4D.",
    descricaoCompleta: "Conforto absoluto para longas sessões de jogo. A H.A.C. Throne possui estrutura de aço, espuma de alta densidade e revestimento em couro sintético premium.",
    especificacoes: {
      "Peso Suportado": "Até 150kg",
      "Inclinação": "90° a 180°",
      "Braços": "Ajuste 4D",
      "Cilindro": "Classe 4",
      "Base": "Alumínio Reforçado"
    },
    destaque: true,
    novo: true,
    maisVendido: false
  },

  // Processadores
  {
    id: 9,
    nome: "Processador Intel Core i9-13900K",
    categoria: "Processadores",
    marca: "Intel",
    preco: 3899.00,
    nota: 5.0,
    estoque: 3,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=Core+i9+13900K",
    descricaoCurta: "Processador de 24 núcleos e 32 threads com boost até 5.8GHz.",
    descricaoCompleta: "O auge da performance para gaming e criação de conteúdo. Com arquitetura híbrida de performance, o i9-13900K entrega resultados incríveis em qualquer tarefa.",
    especificacoes: {
      "Núcleos": "24 (8P + 16E)",
      "Threads": "32",
      "Frequência Turbo": "5.8 GHz",
      "Cache L3": "36 MB",
      "TDP": "125W"
    },
    destaque: false,
    novo: false,
    maisVendido: false
  },

  // Placas de Vídeo
  {
    id: 10,
    nome: "NVIDIA GeForce RTX 4080 Super",
    categoria: "Placas de Vídeo",
    marca: "NVIDIA",
    preco: 7499.00,
    nota: 4.9,
    estoque: 2,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=RTX+4080+Super",
    descricaoCurta: "Placa de vídeo com 16GB GDDR6X e tecnologia DLSS 3.",
    descricaoCompleta: "Potência extrema para 4K e Ray Tracing. A RTX 4080 Super oferece a arquitetura Ada Lovelace para uma experiência visual sem precedentes.",
    especificacoes: {
      "Memória": "16GB GDDR6X",
      "Interface": "256-bit",
      "CUDA Cores": "10240",
      "Saídas": "3x DisplayPort, 1x HDMI",
      "Recomendação de Fonte": "750W"
    },
    destaque: true,
    novo: true,
    maisVendido: false
  },

  // Memória RAM
  {
    id: 11,
    nome: "Memória RAM Corsair Vengeance 32GB DDR5",
    categoria: "Memória RAM",
    marca: "Corsair",
    preco: 899.00,
    nota: 4.8,
    estoque: 15,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=DDR5+32GB",
    descricaoCurta: "Kit 2x16GB DDR5 6000MHz com iluminação RGB.",
    descricaoCompleta: "Velocidade de próxima geração para seu setup. As memórias Corsair Vengeance DDR5 oferecem frequências altíssimas e latência otimizada.",
    especificacoes: {
      "Capacidade": "32GB (2x16GB)",
      "Tipo": "DDR5",
      "Frequência": "6000MHz",
      "Latência": "CL36",
      "Iluminação": "RGB iCUE"
    },
    destaque: false,
    novo: true,
    maisVendido: true
  },

  // Armazenamento
  {
    id: 12,
    nome: "SSD NVMe WD Black SN850X 2TB",
    categoria: "Armazenamento",
    marca: "Western Digital",
    preco: 1150.00,
    nota: 4.9,
    estoque: 7,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=WD+Black+2TB",
    descricaoCurta: "SSD NVMe Gen4 com leitura de até 7.300 MB/s.",
    descricaoCompleta: "O SSD definitivo para o seu PS5 ou PC Gamer. O SN850X reduz drasticamente os tempos de carregamento e elimina gargalos de armazenamento.",
    especificacoes: {
      "Capacidade": "2TB",
      "Interface": "PCIe Gen4 x4",
      "Leitura": "7.300 MB/s",
      "Gravação": "6.600 MB/s",
      "Formato": "M.2 2280"
    },
    destaque: true,
    novo: false,
    maisVendido: false
  },

  // Fontes
  {
    id: 13,
    nome: "Fonte Corsair RM850x 80 Plus Gold",
    categoria: "Fontes",
    marca: "Corsair",
    preco: 950.00,
    nota: 4.9,
    estoque: 10,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=RM850x",
    descricaoCurta: "Fonte modular de 850W com certificação Gold.",
    descricaoCompleta: "Energia estável e silenciosa para seu PC. Totalmente modular para um cable management limpo e eficiente.",
    especificacoes: {
      "Potência": "850W",
      "Certificação": "80 Plus Gold",
      "Cabeamento": "Full Modular",
      "Ventoinha": "135mm MagLev",
      "Garantia": "10 anos"
    },
    destaque: false,
    novo: false,
    maisVendido: false
  },

  // Placas-mãe
  {
    id: 14,
    nome: "Placa-Mãe ASUS ROG Strix Z790-E",
    categoria: "Placas-mãe",
    marca: "ASUS",
    preco: 3200.00,
    nota: 4.8,
    estoque: 4,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=ROG+Z790-E",
    descricaoCurta: "Placa-mãe LGA 1700 com suporte a DDR5 e WiFi 6E.",
    descricaoCompleta: "A base perfeita para processadores Intel de 13ª e 14ª geração. Oferece VRM robusto e dissipadores massivos para overclocking.",
    especificacoes: {
      "Socket": "LGA 1700",
      "Chipset": "Intel Z790",
      "Memória": "4x DDR5 (Até 192GB)",
      "Rede": "WiFi 6E + 2.5Gb Ethernet",
      "Áudio": "ROG SupremeFX 7.1"
    },
    destaque: false,
    novo: true,
    maisVendido: false
  },

  // Gabinetes
  {
    id: 15,
    nome: "Gabinete Lian Li O11 Dynamic EVO",
    categoria: "Gabinetes",
    marca: "Lian Li",
    preco: 1450.00,
    nota: 4.9,
    estoque: 6,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=O11+Dynamic",
    descricaoCurta: "Gabinete Mid-Tower modular com vidros temperados.",
    descricaoCompleta: "O gabinete mais icônico do mercado. Design de câmara dupla que oferece um visual incrível e excelente fluxo de ar.",
    especificacoes: {
      "Formato": "Mid-Tower",
      "Suporte Placa-Mãe": "E-ATX, ATX, Micro-ATX",
      "Material": "Alumínio e Vidro Temperado",
      "Suporte Radiador": "Até 3x 360mm",
      "Dimensões": "459 x 285 x 465 mm"
    },
    destaque: true,
    novo: false,
    maisVendido: true
  },

  // Coolers
  {
    id: 16,
    nome: "Water Cooler NZXT Kraken Elite 360",
    categoria: "Coolers",
    marca: "NZXT",
    preco: 1890.00,
    nota: 4.7,
    estoque: 8,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=Kraken+Elite",
    descricaoCurta: "Water cooler de 360mm com tela LCD customizável.",
    descricaoCompleta: "Refrigeração de alta performance com estilo inigualável. A tela LCD permite exibir temperaturas, GIFs ou imagens personalizadas.",
    especificacoes: {
      "Tamanho Radiador": "360mm",
      "Ventoinhas": "3x F120P Static Pressure",
      "Tela LCD": "2.36\" 640x640",
      "Compatibilidade": "Intel e AMD",
      "Controle": "Software NZXT CAM"
    },
    destaque: false,
    novo: true,
    maisVendido: false
  },

  // Streaming
  {
    id: 17,
    nome: "Microfone Shure SM7B",
    categoria: "Streaming",
    marca: "Shure",
    preco: 3200.00,
    nota: 5.0,
    estoque: 5,
    imagem: "https://placehold.co/400x400/101218/00f2ff?text=Shure+SM7B",
    descricaoCurta: "Microfone dinâmico profissional para streaming e podcasts.",
    descricaoCompleta: "O padrão da indústria para captura de voz. Oferece um som quente e rico que é perfeito para criadores de conteúdo sérios.",
    especificacoes: {
      "Tipo": "Dinâmico",
      "Padrão Polar": "Cardioide",
      "Conexão": "XLR",
      "Resposta": "50Hz - 20kHz",
      "Acessórios": "Pop Filter incluso"
    },
    destaque: true,
    novo: false,
    maisVendido: false
  }
];

export default PRODUTOS_MOCK;
