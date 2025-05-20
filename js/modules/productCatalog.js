// js/modules/productCatalog.js
// ---------------------------------------------------------------------------
//  Catálogo completo (10 sabores) com campos para a nova modal robusta
// ---------------------------------------------------------------------------

const products = [
  /* 1 ─ Leite Ninho® ------------------------------------------------------ */
  {
    id        : 1,
    name      : 'Leite Ninho',
    price     : 1,
    img       : './images/Leite_Ninho.png',          // hero
    images    : [
      './images/Leite_Ninho_close1.png',
      './images/Leite_Ninho_close2.png'
    ],
    video     : '',                                  // (opcional) YouTube ou mp4
    teaser    : 'O sabor da infância em massa folhada crocante.',
    desc      : 'Recheio cremoso feito com leite condensado e generosas porções de Leite Ninho® — doce na medida certa, perfeito para acompanhar um café ou chá.',
    tech      : 'Peso líquido: 55 g · Validade: 4 dias · Conservar a 4 °C.',
    ingredients: [
      'Farinha de trigo', 'Manteiga', 'Leite condensado',
      'Leite em pó integral', 'Açúcar', 'Sal'
    ]
  },

  /* 2 ─ Paçoquita® -------------------------------------------------------- */
  {
    id        : 2,
    name      : 'Paçoquita',
    price     : 1,
    img       : './images/Paçoquita.png',
    images    : [
      './images/Pacoquita_close1.png',
      './images/Pacoquita_close2.png'
    ],
    video     : 'https://www.youtube.com/embed/xxxxxxx',   // substitua se quiser
    teaser    : 'Crocante por fora, paçoca cremosa por dentro.',
    desc      : 'Creme amanteigado de Paçoquita® envolto por massa folhada dourada, finalizado com farofinha crocante de amendoim e um cilindro de paçoca.',
    tech      : 'Peso: 55 g · Alergénios: amendoim, lactose · Validade: 4 dias.',
    ingredients: [
      'Farinha de trigo', 'Manteiga', 'Paçoca (amendoim, açúcar, sal)',
      'Leite condensado', 'Açúcar', 'Sal'
    ]
  },

  /* 3 ─ Brigadeiro -------------------------------------------------------- */
  {
    id        : 3,
    name      : 'Brigadeiro',
    price     : 1,
    img       : './images/Pastel_de_Brigadeiro.png',
    images    : [
      './images/Brigadeiro_close1.png',
      './images/Brigadeiro_close2.png'
    ],
    video     : '',
    teaser    : 'Chocolate brasileiro em formato de pastel.',
    desc      : 'Brigadeiro de panela feito com cacau 50 %, coberto por granulado belga, selado numa massa folhada fina e amanteigada.',
    tech      : 'Peso: 55 g · Alergénios: leite, soja · Conservar a 4 °C.',
    ingredients: [
      'Farinha de trigo', 'Manteiga', 'Leite condensado',
      'Chocolate em pó 50 %', 'Granulado de chocolate', 'Sal'
    ]
  },

  /* 4 ─ Beijinho ---------------------------------------------------------- */
  {
    id        : 4,
    name      : 'Beijinho',
    price     : 1,
    img       : './images/Pastel_de_Beijinho.png',
    images    : [
      './images/Beijinho_close1.png',
      './images/Beijinho_close2.png'
    ],
    video     : '',
    teaser    : 'Doce de coco fresco que derrete na boca.',
    desc      : 'Coco ralado hidratado em leite condensado, toque de cravo-da-índia opcional e cobertura de flocos premium de coco.',
    tech      : 'Peso: 55 g · Alergénios: lactose · Validade: 4 dias.',
    ingredients: [
      'Farinha de trigo', 'Manteiga', 'Leite condensado',
      'Coco ralado', 'Açúcar', 'Sal', 'Cravo (opcional)'
    ]
  },

  /* 5 ─ Doce de Goiaba ---------------------------------------------------- */
  {
    id        : 5,
    name      : 'Doce de Goiaba',
    price     : 1,
    img       : './images/Doce_de_Goiaba.png',
    images    : [
      './images/Goiaba_close1.png',
      './images/Goiaba_close2.png'
    ],
    video     : '',
    teaser    : 'Goiabada cremosa artesanal, pura brasilidade.',
    desc      : 'Goiabada cascão reduzida lentamente até atingir uma textura aveludada, levemente ácida, envolta pela massa folhada.',
    tech      : 'Peso: 55 g · Sem lactose · Conservar a 4 °C.',
    ingredients: [
      'Farinha de trigo', 'Manteiga', 'Goiaba vermelha',
      'Açúcar', 'Pectina natural', 'Sal', 'Sumo de limão'
    ]
  },

  /* 6 ─ Doce de Leite ----------------------------------------------------- */
  {
    id        : 6,
    name      : 'Doce de Leite',
    price     : 1,
    img       : './images/Pastel_de_Doce_de_Leite.png',
    images    : [
      './images/DoceLeite_close1.png',
      './images/DoceLeite_close2.png'
    ],
    video     : '',
    teaser    : 'Tradicional doce de leite argentino, textura sedosa.',
    desc      : 'Doce de leite cozinhado durante 4 horas para atingir cor âmbar intensa; finalizado com pitada de flor de sal para realçar o caramelo natural.',
    tech      : 'Peso: 55 g · Alergénios: lactose · Validade: 4 dias.',
    ingredients: [
      'Farinha de trigo', 'Manteiga', 'Leite integral',
      'Açúcar', 'Bicarbonato de sódio', 'Flor de sal'
    ]
  },


  /* 8 ─ Morango em Calda -------------------------------------------------- */
  {
    id        : 8,
    name      : 'Morango em Calda',
    price     : 1,
    img       : './images/Morango_em_Calda.png',
    images    : [
      './images/Morango_close1.png',
      './images/Morango_close2.png'
    ],
    video     : '',
    teaser    : 'Morangos frescos, calda rubi e aroma de baunilha.',
    desc      : 'Cubos de morango marinados em açúcar demerara e sementes de baunilha, cozidos até formar calda brilhante que contrasta com a massa crocante.',
    tech      : 'Peso: 55 g · Sem lactose · Validade: 3 dias.',
    ingredients: [
      'Farinha de trigo', 'Manteiga', 'Morango fresco',
      'Açúcar demerara', 'Baunilha', 'Sumo de limão', 'Sal'
    ]
  },

  /* 9 ─ Tapioca-Coco ------------------------------------------------------ */
  {
    id        : 9,
    name      : 'Tapioca-Coco',
    price     : 1,
    img       : './images/Tapioca.png',
    images    : [
      './images/Tapioca_close1.png',
      './images/Tapioca_close2.png'
    ],
    video     : '',
    teaser    : 'Creme leve de tapioca com leite de coco.',
    desc      : 'Pérolas de tapioca hidratadas em leite de coco e leite fresco, finalizadas com raspas de coco tostado – textura surpreendente e refrescante.',
    tech      : 'Peso: 55 g · Alergénios: lactose · Conservar a 4 °C.',
    ingredients: [
      'Farinha de trigo', 'Manteiga', 'Leite de coco',
      'Leite integral', 'Tapioca granulada', 'Açúcar', 'Sal'
    ]
  },

  /* 10 ─ Maracujá Gourmet ------------------------------------------------- */
  {
    id        : 10,
    name      : 'Maracujá',
    price     : 1,
    img       : './images/Maracuja.png',
    images    : [
      './images/Maracuja_close1.png',
      './images/Maracuja_close2.png'
    ],
    video     : '',
    teaser    : 'Curd acidulado de maracujá com sementes crocantes.',
    desc      : 'Curd artesanal feito com polpa fresca de maracujá, manteiga europeia e gemas pasteurizadas; sementes mantidas para um leve crunch e visual atraente.',
    tech      : 'Peso: 55 g · Alergénios: lactose, ovo · Validade: 3 dias.',
    ingredients: [
      'Farinha de trigo', 'Manteiga', 'Polpa de maracujá',
      'Açúcar', 'Gema de ovo', 'Sal'
    ]
  }
];

/* ---------------------------------------------------------------------------
 *  Helpers de acesso
 * ------------------------------------------------------------------------- */
export function getAllProducts () {
  return products;
}

export function getProductById (id) {
  return products.find(p => p.id === id);
}
