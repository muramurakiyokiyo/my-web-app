import React from 'react';
import type { GameProperty } from '../types/character';
import { EquipPropComparisonType } from '../types/character';
import styles from './GamePropertyDisplay.module.css';

interface GamePropertyDisplayProps {
  property: GameProperty;
  compareProperty?: GameProperty | null; // 比較対象のプロパティ（優劣表示用）
}

export const GamePropertyDisplay: React.FC<GamePropertyDisplayProps> = ({ property, compareProperty }) => {
  // 優劣判定に基づいて色を決定する関数
  const getValueColorClass = (): string => {
    if (!compareProperty || typeof property.value !== 'number' || typeof compareProperty.value !== 'number') {
      return styles.propertyValue;
    }

    const currentValue = property.value;
    const compareValue = compareProperty.value;
    const comparisonType = property.spec.comparisonType;

    // 優劣判定なしの場合は色分けしない
    if (comparisonType === EquipPropComparisonType.None) {
      return styles.propertyValue;
    }

    // 優劣判定タイプに基づいて色を決定
    if (comparisonType === EquipPropComparisonType.Lower) {
      // 値が小さい方が高性能
      if (currentValue < compareValue) {
        return `${styles.propertyValue} ${styles.propertyValueHigher}`; // 小さい = 良い = 青
      } else if (currentValue > compareValue) {
        return `${styles.propertyValue} ${styles.propertyValueLower}`; // 大きい = 悪い = 赤
      }
    } else {
      // 値が大きい方が高性能
      if (currentValue > compareValue) {
        return `${styles.propertyValue} ${styles.propertyValueHigher}`; // 大きい = 良い = 青
      } else if (currentValue < compareValue) {
        return `${styles.propertyValue} ${styles.propertyValueLower}`; // 小さい = 悪い = 赤
      }
    }
    return styles.propertyValue;
  };

  const valueColorClass = getValueColorClass();
  const displayValue = typeof property.value === 'number' ? `+${property.value}` : property.value;

  return (
    <div className={styles.propertyItem}>
      <span className={styles.propertyLabel}>{property.spec.displayName}:</span>
      <span className={valueColorClass}>
        {displayValue}
      </span>
    </div>
  );
};

