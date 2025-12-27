// HPやMPなどのステータス
interface CharacterStats {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  defense: number;
}

// キャラクター全体のデータ
export interface Character {
  id: string;
  name: string;
  avatarUrl?: string; // アバター画像はオプション
  stats: CharacterStats;
}

