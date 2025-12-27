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

// ゲーム内のパラメータID（装備品とキャラクターステータスを統合）
export const GamePropID = {
  // 装備品のパラメータ
  Name: 'name',
  Defence: 'defence',
  Attack: 'attack',
  Weight: 'weight',
  // キャラクターのステータス
  HP: 'hp',
  MaxHP: 'maxHp',
  MP: 'mp',
  MaxMP: 'maxMp',
  Defense: 'defense',
  TotalWeight: 'totalWeight',
} as const;

export type GamePropID = typeof GamePropID[keyof typeof GamePropID];

// 後方互換性のため、EquipPropIDをGamePropIDのエイリアスとして定義
export const EquipPropID = GamePropID;
export type EquipPropID = GamePropID;

// パラメータの優劣判定タイプ
export const EquipPropComparisonType = {
  Higher: 'higher', // 値が大きい方が高性能
  Lower: 'lower',   // 値が小さい方が高性能
  None: 'none',     // 優劣判定なし
} as const;

export type EquipPropComparisonType = typeof EquipPropComparisonType[keyof typeof EquipPropComparisonType];

// GamePropIDの仕様
interface GamePropSpec {
  displayName: string;
  comparisonType: EquipPropComparisonType;
  className: string; // CSSクラス名のキー
  section: 'header' | 'stat'; // 表示セクション
}

// GamePropIDに対応する仕様テーブル
const gamePropSpecs: Record<GamePropID, GamePropSpec> = {
  // 装備品のパラメータ
  [GamePropID.Name]: {
    displayName: '名前',
    comparisonType: EquipPropComparisonType.None,
    className: 'equipmentItemName',
    section: 'header',
  },
  [GamePropID.Defence]: {
    displayName: '防御力',
    comparisonType: EquipPropComparisonType.Higher,
    className: '',
    section: 'stat',
  },
  [GamePropID.Attack]: {
    displayName: '攻撃力',
    comparisonType: EquipPropComparisonType.Higher,
    className: '',
    section: 'stat',
  },
  [GamePropID.Weight]: {
    displayName: '重量',
    comparisonType: EquipPropComparisonType.Lower,
    className: '',
    section: 'stat',
  },
  // キャラクターのステータス
  [GamePropID.HP]: {
    displayName: 'HP',
    comparisonType: EquipPropComparisonType.Higher,
    className: '',
    section: 'stat',
  },
  [GamePropID.MaxHP]: {
    displayName: '最大HP',
    comparisonType: EquipPropComparisonType.Higher,
    className: '',
    section: 'stat',
  },
  [GamePropID.MP]: {
    displayName: 'MP',
    comparisonType: EquipPropComparisonType.Higher,
    className: '',
    section: 'stat',
  },
  [GamePropID.MaxMP]: {
    displayName: '最大MP',
    comparisonType: EquipPropComparisonType.Higher,
    className: '',
    section: 'stat',
  },
  [GamePropID.Defense]: {
    displayName: '防御力',
    comparisonType: EquipPropComparisonType.Higher,
    className: '',
    section: 'stat',
  },
  [GamePropID.TotalWeight]: {
    displayName: '総重量',
    comparisonType: EquipPropComparisonType.Lower,
    className: '',
    section: 'stat',
  },
};

// GamePropIDから仕様を一括取得する関数
export function getGamePropSpec(propID: GamePropID): GamePropSpec {
  return gamePropSpecs[propID];
}

// 後方互換性のため、EquipPropSpecをGamePropSpecのエイリアスとして定義
export type EquipPropSpec = GamePropSpec;
export function getEquipPropSpec(propID: EquipPropID): EquipPropSpec {
  return getGamePropSpec(propID);
}

// ゲーム内のパラメータ（表示名と値）
export interface GameProperty {
  id: GamePropID;
  spec: GamePropSpec; // GamePropIDの仕様
  value: number | string;
}

// 後方互換性のため、EquipPropertyをGamePropertyのエイリアスとして定義
export type EquipProperty = GameProperty;

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
  imageUrl?: string; // 装備品の画像URL
}

// Weapon
export interface Weapon {
  id: number;
  attack: number;
  name: string;
  weight: number;
  imageUrl?: string; // 装備品の画像URL
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

