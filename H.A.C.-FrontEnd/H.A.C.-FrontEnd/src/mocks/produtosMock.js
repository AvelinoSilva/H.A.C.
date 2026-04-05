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
    imagem: "https://via.placeholder.com/400x400?text=Teclado+Nova",
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
    imagem: "https://via.placeholder.com/400x400?text=Teclado+Stealth",
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
    imagem: "https://via.placeholder.com/400x400?text=Mouse+Swift",
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
    imagem: "https://via.placeholder.com/400x400?text=Mouse+Shadow",
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
    imagem: "https://via.placeholder.com/400x400?text=Headset+Arena",
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
    imagem: "https://via.placeholder.com/400x400?text=Monitor+Vision",
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
    imagem: "https://via.placeholder.com/400x400?text=Mousepad+HAC",
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
  }
];

export default PRODUTOS_MOCK;
