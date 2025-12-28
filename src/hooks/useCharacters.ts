import { useState } from 'react';
import { useImmer } from 'use-immer';
import type { Character } from '../types/character';
import { EquipSlot } from '../types/character';
import { initialCharacters } from '../data/characters';
import { getCalculatedStats } from '../utils/characterStats';

// ダメージを適用するアクション関数（防御力を考慮、equipmentから算出）
function applyDamage(character: Character, attackPower: number): void {
  const calculatedStats = getCalculatedStats(character.stats, character.equipment);
  const actualDamage = Math.max(0, attackPower - calculatedStats.defense);
  character.stats.hp = Math.max(0, character.stats.hp - actualDamage);
}

export function useCharacters(attackPower: number) {
  const [characters, updateCharacters] = useImmer<Character[]>(initialCharacters);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [equipmentCharacterId, setEquipmentCharacterId] = useState<string | null>(null);

  const handleSelectCharacter = (id: string) => {
    setSelectedCharId(id);
    
    // ダメージを適用する処理
    updateCharacters((draft: Character[]) => {
      const character = draft.find((char: Character) => char.id === id);
      if (character) {
        applyDamage(character, attackPower);
        
        // HPが0以下になったら即座に削除
        if (character.stats.hp <= 0) {
          const index = draft.findIndex((c: Character) => c.id === id);
          if (index !== -1) {
            draft.splice(index, 1);
          }
          
          // 選択中のキャラクターが削除された場合、選択を解除
          if (selectedCharId === id) {
            setSelectedCharId(null);
          }
        }
      }
    });
  };

  const handleOpenEquipment = (characterId: string) => {
    setEquipmentCharacterId(characterId);
  };

  const handleCloseEquipment = () => {
    setEquipmentCharacterId(null);
  };

  const handleEquip = (type: EquipSlot, id: number) => {
    if (!equipmentCharacterId) return;
    
    updateCharacters((draft: Character[]) => {
      const character = draft.find((char: Character) => char.id === equipmentCharacterId);
      if (character) {
        // 装備を初期化していない場合は初期化
        if (!character.equipment) {
          character.equipment = {};
        }
        
        // 選択した装備を設定
        if (type === EquipSlot.Armor) {
          character.equipment.armor = id;
        } else if (type === EquipSlot.RightHandWeapon) {
          character.equipment.rightHandWeapon = id;
        } else if (type === EquipSlot.LeftHandWeapon) {
          character.equipment.leftHandWeapon = id;
        }
      }
    });
  };

  const equipmentCharacter = equipmentCharacterId 
    ? characters.find(c => c.id === equipmentCharacterId)
    : null;

  return {
    characters,
    selectedCharId,
    equipmentCharacter,
    handleSelectCharacter,
    handleOpenEquipment,
    handleCloseEquipment,
    handleEquip,
  };
}

