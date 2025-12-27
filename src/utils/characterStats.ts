import type { Character, CalculatedStats } from '../types/character';
import { equipSlots, EquipPropID } from '../types/character';
import { armors } from '../data/armors';
import { weapons } from '../data/weapons';
import { getEquippedProperty } from './equipment';

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
  
  // 装備による攻撃力の追加を計算
  let additionalAttack = 0;
  if (character.equipment?.rightHandWeapon !== undefined) {
    const weapon = weapons.find(w => w.id === character.equipment!.rightHandWeapon);
    if (weapon) {
      additionalAttack += weapon.attack;
    }
  }
  if (character.equipment?.leftHandWeapon !== undefined) {
    const weapon = weapons.find(w => w.id === character.equipment!.leftHandWeapon);
    if (weapon) {
      additionalAttack += weapon.attack;
    }
  }
  
  // 装備品の総重量を計算（EquipSlotリストとEquipPropID.Weightを使用）
  let totalWeight = 0;
  for (const slot of equipSlots) {
    const weightProperty = getEquippedProperty(character.equipment, slot, EquipPropID.Weight);
    if (weightProperty && typeof weightProperty.value === 'number') {
      totalWeight += weightProperty.value;
    }
  }
  
  return {
    hp: baseStats.hp,
    maxHp: baseStats.maxHp,
    mp: baseStats.mp,
    maxMp: baseStats.maxMp,
    attack: baseStats.attack + additionalAttack,
    defense: baseStats.baseDefense + additionalDefense,
    totalWeight: totalWeight,
  };
}

