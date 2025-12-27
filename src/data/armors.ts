import type { Armor } from '../types/character';

// id 0～2に対応するダミーのArmorデータ
export const armors: Armor[] = [
  {
    id: 0,
    name: '革の防具',
    defence: 5,
    weight: 3,
    imageUrl: 'https://img.icons8.com/color/96/shield.png',
  },
  {
    id: 1,
    name: '鉄の防具',
    defence: 10,
    weight: 8,
    imageUrl: 'https://img.icons8.com/color/96/shield.png',
  },
  {
    id: 2,
    name: '鋼の防具',
    defence: 15,
    weight: 15,
    imageUrl: 'https://img.icons8.com/color/96/shield.png',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
  },
];
