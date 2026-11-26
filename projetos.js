function carta(id, titulo, efeito) {
  const base = "./midias/cartas/" + id;
  return { tipo: "gif", titulo, efeito, icone: base + "-carta.png", poster: base + ".png", arquivo: base + ".gif", alt: efeito };
}
const jogos = [
  { id:"vigilia", trailer:"./midias/vigilia.webm", jornada:["A travessia do vale","Ao cair da tarde, a torre ainda brilha entre os pinheiros. Ilumine o caminho, alcance a próxima casa com o gancho e lance uma brasa até o sinal distante."], modos:["Reconhecimento","Travessia","Lançamento"], bastidores:["Uma luz legível no escuro","A lanterna usa uma silhueta larga e um núcleo claro. No tabuleiro, o mesmo dourado se espalha pelo chão para mostrar o alcance do item."], nome:"Vigília", genero:"Exploração", capa:"./midias/vigilia.png", descricao:"Ferramentas de campo para explorar o vale.", midias:[
    carta("lanterna","Lanterna","O clarão se expande a partir do explorador e revela o alvo na penumbra."),
    carta("gancho","Gancho","O cabo prende no alvo e puxa o explorador até a outra ponta do tabuleiro."),
    carta("brasa","Brasa","Uma chama cruza a arena em arco e acende o alvo ao chegar.")
  ]},
  { id:"mare", trailer:"./midias/mare.webm", jornada:["Ecos da maré","Lance um sinal pela superfície, marque a posição encontrada e envolva o explorador em uma cúpula de energia."], modos:["Sondagem","Ancoragem","Proteção"], bastidores:["O ritmo das ondas","Os anéis da concha crescem em tempos diferentes. A repetição permite acompanhar a direção da onda mesmo em uma captura pequena."], nome:"Maré baixa", genero:"Marés", capa:"./midias/mare.png", descricao:"Relíquias que alteram o ritmo da maré.", midias:[
    carta("concha","Concha","Ondas de sonar partem da concha e sinalizam a posição do alvo."),
    carta("ancora","Âncora","A âncora cai sobre a casa marcada e prende o alvo."),
    carta("perola","Pérola","Uma cúpula envolve o explorador enquanto a energia se espalha pela superfície.")
  ]},
  { id:"umbra", trailer:"./midias/umbra.webm", jornada:["A passagem violeta","Divida a luz pelo vale, marque a casa de destino e atravesse o espaço entre dois portais."], modos:["Refração","Marcação","Transporte"], bastidores:["Luz em três direções","A silhueta facetada do prisma reaparece no efeito. Três raios divergem no tabuleiro para tornar visível a área alcançada."], nome:"Umbra", genero:"Magia", capa:"./midias/umbra.png", descricao:"Artefatos que manipulam luz e espaço.", midias:[
    carta("prisma","Prisma","O feixe se divide em três raios e alcança casas vizinhas."),
    carta("runa","Runa","Um selo cresce sob o alvo e marca sua casa."),
    carta("portal","Portal","Dois portais se abrem. O explorador entra no primeiro e reaparece no outro.")
  ]}
];


