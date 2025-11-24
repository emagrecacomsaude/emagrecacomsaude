
import { GuideSection } from './types';

export const GUIDE_CONTENT: GuideSection[] = [
  // --- CAPÍTULO 1: CHÁS ---
  {
    id: 'tea-hibiscus',
    title: 'Chá de Hibisco e Canela',
    subtitle: 'Termogênico e Diurético',
    category: 'tea',
    icon: '🌺',
    content: `**Ingredientes:**
- 1 colher de sopa de hibisco seco
- 1 pau de canela
- 1 litro de água
- Suco de meio limão
- Adoçante (opcional)

**Modo de Preparo:**
1. Ferva a água com o pau de canela por cerca de 3 minutos.
2. Desligue o fogo e adicione o hibisco. Deixe em infusão (abafado) por 5 minutos.
3. Coe o chá e adicione o suco de limão e adoçante a gosto.
4. Sirva quente ou frio.`
  },
  {
    id: 'tea-green',
    title: 'Chá Verde com Gengibre',
    subtitle: 'Acelerador de Metabolismo',
    category: 'tea',
    icon: '🍵',
    content: `**Ingredientes:**
- 1 saquinho de chá verde
- Suco de meio limão
- 1 colher de chá de gengibre ralado
- Mel a gosto (opcional)

**Modo de Preparo:**
1. Ferva a água e despeje sobre o saquinho de chá verde em uma xícara.
2. Adicione o gengibre ralado e deixe em infusão por 3 a 5 minutos.
3. Em seguida, adicione o suco de limão. Se desejar, adoce com um pouco de mel.`
  },
  {
    id: 'tea-mate',
    title: 'Chá de Erva-Mate',
    subtitle: 'Energia e Foco',
    category: 'tea',
    icon: '🧉',
    content: `**Ingredientes:**
- 1 colher de sopa de erva-mate
- Água quente (não fervente)

**Modo de Preparo:**
1. Coloque a erva-mate em uma xícara ou cuia.
2. Adicione a água quente (cerca de 80°C, antes de ferver).
3. Deixe descansar por alguns minutos.
4. Se usar bomba/filtro, adicione mais água quente conforme bebe.`
  },
  {
    id: 'tea-dandelion',
    title: 'Chá de Dente-de-Leão',
    subtitle: 'Detox e Diurético',
    category: 'tea',
    icon: '🌼',
    content: `**Ingredientes:**
- 1 colher de chá de folhas secas de dente-de-leão
- Água fervente

**Modo de Preparo:**
1. Coloque as folhas em uma xícara.
2. Despeje água fervente sobre elas.
3. Deixe em infusão por cerca de 5 minutos.

**Benefícios:** Conhecido por seu potencial diurético, ajuda na eliminação de líquidos retidos e possui propriedades antioxidantes.`
  },

  // --- CAPÍTULO 2: RECEITAS RÁPIDAS ---
  {
    id: 'rec-chicken-mango',
    title: 'Salada de Frango Tropical',
    subtitle: 'Com manga e abacate',
    category: 'recipe',
    icon: '🥗',
    content: `**Ingredientes:**
- 2 peitos de frango cozidos e desfiados
- 1 manga madura em cubos
- 1 abacate maduro em cubos
- 1/2 cebola roxa fatiada
- 1/4 xícara de coentro picado
- Molho: Suco de 1 limão, 2 colheres (sopa) de azeite, sal e pimenta.

**Modo de Preparo:**
1. Em uma tigela grande, combine o frango, manga, abacate, cebola e coentro.
2. Em separado, misture o limão, azeite, sal e pimenta.
3. Despeje o molho sobre a salada e misture delicadamente.
4. Sirva sobre folhas verdes frescas.`
  },
  {
    id: 'rec-omelet',
    title: 'Omelete de Espinafre',
    subtitle: 'Proteína e Ferro',
    category: 'recipe',
    icon: '🍳',
    content: `**Ingredientes:**
- 2-3 ovos
- 1 xícara de espinafre picado
- 1/4 xícara de queijo ralado
- Azeite, sal e pimenta

**Modo de Preparo:**
1. Bata os ovos com sal e pimenta.
2. Refogue o espinafre no azeite até murchar (1-2 min).
3. Despeje os ovos sobre o espinafre.
4. Quando as bordas firmarem, adicione o queijo no centro e dobre a omelete.
5. Cozinhe até o queijo derreter.`
  },
  {
    id: 'rec-wrap',
    title: 'Wrap de Frango',
    subtitle: 'Lanche prático',
    category: 'recipe',
    icon: '🌯',
    content: `**Ingredientes:**
- 1 peito de frango cozido em tiras
- 1 tortilha integral
- Alface, tomate e cebola roxa picados
- Molho: Iogurte (ou maionese light), mostarda, sal e pimenta.

**Modo de Preparo:**
1. Misture os ingredientes do molho e espalhe na tortilha aquecida.
2. Distribua o frango e os vegetais.
3. Dobre as laterais e enrole bem apertado. Corte na diagonal para servir.`
  },
  {
    id: 'rec-grilled-salad',
    title: 'Salada de Frango Grelhado',
    subtitle: 'Com molho de iogurte',
    category: 'recipe',
    icon: '🥗',
    content: `**Ingredientes:**
- 1 peito de frango grelhado em tiras
- 2 xícaras de alface americana
- Tomates-cereja, cebola roxa e coentro
- Molho: 1/4 xícara iogurte grego, limão, azeite, sal e pimenta.

**Modo de Preparo:**
1. Misture a salada em uma tigela grande.
2. Prepare o molho emulsionando o iogurte com limão e azeite.
3. Regue a salada e sirva imediatamente.`
  },
  {
    id: 'rec-fish-veggies',
    title: 'Peixe Assado com Legumes',
    subtitle: 'Jantar leve',
    category: 'recipe',
    icon: '🐟',
    content: `**Ingredientes:**
- 2 filés de peixe branco
- Cubos de: Abobrinha, Berinjela, Pimentão
- Cebola roxa e alho
- Azeite e ervas

**Modo de Preparo:**
1. Pré-aqueça o forno a 200°C.
2. Tempere o peixe com sal, pimenta, alho e azeite.
3. Tempere os legumes picados com sal, ervas e azeite.
4. Disponha tudo em uma assadeira e asse por 20-25 minutos até dourar.`
  },
  {
    id: 'rec-salmon',
    title: 'Salmão Grelhado',
    subtitle: 'Rico em Ômega-3',
    category: 'recipe',
    icon: '🍣',
    content: `**Ingredientes:**
- 4 filés de salmão
- Molho: 1/2 xícara iogurte grego, limão, salsinha, cebolinha e manjericão.

**Modo de Preparo:**
1. Grelhe o salmão temperado com sal e pimenta até cozinhar.
2. Misture o iogurte com as ervas frescas e limão.
3. Sirva o peixe com o molho cremoso por cima.`
  },

  // --- CAPÍTULO 3: ALIMENTOS ---
  {
    id: 'food-top10',
    title: '10 Super Alimentos',
    subtitle: 'Essenciais na dieta',
    category: 'food',
    icon: '🏆',
    content: `1. **Ovos:** Proteína de alto valor biológico e saciedade.
2. **Frutas Vermelhas:** Baixas calorias e muitos antioxidantes.
3. **Folhas Verdes:** Fibras e volume sem calorias.
4. **Salmão:** Fonte de gorduras boas (ômega-3) anti-inflamatórias.
5. **Peito de Frango:** Proteína magra fundamental para músculos.
6. **Feijão:** Rico em fibras que controlam a fome.
7. **Nozes/Castanhas:** Gorduras saudáveis (consumir com moderação).
8. **Batata Doce:** Energia constante (baixo índice glicêmico).
9. **Grãos Integrais:** Aveia e quinoa para saúde intestinal.
10. **Iogurte Grego:** Cálcio e probióticos.`
  },

  // --- CAPÍTULO 4: ÁGUA ---
  {
    id: 'water-guide',
    title: 'Guia Completo da Hidratação',
    subtitle: 'Por que e quanto beber?',
    category: 'water',
    icon: '💧',
    content: `A água compõe 60% do seu corpo. Manter-se hidratado é vital para:

**Funções Principais:**
- **Termorregulação:** Mantém a temperatura corporal estável.
- **Transporte:** Leva nutrientes e oxigênio às células.
- **Detox:** Elimina toxinas via urina e suor.
- **Estética:** Pele mais elástica e jovem.
- **Intestino:** Previne constipação.

**Quanto beber?**
O ideal é **35ml a 50ml por kg** de peso.
*Exemplo: 70kg x 35ml = 2.45 Litros/dia.*
⚠️ Evite excessos (acima de 50ml/kg).

**Estratégia Matinal (O Segredo):**
Beber **600ml de água em jejum** ativa o metabolismo em até 25%, melhora a função cognitiva, energia e limpa o organismo das toxinas da noite.`
  },

  // --- CAPÍTULO 5: CAFÉ DA MANHÃ ---
  {
    id: 'breakfast-guide',
    title: 'Café da Manhã Ideal',
    subtitle: 'Sugestões gerais',
    category: 'breakfast',
    icon: '🥑',
    content: `Comece o dia com energia! Evite processados e açúcares.

**Melhores Opções:**
- **Ovos:** Mexidos, cozidos ou omelete.
- **Frutas:** Variedade (morango, banana, kiwi).
- **Iogurte Grego:** Proteína e cálcio.
- **Aveia:** Fibras para saciedade.
- **Pão Integral:** Com queijo branco ou ovos.

**Smoothies:** São ótimos para refeições rápidas. Veja as receitas abaixo!`
  },
  {
    id: 'smoothie-mango',
    title: 'Smoothie Manga e Coco',
    subtitle: 'Tropical e Cremoso',
    category: 'breakfast',
    icon: '🥭',
    content: `**Ingredientes:**
- 1 manga madura em pedaços
- 1/2 xícara de leite de coco
- 1/2 xícara de iogurte grego
- 1 colher (sopa) de mel
- Gelo a gosto

**Preparo:** Bata tudo no liquidificador até ficar cremoso. Ajuste a consistência com mais leite de coco se necessário.`
  },
  {
    id: 'smoothie-avocado',
    title: 'Smoothie Abacate e Banana',
    subtitle: 'Energia Sustentável',
    category: 'breakfast',
    icon: '🥑',
    content: `**Ingredientes:**
- 1 banana madura
- 1/2 abacate maduro
- 1 xícara de leite de amêndoa
- 1 colher (sopa) de mel
- Gelo

**Preparo:** Bata tudo até ficar homogêneo. O abacate traz gorduras boas que dão saciedade.`
  },
  {
    id: 'smoothie-strawberry',
    title: 'Smoothie Morango e Banana',
    subtitle: 'Clássico Antioxidante',
    category: 'breakfast',
    icon: '🍓',
    content: `**Ingredientes:**
- 1 banana madura
- 1 xícara de morangos frescos
- 1 xícara de leite de amêndoa
- Mel (opcional) e gelo

**Preparo:** Bata tudo. Ótimo para recuperação muscular e imunidade.`
  },
  {
    id: 'smoothie-green',
    title: 'Smoothie Verde',
    subtitle: 'Detox Total',
    category: 'breakfast',
    icon: '🍏',
    content: `**Ingredientes:**
- 1 xícara de espinafre fresco
- 1 banana
- 1 maçã verde
- 1/2 abacate
- 1 xícara de leite de amêndoa e gelo

**Preparo:** Bata bem até as folhas se desfazerem. Uma bomba de nutrientes!`
  },

  // --- CAPÍTULO 6: O QUE EVITAR ---
  {
    id: 'avoid-list',
    title: 'Alimentos para Evitar',
    subtitle: 'Sabotadores da dieta',
    category: 'avoid',
    icon: '🚫',
    content: `Para perder peso com saúde, reduza ou elimine:

1. **Bebidas Açucaradas:** Refrigerantes e sucos industrializados. Calorias vazias que causam picos de insulina.
2. **Frituras:** Inflamatórias e calóricas.
3. **Carnes Processadas:** Salsicha, bacon, presunto (excesso de sódio e conservantes).
4. **Doces e Sorvetes:** Excesso de açúcar e gordura saturada.
5. **Álcool:** Interrompe a queima de gordura e sobrecarrega o fígado.`
  },

  // --- CAPÍTULO 7: SONO ---
  {
    id: 'sleep-guide',
    title: 'Guia do Sono',
    subtitle: 'Dormir para emagrecer',
    category: 'sleep',
    icon: '😴',
    content: `Dormir bem é inegociável para a saúde física e mental.

**Benefícios do Sono:**
- **Reparação Muscular:** Ocorre regeneração de tecidos e liberação de GH (hormônio do crescimento).
- **Queima de Gordura:** Sono ruim aumenta o Cortisol (estresse) que acumula gordura abdominal.
- **Decisões Alimentares:** Quem dorme mal tem menos autocontrole e busca mais doces/fast food.

**Dicas:**
- Durma 7 a 9 horas.
- Crie uma rotina (mesmo horário para deitar).
- Evite cafeína à tarde.
- Reduza luzes e telas 1h antes de dormir.`
  },

  // --- CAPÍTULO 8: TABATA ---
  {
    id: 'tabata-intro',
    title: 'Método Tabata',
    subtitle: 'Queime gordura rápido',
    category: 'tabata',
    icon: '🔥',
    content: `**O que é?**
Treino intervalado de alta intensidade (HIIT).
- **20 segundos** de exercício MÁXIMO.
- **10 segundos** de descanso.
- **8 rounds**.
- Total: **4 minutos**.

**Benefícios:** Melhora cardiovascular, acelera o metabolismo e continua queimando calorias pós-treino.
Use o timer na aba "Tabata" deste app!`
  },

  // --- BÔNUS ---
  {
    id: 'bonus-green-juice',
    title: 'Suco Verde Detox',
    subtitle: 'Limpeza do organismo',
    category: 'bonus',
    icon: '🥬',
    content: `**Ingredientes:**
- 1 folha de couve manteiga
- Suco de 1 limão grande
- 2 rodelas de gengibre
- 1 copo de água ou água de coco
- Opcional: maçã verde e pepino

**Preparo:** Bata tudo no liquidificador com água gelada. Não precisa coar para manter as fibras.`
  },
  {
    id: 'bonus-beet-juice',
    title: 'Suco de Beterraba',
    subtitle: 'Pré-treino natural',
    category: 'bonus',
    icon: '🥤',
    content: `**Ingredientes:**
- 400ml de água gelada
- 1 beterraba grande crua
- Suco de 1 limão (com raspas da casca)
- 1 rodela de gengibre

**Preparo:** Bata tudo e beba sem coar. A beterraba melhora a vasodilatação e o desempenho físico.`
  },
];
