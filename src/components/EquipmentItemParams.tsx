import React from 'react';
import type { Armor, Weapon } from '../types/character';
import { EquipPropID, getEquipPropSection, getEquipPropComparisonType, EquipPropComparisonType } from '../types/character';
import { getEquipPropIDs, getEquipProperty } from '../utils/equipment';
import styles from './EquipmentItemParams.module.css';

interface EquipmentItemParamsProps {
  item: Armor | Weapon | null;
  equippedItem?: Armor | Weapon | null;
}

export const EquipmentItemParams: React.FC<EquipmentItemParamsProps> = ({ item, equippedItem }) => {
  if (!item) {
    return (
      <div className={styles.paramsContainer}>
        <div className={styles.paramsEmpty}>装備品を選択してください</div>
      </div>
    );
  }

  const propIDs = getEquipPropIDs(item);

  // パラメータの値を比較して色を決定する関数
  const getValueColorClass = (propID: EquipPropID, currentValue: number | string): string => {
    if (!equippedItem || typeof currentValue !== 'number') {
      return styles.paramValue;
    }

    const equippedProperty = getEquipProperty(equippedItem, propID);
    if (!equippedProperty || typeof equippedProperty.value !== 'number') {
      return styles.paramValue;
    }

    const equippedValue = equippedProperty.value;
    const comparisonType = getEquipPropComparisonType(propID);
    
    // 優劣判定なしの場合は色分けしない
    if (comparisonType === EquipPropComparisonType.None) {
      return styles.paramValue;
    }
    
    // 優劣判定タイプに基づいて色を決定
    if (comparisonType === EquipPropComparisonType.Lower) {
      // 値が小さい方が高性能
      if (currentValue < equippedValue) {
        return `${styles.paramValue} ${styles.paramValueHigher}`; // 小さい = 良い = 青
      } else if (currentValue > equippedValue) {
        return `${styles.paramValue} ${styles.paramValueLower}`; // 大きい = 悪い = 赤
      }
    } else {
      // 値が大きい方が高性能
      if (currentValue > equippedValue) {
        return `${styles.paramValue} ${styles.paramValueHigher}`; // 大きい = 良い = 青
      } else if (currentValue < equippedValue) {
        return `${styles.paramValue} ${styles.paramValueLower}`; // 小さい = 悪い = 赤
      }
    }
    return styles.paramValue;
  };

  return (
    <div className={styles.paramsContainer}>
      <h4 className={styles.paramsTitle}>{item.name}</h4>
      <div className={styles.paramsList}>
        {propIDs
          .filter(propID => getEquipPropSection(propID) === 'stat')
          .map((propID) => {
            const property = getEquipProperty(item, propID);
            if (!property) return null;

            const valueColorClass = getValueColorClass(propID, property.value);

            return (
              <div key={propID} className={styles.paramItem}>
                <span className={styles.paramLabel}>{property.displayName}:</span>
                <span className={valueColorClass}>
                  {typeof property.value === 'number' ? `+${property.value}` : property.value}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

