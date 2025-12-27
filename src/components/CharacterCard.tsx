import React from 'react';
import { motion } from 'framer-motion';
import type { Character } from '../types/character';
import { getCalculatedStats } from '../utils/characterStats';
import { armors } from '../data/armors';
import { HPBar } from './HPBar';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: Character;
  onSelect?: (id: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  const calculatedStats = getCalculatedStats(character);
  const borderClass = character.stats.hp < character.stats.maxHp * 0.2 
    ? styles.cardBorderDanger 
    : styles.cardBorderNormal;
  const isDead = character.stats.hp <= 0;
  
  // 防御力の表示用（baseDefense + armor.defence）
  const baseDefense = character.stats.baseDefense;
  const armorDefense = character.equipment?.armor !== undefined
    ? armors.find(a => a.id === character.equipment!.armor)?.defence || 0
    : 0;
  const defenseDisplay = armorDefense > 0 
    ? `${baseDefense}+${armorDefense}` 
    : `${baseDefense}`;

  return (
    <motion.div 
      className={`${styles.card} ${borderClass} ${isDead ? styles.cardDead : ''}`}
      onClick={() => onSelect && onSelect(character.id)}
      initial={{ opacity: 1 }}
      animate={{ opacity: isDead ? 0.5 : 1 }}
      exit={{ 
        opacity: 0,
        scale: 0.8,
        filter: 'grayscale(100%)',
        transition: { duration: 1 }
      }}
      layout
    >
      {/* アバター部分 */}
      <div className={styles.avatarSection}>
        <img 
          src={character.avatarUrl || "/default-avatar.png"} 
          alt={character.name} 
          className={styles.avatar}
        />
        <h2 className={styles.characterName}>{character.name}</h2>
      </div>

      {/* HPバーとMPバー */}
      <div className={styles.statsSection}>
        <div className={styles.statRow}>
          <span>HP</span>
          <span>{character.stats.hp} / {character.stats.maxHp}</span>
        </div>
        <HPBar current={character.stats.hp} max={character.stats.maxHp} color="green" />
        
        <div className={styles.statRowWithMargin}>
          <span>MP</span>
          <span>{character.stats.mp} / {character.stats.maxMp}</span>
        </div>
        <HPBar current={character.stats.mp} max={character.stats.maxMp} color="blue" />
      </div>

      {/* その他のステータス */}
      <div className={styles.otherStats}>
        <div>攻撃力: <span className={styles.statValue}>{calculatedStats.attack}</span></div>
        <div>防御力: <span className={styles.statValue}>{defenseDisplay}</span></div>
        {character.equipment?.armor !== undefined && (
          <div>Armor ID: <span className={styles.statValue}>{character.equipment.armor}</span></div>
        )}
      </div>
    </motion.div>
  );
};

