import type { Armor } from '../types/character';

// id 0～2に対応するダミーのArmorデータ
export const armors: Armor[] = [
  {
    id: 0,
    name: '革の防具',
    defence: 5,
    weight: 3,
  },
  {
    id: 1,
    name: '鉄の防具',
    defence: 10,
    weight: 8,
  },
  {
    id: 2,
    name: '鋼の防具',
    defence: 15,
    weight: 15,
  },
];

