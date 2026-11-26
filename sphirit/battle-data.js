const speciesData = {
  "Aivalf": {
    "element": "Fire",
    "role": "Conjurador",
    "stats": [
      76,
      122,
      3
    ],
    "skills": [
      {
        "name": "Explosão Ígnea",
        "desc": "+8 de Ataque Especial por inimigo adicional na área.",
        "element": "Fire",
        "mp": 8,
        "reach": 2
      }
    ],
    "passive": [
      "Sintonia Expansiva",
      "Receber assistência de outro aliado concede +1 tile ao alcance das especiais por 2 turnos. Reaplicar renova, sem acumular."
    ]
  },
  "Batryl": {
    "element": "Dark",
    "role": "Controlador",
    "stats": [
      94,
      118,
      2
    ],
    "skills": [
      {
        "name": "Névoa Caótica",
        "desc": "Chance baixa de causar Confusão ao interromper.",
        "element": "Dark",
        "mp": 8,
        "reach": 2
      }
    ],
    "passive": [
      "Oportunista Elétrico",
      "Causa +0,5× de dano em inimigos paralisados."
    ]
  },
  "Bolturk": {
    "element": "Thunder",
    "role": "Duelista",
    "stats": [
      80,
      52,
      3
    ],
    "skills": [
      {
        "name": "Garras Tempestuosas",
        "desc": "Chance baixa de paralisar.",
        "element": "Thunder",
        "mp": 8,
        "reach": 1
      }
    ],
    "passive": [
      "Amparo Revigorante",
      "Após assistência, o próximo ataque básico ou especial que causar dano cura o aliado em 8 de Vida, uma vez. Não acumula; preparação dura até o uso ou fim da batalha."
    ]
  },
  "Ignithar": {
    "element": "Fire",
    "role": "Conjurador",
    "stats": [
      70,
      127,
      2
    ],
    "skills": [
      {
        "name": "Lança-Chamas",
        "desc": "+8 de Ataque Especial durante o dano se atingir mais de um inimigo.",
        "element": "Fire",
        "mp": 6,
        "reach": 3
      }
    ],
    "passive": [
      "Eco Purificador",
      "Remover controle de aliado concede chance alta de aplicar o mesmo controle na próxima habilidade dele."
    ]
  },
  "Lumibun": {
    "element": "Light",
    "role": "Suporte",
    "stats": [
      83,
      107,
      3
    ],
    "skills": [
      {
        "name": "Purificação Radiante",
        "desc": "Cura 16 de Vida e remove um controle de grupo.",
        "element": "Light",
        "mp": 6,
        "reach": 2
      }
    ],
    "passive": [
      "Pressão Incapacitante",
      "Reduzir um atributo inimigo reduz Movimentação em 1 por 1 turno do alvo. Reaplicar renova, sem acumular."
    ]
  },
  "Mumbra": {
    "element": "Dark",
    "role": "Suporte",
    "stats": [
      87,
      112,
      2
    ],
    "skills": [
      {
        "name": "Maldição Paralisante",
        "desc": "Concede chance moderada de causar Paralisia na próxima habilidade de um aliado.",
        "element": "Dark",
        "mp": 6,
        "reach": 3
      }
    ],
    "passive": [
      "Pacto de Mana",
      "Após assistência, a próxima especial ofensiva do aliado rouba até 4 de Mana no total, limitada à Mana disponível dos inimigos vivos e ao espaço de Mana do aliado. Não acumula; preparação dura até o uso ou fim da batalha."
    ]
  },
  "Rosalys": {
    "element": "Forest",
    "role": "Suporte",
    "stats": [
      80,
      105,
      3
    ],
    "skills": [
      {
        "name": "Bênção da Natureza",
        "desc": "Cura 16 de Vida e aumenta Ataque Especial em 8.",
        "element": "Forest",
        "mp": 6,
        "reach": 2
      }
    ],
    "passive": [
      "Ruptura Persistente",
      "Flinch tem chance moderada de desativar a habilidade até o fim do próximo turno."
    ]
  },
  "Serpyron": {
    "element": "Fire",
    "role": "Conjurador",
    "stats": [
      68,
      133,
      2
    ],
    "skills": [
      {
        "name": "Queimadura Explosiva",
        "desc": "Chance baixa de Queimadura; moderada se atingir mais de um inimigo.",
        "element": "Fire",
        "mp": 10,
        "reach": 2
      }
    ],
    "passive": [
      "Impacto de Colisão",
      "Causa metade do dano original adicional quando o empurrão de uma especial colide com obstáculo."
    ]
  },
  "Sidralin": {
    "element": "Water",
    "role": "Controlador",
    "stats": [
      75,
      137,
      2
    ],
    "skills": [
      {
        "name": "Maré Enfraquecedora",
        "desc": "Chance moderada de reduzir Ataque Especial em 12 até o fim do próximo turno.",
        "element": "Water",
        "mp": 6,
        "reach": 3
      }
    ],
    "passive": [
      "Oportunista Elétrico",
      "Causa +0,5× de dano em inimigos paralisados."
    ]
  },
  "Velarion": {
    "element": "Wind",
    "role": "Conjurador",
    "stats": [
      87,
      150,
      3
    ],
    "skills": [
      {
        "name": "Vendaval Cortante",
        "desc": "Dano de Vento em cruz, sem efeito secundário.",
        "element": "Wind",
        "mp": 10,
        "reach": 3
      }
    ],
    "passive": [
      "Impacto de Colisão",
      "Causa metade do dano original adicional quando o empurrão de uma especial colide com obstáculo."
    ]
  },
  "Whirlven": {
    "element": "Wind",
    "role": "Controlador",
    "stats": [
      70,
      130,
      2
    ],
    "skills": [
      {
        "name": "Rajada Impetuosa",
        "desc": "Chance moderada de empurrar 1 tile na direção do ataque.",
        "element": "Wind",
        "mp": 8,
        "reach": 3
      }
    ],
    "passive": [
      "Euforia Caótica",
      "Causar Confusão em inimigo concede +8 de Ataque Especial por 2 turnos do portador. Reaplicar renova, sem acumular."
    ]
  }
};
const cardData = {
  "RusticArmor": {
    "name": "Armadura Rústica",
    "desc": "Aumenta Defesa em 12 temporariamente. Dura 2 turnos do alvo.",
    "kind": 0,
    "reach": 2,
    "area": 0,
    "size": 1,
    "target": 1,
    "elements": []
  },
  "VolcanicEruption": {
    "name": "Erupção Vulcânica",
    "desc": "Na área, Fogo recebe +12 de Ataque e Floresta −12 de Ataque.",
    "kind": 2,
    "reach": 2,
    "area": 2,
    "size": 1,
    "target": 1,
    "elements": [
      "Fire",
      "Forest"
    ]
  },
  "ReflectorShield": {
    "name": "Escudo Refletor",
    "desc": "Reflete o próximo ataque recebido na casa protegida a um inimigo dentro do alcance 2 da carta.",
    "kind": 1,
    "reach": 2,
    "area": 0,
    "size": 1,
    "target": 1,
    "elements": []
  },
  "CobaltEssence": {
    "name": "Essência Cobalto",
    "desc": "Recupera 12 de Mana de um aliado.",
    "kind": 0,
    "reach": 2,
    "area": 0,
    "size": 1,
    "target": 1,
    "elements": []
  },
  "VitalLeaf": {
    "name": "Folha Vital",
    "desc": "Recupera 10 de Vida de um aliado.",
    "kind": 0,
    "reach": 2,
    "area": 0,
    "size": 1,
    "target": 1,
    "elements": []
  },
  "RisingBlade": {
    "name": "Lâmina Crescente",
    "desc": "Aumenta Ataque em 12 temporariamente. Dura 2 turnos do alvo.",
    "kind": 0,
    "reach": 2,
    "area": 0,
    "size": 1,
    "target": 1,
    "elements": []
  },
  "AegisBreaker": {
    "name": "Quebra-Aegis",
    "desc": "Reduz Defesa inimiga em 12 temporariamente. Dura 2 turnos do alvo.",
    "kind": 0,
    "reach": 2,
    "area": 0,
    "size": 1,
    "target": 0,
    "elements": []
  },
  "PurifyingRemedy": {
    "name": "Remédio Purificador",
    "desc": "Remove todos os status negativos do alvo aliado.",
    "kind": 0,
    "reach": 2,
    "area": 0,
    "size": 1,
    "target": 1,
    "elements": []
  },
  "DivineBreath": {
    "name": "Sopro Divino",
    "desc": "Revive um aliado abatido com 30 de Vida, limitado à Vida máxima, em uma casa livre do tabuleiro.",
    "kind": 0,
    "reach": 2,
    "area": 0,
    "size": 1,
    "target": 1,
    "elements": []
  }
};
const skillEnglish = {
  Aivalf:["Fiery Explosion","+8 Special Attack per additional enemy in the area."],
  Batryl:["Chaotic Mist","Low chance to confuse an enemy when interrupting it."],
  Bolturk:["Storm Claws","Low chance to paralyze the target."],
  Ignithar:["Flamethrower","+8 Special Attack when the attack hits multiple enemies."],
  Lumibun:["Radiant Purification","Restores 16 HP and removes one crowd-control effect."],
  Mumbra:["Paralyzing Curse","An ally’s next skill has a moderate chance to inflict paralysis."],
  Rosalys:["Nature’s Blessing","Restores 16 HP and raises Special Attack by 8."],
  Serpyron:["Explosive Burn","Low chance to burn. The chance becomes moderate when hitting multiple enemies."],
  Sidralin:["Weakening Tide","Moderate chance to lower Special Attack by 12 until the end of the next turn."],
  Velarion:["Cutting Gale","Deals wind damage in a cross-shaped area."],
  Whirlven:["Forceful Gust","Moderate chance to push the target one tile in the direction of the attack."]
};
const passiveEnglish = {
  "Sintonia Expansiva":["Expanding Resonance","Receiving assistance from an ally adds one tile to special skill range for two turns. Reapplying refreshes the duration."],
  "Oportunista Elétrico":["Electric Opportunist","Deals an extra 50% damage to paralyzed enemies."],
  "Amparo Revigorante":["Invigorating Aid","After assistance, the ally’s next damaging attack restores 8 HP to that ally. The effect lasts until used or the battle ends and does not stack."],
  "Eco Purificador":["Cleansing Echo","Removing crowd control from an ally gives their next skill a high chance to inflict the same effect."],
  "Pressão Incapacitante":["Crippling Pressure","Lowering an enemy stat reduces its movement by one for one turn. Reapplying refreshes the duration."],
  "Pacto de Mana":["Mana Pact","After assistance, the ally’s next offensive special steals up to 4 MP in total, limited by available enemy MP and the ally’s missing MP. Lasts until used or the battle ends and does not stack."],
  "Ruptura Persistente":["Lingering Rupture","Flinch has a moderate chance to disable the skill until the end of the next turn."],
  "Impacto de Colisão":["Collision Impact","Pushing a target into an obstacle with a special deals an extra half of the original damage."],
  "Euforia Caótica":["Chaotic Euphoria","Confusing an enemy raises Special Attack by 8 for two of the holder’s turns. Reapplying refreshes the duration."]
};
const cardEnglish = {
  RusticArmor:"Raises an ally’s Defense by 12 for two of its turns.",
  VolcanicEruption:"Fire gains 12 Attack and Forest loses 12 Attack inside the affected area.",
  ReflectorShield:"Reflects the next attack received on the protected tile onto an enemy within two tiles.",
  CobaltEssence:"Restores 12 MP to an ally.", VitalLeaf:"Restores 10 HP to an ally.",
  RisingBlade:"Raises an ally’s Attack by 12 for two of its turns.",
  AegisBreaker:"Lowers an enemy’s Defense by 12 for two of its turns.",
  PurifyingRemedy:"Removes all negative status effects from an ally.",
  DivineBreath:"Revives a fallen ally on an empty tile with 30 HP, up to its maximum HP."
};
