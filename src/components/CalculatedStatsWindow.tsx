import React from 'react';
import type { CalculatedStats } from '../types/character';
import { getCalculatedStatsAsProperties } from '../utils/characterStats';
import { GamePropertyDisplay } from './GamePropertyDisplay';
import styles from './CalculatedStatsWindow.module.css';

interface CalculatedStatsWindowProps {
  calculatedStats: CalculatedStats;
  compareStats?: CalculatedStats; // 比較対象（変更前など）のステータス
}

export const CalculatedStatsWindow: React.FC<CalculatedStatsWindowProps> = ({
  calculatedStats,
  compareStats,
}) => {
  const properties = getCalculatedStatsAsProperties(calculatedStats);
  const compareProperties = compareStats ? getCalculatedStatsAsProperties(compareStats) : null;

  // 対応する比較用プロパティを取得するヘルパー
  const getCompareProperty = (propId: string) => {
    return compareProperties?.find(p => p.id === propId) || null;
  };

  return (
    <div className={styles.statsDisplay}>
      <div className={styles.statsSection}>
        <h4 className={styles.statsSectionTitle}>ステータス</h4>
        <div className={styles.statsRow}>
          {properties.map((property) => (
            <GamePropertyDisplay
              key={property.id}
              property={property}
              compareProperty={getCompareProperty(property.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

