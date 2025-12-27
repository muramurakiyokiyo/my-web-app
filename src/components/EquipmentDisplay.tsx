import React from 'react';
import type { Character, Armor, Weapon } from '../types/character';
import { equipSlots, getEquipSlotDisplayName, getEquipType } from '../types/character';
import { getEquippedItem } from '../utils/equipment';
import styles from './EquipmentDisplay.module.css';

interface EquipmentDisplayProps {
  character: Character;
}

export const EquipmentDisplay: React.FC<EquipmentDisplayProps> = ({ character }) => {
  const equipment = character.equipment;

  return (
    <div className={styles.equipmentDisplay}>
      {equipSlots.map((slot) => {
        const equippedItem = getEquippedItem(equipment, slot);
        const equipType = getEquipType(slot);
        const isArmor = equipType === 'armor';
        
        return (
          <div key={slot} className={styles.equipmentSection}>
            <div className={styles.equipmentLabel}>{getEquipSlotDisplayName(slot)}:</div>
            <div className={styles.equipmentValue}>
              {equippedItem
                ? `${equippedItem.name} (+${isArmor ? (equippedItem as Armor).defence : (equippedItem as Weapon).attack})`
                : '未装備'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

