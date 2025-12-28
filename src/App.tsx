import { useState } from 'react';
import { useImmer } from 'use-immer';
import { AnimatePresence } from 'framer-motion';
import { CharacterCard } from './components/CharacterCard';
import { EquipmentScreen } from './components/EquipmentScreen';
import type { Character } from './types/character';
import { EquipSlot } from './types/character';
import { getCalculatedStats } from './utils/characterStats';
import { initialCharacters } from './data/characters';
import './index.css';
import styles from './App.module.css';

// ダメージを適用するアクション関数（防御力を考慮、equipmentから算出）
function applyDamage(character: Character, attackPower: number): void {
  const calculatedStats = getCalculatedStats(character.stats, character.equipment);
  const actualDamage = Math.max(0, attackPower - calculatedStats.defense);
  character.stats.hp = Math.max(0, character.stats.hp - actualDamage);
}

function App() {
  const [characters, updateCharacters] = useImmer<Character[]>(initialCharacters);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [attackPower, setAttackPower] = useState<number>(25);
  const [equipmentCharacterId, setEquipmentCharacterId] = useState<string | null>(null);

  const handleSelectCharacter = (id: string) => {
    setSelectedCharId(id);
    
    // ダメージを適用する処理
    updateCharacters((draft: Character[]) => {
      const character = draft.find((char: Character) => char.id === id);
      if (character) {
        applyDamage(character, attackPower);
        
        // HPが0以下になったら即座に削除（Framer Motionのexitアニメーションで1秒間暗く表示される）
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>キャラクターリスト</h1>
      <div className={styles.attackPowerSection}>
        <label htmlFor="attackPower" className={styles.attackPowerLabel}>
          攻撃力:
        </label>
        <input
          id="attackPower"
          type="number"
          min="0"
          value={attackPower}
          onChange={(e) => setAttackPower(Number(e.target.value) || 0)}
          className={styles.attackPowerInput}
        />
      </div>
      <div className={styles.cardList}>
        <AnimatePresence mode="popLayout">
          {characters.map(char => (
            <CharacterCard 
              key={char.id} 
              character={char} 
              onSelect={handleSelectCharacter}
              onOpenEquipment={handleOpenEquipment}
            />
          ))}
        </AnimatePresence>
      </div>
      {selectedCharId && (
        <p className={styles.selectedText}>
          現在選択中: {characters.find(c => c.id === selectedCharId)?.name}
        </p>
      )}
      {equipmentCharacter && (
        <EquipmentScreen
          character={equipmentCharacter}
          onEquip={handleEquip}
          onClose={handleCloseEquipment}
        />
      )}
    </div>
  );
}

export default App;
