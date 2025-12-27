import React from 'react';
import type { CalculatedStats, CharacterStats } from '../types/character';
import styles from './CalculatedStatsWindow.module.css';

interface CalculatedStatsWindowProps {
  calculatedStats: CalculatedStats;
  baseStats: CharacterStats;
}

export const CalculatedStatsWindow: React.FC<CalculatedStatsWindowProps> = ({
  calculatedStats,
  baseStats,
}) => {
  return (
    <div className={styles.statsDisplay}>
      <div className={styles.statsSection}>
        <h4 className={styles.statsSectionTitle}>現在のステータス</h4>
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>HP:</span>
            <span className={styles.statValue}>{calculatedStats.hp} / {calculatedStats.maxHp}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>MP:</span>
            <span className={styles.statValue}>{calculatedStats.mp} / {calculatedStats.maxMp}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>攻撃力:</span>
            <span className={styles.statValue}>{calculatedStats.attack}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>防御力:</span>
            <span className={styles.statValue}>{calculatedStats.defense}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>総重量:</span>
            <span className={styles.statValue}>{calculatedStats.totalWeight}</span>
          </div>
        </div>
      </div>
      <div className={styles.statsSection}>
        <h4 className={styles.statsSectionTitle}>基礎ステータス</h4>
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>HP:</span>
            <span className={styles.statValue}>{baseStats.hp} / {baseStats.maxHp}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>MP:</span>
            <span className={styles.statValue}>{baseStats.mp} / {baseStats.maxMp}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>攻撃力:</span>
            <span className={styles.statValue}>{baseStats.attack}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>基礎防御力:</span>
            <span className={styles.statValue}>{baseStats.baseDefense}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

