import { useState } from 'react';
import { useImmer } from 'use-immer';
import { AnimatePresence } from 'framer-motion';
import { CharacterCard } from './components/CharacterCard';
import type { Character } from './types/character';
import './index.css';
import styles from './App.module.css';

// テスト用のダミーデータ
const initialCharacters: Character[] = [
  {
    id: 'char-001',
    name: 'ヒーロー太郎',
    avatarUrl: 'https://via.placeholder.com/64/FF5733/FFFFFF?text=H',
    stats: { hp: 80, maxHp: 100, mp: 50, maxMp: 80, attack: 25, defense: 15 },
  },
  {
    id: 'char-002',
    name: '魔法使い花子',
    avatarUrl: 'https://via.placeholder.com/64/337BFF/FFFFFF?text=M',
    stats: { hp: 60, maxHp: 90, mp: 70, maxMp: 120, attack: 18, defense: 10 },
  },
  {
    id: 'char-003',
    name: '戦士の次郎',
    avatarUrl: 'https://via.placeholder.com/64/FF6B35/FFFFFF?text=W',
    stats: { hp: 120, maxHp: 150, mp: 20, maxMp: 50, attack: 35, defense: 30 },
  },
  {
    id: 'char-004',
    name: '盗賊の三郎',
    avatarUrl: 'https://via.placeholder.com/64/8B5CF6/FFFFFF?text=T',
    stats: { hp: 70, maxHp: 85, mp: 40, maxMp: 60, attack: 28, defense: 12 },
  },
  {
    id: 'char-005',
    name: '僧侶の四郎',
    avatarUrl: 'https://via.placeholder.com/64/10B981/FFFFFF?text=P',
    stats: { hp: 90, maxHp: 110, mp: 100, maxMp: 150, attack: 15, defense: 20 },
  },
  {
    id: 'char-006',
    name: '弓使いの五郎',
    avatarUrl: 'https://via.placeholder.com/64/F59E0B/FFFFFF?text=A',
    stats: { hp: 65, maxHp: 80, mp: 30, maxMp: 45, attack: 30, defense: 18 },
  },
  {
    id: 'char-007',
    name: '魔導士の六花',
    avatarUrl: 'https://via.placeholder.com/64/EC4899/FFFFFF?text=S',
    stats: { hp: 50, maxHp: 70, mp: 120, maxMp: 180, attack: 20, defense: 8 },
  },
  {
    id: 'char-008',
    name: '騎士の七海',
    avatarUrl: 'https://via.placeholder.com/64/3B82F6/FFFFFF?text=K',
    stats: { hp: 100, maxHp: 130, mp: 35, maxMp: 55, attack: 32, defense: 35 },
  },
  {
    id: 'char-009',
    name: '暗殺者の八雲',
    avatarUrl: 'https://via.placeholder.com/64/1F2937/FFFFFF?text=N',
    stats: { hp: 55, maxHp: 75, mp: 45, maxMp: 70, attack: 38, defense: 10 },
  },
  {
    id: 'char-010',
    name: '賢者の九重',
    avatarUrl: 'https://via.placeholder.com/64/6366F1/FFFFFF?text=W',
    stats: { hp: 75, maxHp: 95, mp: 110, maxMp: 160, attack: 22, defense: 25 },
  },
];

// ダメージを適用するアクション関数（防御力を考慮）
function applyDamage(character: Character, attackPower: number): void {
  const actualDamage = Math.max(0, attackPower - character.stats.defense);
  character.stats.hp = Math.max(0, character.stats.hp - actualDamage);
}

function App() {
  const [characters, updateCharacters] = useImmer<Character[]>(initialCharacters);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  const handleSelectCharacter = (id: string) => {
    setSelectedCharId(id);
    
    // ダメージを適用する処理
    updateCharacters((draft: Character[]) => {
      const character = draft.find((char: Character) => char.id === id);
      if (character) {
        applyDamage(character, 25);
        
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>キャラクターリスト</h1>
      <div className={styles.cardList}>
        <AnimatePresence mode="popLayout">
          {characters.map(char => (
            <CharacterCard 
              key={char.id} 
              character={char} 
              onSelect={handleSelectCharacter} 
            />
          ))}
        </AnimatePresence>
      </div>
      {selectedCharId && (
        <p className={styles.selectedText}>
          現在選択中: {characters.find(c => c.id === selectedCharId)?.name}
        </p>
      )}
    </div>
  );
}

export default App;
