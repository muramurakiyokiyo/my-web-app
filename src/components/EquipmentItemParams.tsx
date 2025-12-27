import React from 'react';
import type { Armor, Weapon } from '../types/character';
import { getEquipPropSpec } from '../types/character';
import { getEquipPropIDs, getEquipProperty } from '../utils/equipment';
import { GamePropertyDisplay } from './GamePropertyDisplay';
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

  return (
    <div className={styles.paramsContainer}>
      <h4 className={styles.paramsTitle}>{item.name}</h4>
      <div className={styles.paramsList}>
        {propIDs
          .filter(propID => getEquipPropSpec(propID).section === 'stat')
          .map((propID) => {
            const property = getEquipProperty(item, propID);
            if (!property) return null;

            const compareProperty = equippedItem ? getEquipProperty(equippedItem, propID) : null;

            return (
              <GamePropertyDisplay
                key={propID}
                property={property}
                compareProperty={compareProperty}
              />
            );
          })}
      </div>
    </div>
  );
};

