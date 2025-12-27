// HPやMPなどのステータス（基本値、equipmentから算出される値は含まない）
interface CharacterStats {
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
}

// Armor
export interface Armor {
  id: number;
  defence: number;
}

// 装備設定
export interface Equipment {
  armor?: number; // 装備状態（ID: 0～2）
}

// キャラクター全体のデータ
export interface Character {
  id: string;
  name: string;
  avatarUrl?: string; // アバター画像はオプション
  stats: CharacterStats;
  equipment?: Equipment; // 装備状態
}

