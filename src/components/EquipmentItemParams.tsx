import React from 'react';
import type { Armor, Weapon } from '../types/character';
import { EquipPropID, getEquipPropSection } from '../types/character';
import { getEquipPropIDs, getEquipProperty } from '../utils/equipment';
import styles from './EquipmentItemParams.module.css';

interface EquipmentItemParamsProps {
  item: Armor | Weapon | null;
}

export const EquipmentItemParams: React.FC<EquipmentItemParamsProps> = ({ item }) => {
  if (!item) {
    return (
      <div className={styles.paramsContainer}>
        <div className={styles.paramsEmpty}>装備品を選択してください</div>
      </div>
    );
  }

  const propIDs = getEquipPropIDs(item);

  return (
    <div className={styles.paramsContainer}>
      <h4 className={styles.paramsTitle}>パラメータ</h4>
      <div className={styles.paramsList}>
        {propIDs
          .filter(propID => getEquipPropSection(propID) === 'stat')
          .map((propID) => {
            const property = getEquipProperty(item, propID);
            if (!property) return null;

            return (
              <div key={propID} className={styles.paramItem}>
                <span className={styles.paramLabel}>{property.displayName}:</span>
                <span className={styles.paramValue}>
                  {typeof property.value === 'number' ? `+${property.value}` : property.value}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

