import type { EquipType, EquipSlot, Armor, Weapon, Equipment } from '../types/character';
import { armors } from '../data/armors';
import { weapons } from '../data/weapons';

// EquipTypeから装備品リストを取得する関数
export function getEquipmentList(type: EquipType): Armor[] | Weapon[] {
  if (type === 'armor') {
    return armors;
  }
  return weapons;
}

// EquipSlotから装備されているIDを取得する関数
export function getEquippedId(equipment: Equipment | undefined, slot: EquipSlot): number | undefined {
  if (!equipment) return undefined;
  
  if (slot === 'armor') {
    return equipment.armor;
  } else if (slot === 'rightHandWeapon') {
    return equipment.rightHandWeapon;
  } else if (slot === 'leftHandWeapon') {
    return equipment.leftHandWeapon;
  }
  return undefined;
}

