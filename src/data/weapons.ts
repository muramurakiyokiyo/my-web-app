import type { Weapon } from '../types/character';

// ダミーのWeaponデータ
export const weapons: Weapon[] = [
  {
    id: 0,
    name: '木の剣',
    attack: 5,
    weight: 2,
    imageUrl: 'https://img.icons8.com/color/96/sword.png',
  },
  {
    id: 1,
    name: '鉄の剣',
    attack: 10,
    weight: 5,
    imageUrl: 'https://img.icons8.com/color/96/sword.png',
  },
  {
    id: 2,
    name: '鋼の剣',
    attack: 15,
    weight: 8,
    imageUrl: 'https://img.icons8.com/color/96/sword.png',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb',
  },
  {
    id: 3,
    name: '魔法の杖',
    attack: 8,
    weight: 3,
    imageUrl: 'https://img.icons8.com/color/96/sword.png',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb',
  },
  {
    id: 4,
    name: '短剣',
    attack: 7,
    weight: 1,
    imageUrl: 'https://img.icons8.com/color/96/sword.png',
  },
];
