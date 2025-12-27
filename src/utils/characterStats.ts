import type { Character, CalculatedStats } from '../types/character';
import { armors } from '../data/armors';

// Characterのstatsをequipmentから算出する関数
export function getCalculatedStats(character: Character): CalculatedStats {
  const baseStats = character.stats;
  
  // 装備による防御力の追加を計算
  let additionalDefense = 0;
  if (character.equipment?.armor !== undefined) {
    const armor = armors.find(a => a.id === character.equipment!.armor);
    if (armor) {
      additionalDefense = armor.defence;
    }
  }
  
  return {
    hp: baseStats.hp,
    maxHp: baseStats.maxHp,
    mp: baseStats.mp,
    maxMp: baseStats.maxMp,
    attack: baseStats.attack,
    defense: baseStats.baseDefense + additionalDefense,
  };
}

