// Array mockado da Loja Compre Bem.
// A lista da tela consome estes dados via FlatList (Aula 06/07) — não mais com .map().
export const produtosMock = [
  {
    id: '1',
    nome: 'Cadeira Confort Plus',
    preco: 'R$ 349,90',
    categoria: 'Cadeiras',
    estoque: 12,
    descricao:
      'Cadeira giratória com encosto em tela respirável, apoio lombar ajustável e base de nylon reforçado. Suporta até 120 kg.',
    imagem: require('../assets/produto-cadeira.png'),
  },
  {
    id: '2',
    nome: 'Mesa para Escritório Compacta',
    preco: 'R$ 589,00',
    categoria: 'Mesas',
    estoque: 5,
    descricao:
      'Mesa de 120 x 60 cm em MDF revestido, com passa-cabos e pés metálicos niveláveis. Montagem sem ferramentas especiais.',
    imagem: require('../assets/produto-mesa.png'),
  },
  {
    id: '3',
    nome: 'Luminária de Mesa LED',
    preco: 'R$ 79,90',
    categoria: 'Iluminação',
    estoque: 27,
    descricao:
      'Luminária LED com três temperaturas de cor, braço articulado e entrada USB-C. Consumo de 6 W.',
    imagem: require('../assets/produto-luminaria.png'),
  },
  {
    id: '4',
    nome: 'Suporte para Notebook',
    preco: 'R$ 129,90',
    categoria: 'Acessórios',
    estoque: 18,
    descricao:
      'Suporte em alumínio com seis níveis de altura, base antiderrapante e recorte para ventilação. Compatível com telas de 11" a 17".',
    imagem: require('../assets/produto-suporte.png'),
  },
  {
    id: '5',
    nome: 'Cadeira de Reunião Fixa',
    preco: 'R$ 219,00',
    categoria: 'Cadeiras',
    estoque: 9,
    descricao:
      'Cadeira de estrutura fixa em aço, assento estofado em tecido e empilhável para até quatro unidades.',
    imagem: require('../assets/produto-cadeira.png'),
  },
  {
    id: '6',
    nome: 'Mesa de Apoio com Rodízios',
    preco: 'R$ 269,00',
    categoria: 'Mesas',
    estoque: 3,
    descricao:
      'Mesa auxiliar de 60 x 40 cm com quatro rodízios, dois deles com trava, e prateleira inferior.',
    imagem: require('../assets/produto-mesa.png'),
  },
];
