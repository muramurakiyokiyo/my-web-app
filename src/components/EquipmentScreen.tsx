import React from 'react';
import type { Character } from '../types/character';
import { armors } from '../data/armors';
import styles from './EquipmentScreen.module.css';

interface EquipmentScreenProps {
  character: Character;
  onEquip: (armorId: number) => void;
  onClose: () => void;
}

export const EquipmentScreen: React.FC<EquipmentScreenProps> = ({ character, onEquip, onClose }) => {
  return (
    <div className={styles.equipmentScreen}>
      <div className={styles.equipmentScreenContent}>
        <div className={styles.equipmentScreenHeader}>
          <h2 className={styles.equipmentScreenTitle}>{character.name}の装備</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.characterInfo}>
          <img
            src={character.avatarUrl || "/default-avatar.png"}
            alt={character.name}
            className={styles.characterAvatar}
          />
          <div className={styles.characterStats}>
            <div>HP: {character.stats.hp} / {character.stats.maxHp}</div>
            <div>MP: {character.stats.mp} / {character.stats.maxMp}</div>
            <div>攻撃力: {character.stats.attack}</div>
            <div>基礎防御力: {character.stats.baseDefense}</div>
          </div>
        </div>

        <div className={styles.armorListSection}>
          <h3 className={styles.armorListTitle}>装備を選択</h3>
          <div className={styles.armorList}>
            {armors.map((armor) => {
              const isEquipped = character.equipment?.armor === armor.id;
              return (
                <button
                  key={armor.id}
                  className={`${styles.armorItem} ${isEquipped ? styles.armorItemEquipped : ''}`}
                  onClick={() => onEquip(armor.id)}
                >
                  <div className={styles.armorItemHeader}>
                    <div className={styles.armorItemId}>Armor ID: {armor.id}</div>
                    {isEquipped && <div className={styles.armorItemEquippedBadge}>装備中</div>}
                  </div>
                  <div className={styles.armorItemDefence}>防御力: +{armor.defence}</div>
                </button>
              );
            })}
          </div>
        </div>

        <button className={styles.backButton} onClick={onClose}>
          戻る
        </button>
      </div>
    </div>
  );
};

