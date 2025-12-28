import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CharacterCard } from './components/CharacterCard';
import { EquipmentScreen } from './components/EquipmentScreen';
import { useCharacters } from './hooks/useCharacters';
import './index.css';
import styles from './App.module.css';

function App() {
  const [attackPower, setAttackPower] = useState<number>(25);
  
  const {
    characters,
    selectedCharId,
    equipmentCharacter,
    handleSelectCharacter,
    handleOpenEquipment,
    handleCloseEquipment,
    handleEquip,
  } = useCharacters(attackPower);

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
