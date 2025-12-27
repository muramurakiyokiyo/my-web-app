import type { CharacterStats, Equipment, CalculatedStats } from '../types/character';
import { equipSlots, EquipPropID } from '../types/character';
import { getEquippedProperty } from './equipment';

// ステータスと装備から、最終的なステータスを算出する関数
export function getCalculatedStats(stats: CharacterStats, equipment: Equipment | undefined): CalculatedStats {
  let additionalDefense = 0;
  let additionalAttack = 0;
  let totalWeight = 0;

  // 全装備スロットをループして、各パラメータを加算
  for (const slot of equipSlots) {
    // 防御力の加算
    const defProp = getEquippedProperty(equipment, slot, EquipPropID.Defence);
    if (defProp && typeof defProp.value === 'number') {
      additionalDefense += defProp.value;
    }

    // 攻撃力の加算
    const atkProp = getEquippedProperty(equipment, slot, EquipPropID.Attack);
    if (atkProp && typeof atkProp.value === 'number') {
      additionalAttack += atkProp.value;
    }

    // 重量の加算
    const weightProp = getEquippedProperty(equipment, slot, EquipPropID.Weight);
    if (weightProp && typeof weightProp.value === 'number') {
      totalWeight += weightProp.value;
    }
  }

  return {
    hp: stats.hp,
    maxHp: stats.maxHp,
    mp: stats.mp,
    maxMp: stats.maxMp,
    attack: stats.attack + additionalAttack,
    defense: stats.baseDefense + additionalDefense,
    totalWeight: totalWeight,
  };
}

