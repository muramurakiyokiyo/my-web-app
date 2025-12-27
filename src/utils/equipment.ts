import type { EquipType, EquipSlot, Armor, Weapon, Equipment, EquipPropID, EquipProperty } from '../types/character';
import { EquipPropID as EquipPropIDConst, getEquipPropDisplayName } from '../types/character';
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

// EquipSlotから装備されているアイテムを取得する関数
export function getEquippedItem(equipment: Equipment | undefined, slot: EquipSlot): Armor | Weapon | null {
  const equippedId = getEquippedId(equipment, slot);
  if (equippedId === undefined) return null;
  
  if (slot === 'armor') {
    return armors.find(a => a.id === equippedId) || null;
  } else {
    return weapons.find(w => w.id === equippedId) || null;
  }
}

// 装備品からEquipPropIDリストを取得する関数
export function getEquipPropIDs(item: Armor | Weapon): EquipPropID[] {
  if ('defence' in item) {
    return [EquipPropIDConst.Defence];
  } else if ('attack' in item) {
    return [EquipPropIDConst.Attack];
  }
  return [];
}

// 装備品からEquipPropIDを指定してEquipPropertyを取得する関数
export function getEquipProperty(item: Armor | Weapon, propID: EquipPropID): EquipProperty | null {
  if (propID === EquipPropIDConst.Defence && 'defence' in item) {
    return {
      id: propID,
      displayName: getEquipPropDisplayName(propID),
      value: (item as Armor).defence,
    };
  } else if (propID === EquipPropIDConst.Attack && 'attack' in item) {
    return {
      id: propID,
      displayName: getEquipPropDisplayName(propID),
      value: (item as Weapon).attack,
    };
  }
  return null;
}

