import { useState } from 'react';
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
];

function App() {
  const [characters] = useState<Character[]>(initialCharacters);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  const handleSelectCharacter = (id: string) => {
    setSelectedCharId(id);
    alert(`選択されたキャラクター: ${characters.find(c => c.id === id)?.name}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>キャラクターリスト</h1>
      <div className={styles.cardList}>
        {characters.map(char => (
          <CharacterCard 
            key={char.id} 
            character={char} 
            onSelect={handleSelectCharacter} 
          />
        ))}
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
