// 装備品の種類
export const EquipType = {
  Weapon: 'weapon',
  Armor: 'armor',
} as const;

export type EquipType = typeof EquipType[keyof typeof EquipType];

// 装備箇所
export const EquipSlot = {
  Armor: 'armor',
  RightHandWeapon: 'rightHandWeapon',
  LeftHandWeapon: 'leftHandWeapon',
} as const;

export type EquipSlot = typeof EquipSlot[keyof typeof EquipSlot];

// すべてのEquipSlotのリスト
export const equipSlots: EquipSlot[] = [
  EquipSlot.Armor,
  EquipSlot.RightHandWeapon,
  EquipSlot.LeftHandWeapon,
];

// EquipSlotからEquipTypeを取得する関数
export function getEquipType(slot: EquipSlot): EquipType {
  if (slot === EquipSlot.Armor) {
    return EquipType.Armor;
  }
  return EquipType.Weapon;
}

// EquipSlotから表示名を取得する関数
export function getEquipSlotDisplayName(slot: EquipSlot): string {
  if (slot === EquipSlot.Armor) {
    return '防具';
  } else if (slot === EquipSlot.RightHandWeapon) {
    return '右手武器';
  } else if (slot === EquipSlot.LeftHandWeapon) {
    return '左手武器';
  }
  return '';
}

// 装備品のパラメータID
export const EquipPropID = {
  Name: 'name',
  Defence: 'defence',
  Attack: 'attack',
  Weight: 'weight',
} as const;

export type EquipPropID = typeof EquipPropID[keyof typeof EquipPropID];

// パラメータの優劣判定タイプ
export const EquipPropComparisonType = {
  Higher: 'higher', // 値が大きい方が高性能
  Lower: 'lower',   // 値が小さい方が高性能
  None: 'none',     // 優劣判定なし
} as const;

export type EquipPropComparisonType = typeof EquipPropComparisonType[keyof typeof EquipPropComparisonType];

// EquipPropIDから優劣判定タイプを取得する関数
export function getEquipPropComparisonType(propID: EquipPropID): EquipPropComparisonType {
  if (propID === EquipPropID.Name) {
    return EquipPropComparisonType.None; // 名前は優劣判定なし
  } else if (propID === EquipPropID.Weight) {
    return EquipPropComparisonType.Lower; // 重量は値が小さい方が高性能
  }
  // その他のパラメータ（防御力、攻撃力など）は値が大きい方が高性能
  return EquipPropComparisonType.Higher;
}

// 装備品のパラメータ（表示名と値）
export interface EquipProperty {
  id: EquipPropID;
  displayName: string;
  value: number | string;
}

// EquipPropIDから表示名を取得する関数
export function getEquipPropDisplayName(propID: EquipPropID): string {
  if (propID === EquipPropID.Name) {
    return '名前';
  } else if (propID === EquipPropID.Defence) {
    return '防御力';
  } else if (propID === EquipPropID.Attack) {
    return '攻撃力';
  } else if (propID === EquipPropID.Weight) {
    return '重量';
  }
  return '';
}

// EquipPropIDからCSSクラス名のキーを取得する関数
export function getEquipPropClassName(propID: EquipPropID): string {
  if (propID === EquipPropID.Name) {
    return 'equipmentItemName';
  }
  // Defence と Attack は equipmentItemStat 内で表示されるため、デフォルトは空文字
  return '';
}

// EquipPropIDから表示セクションを取得する関数
export function getEquipPropSection(propID: EquipPropID): 'header' | 'stat' {
  if (propID === EquipPropID.Name) {
    return 'header';
  }
  return 'stat';
}

// HPやMPなどのステータス（基本値、equipmentから算出される値は含まない）
export interface CharacterStats {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  baseDefense: number; // 基本防御力（装備による追加は含まない）
}

// 計算されたステータス（equipmentを含む）
export interface CalculatedStats {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  defense: number; // 基本防御力 + 装備による追加防御力
  totalWeight: number; // 装備品の総重量
}

// Armor
export interface Armor {
  id: number;
  name: string;
  defence: number;
  weight: number;
}

// Weapon
export interface Weapon {
  id: number;
  attack: number;
  name: string;
  weight: number;
}

// 装備設定
export interface Equipment {
  armor?: number; // 装備状態（ID: 0～2）
  rightHandWeapon?: number; // 右手武器（ID: 0～）
  leftHandWeapon?: number; // 左手武器（ID: 0～）
}

// キャラクター全体のデータ
export interface Character {
  id: string;
  name: string;
  avatarUrl?: string; // アバター画像はオプション
  stats: CharacterStats;
  equipment?: Equipment; // 装備状態
}

