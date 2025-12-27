import React from 'react';
import type { Character } from '../types/character';
import { armors } from '../data/armors';
import { weapons } from '../data/weapons';
import styles from './EquipmentDisplay.module.css';

interface EquipmentDisplayProps {
  character: Character;
}

export const EquipmentDisplay: React.FC<EquipmentDisplayProps> = ({ character }) => {
  const equipment = character.equipment;
  
  // 装備情報を取得
  const equippedArmor = equipment?.armor !== undefined
    ? armors.find(a => a.id === equipment.armor)
    : null;
  
  const equippedRightHandWeapon = equipment?.rightHandWeapon !== undefined
    ? weapons.find(w => w.id === equipment.rightHandWeapon)
    : null;
  
  const equippedLeftHandWeapon = equipment?.leftHandWeapon !== undefined
    ? weapons.find(w => w.id === equipment.leftHandWeapon)
    : null;

  return (
    <div className={styles.equipmentDisplay}>
      <div className={styles.equipmentSection}>
        <div className={styles.equipmentLabel}>防具:</div>
        <div className={styles.equipmentValue}>
          {equippedArmor ? `${equippedArmor.name} (+${equippedArmor.defence})` : '未装備'}
        </div>
      </div>
      <div className={styles.equipmentSection}>
        <div className={styles.equipmentLabel}>右手武器:</div>
        <div className={styles.equipmentValue}>
          {equippedRightHandWeapon ? `${equippedRightHandWeapon.name} (+${equippedRightHandWeapon.attack})` : '未装備'}
        </div>
      </div>
      <div className={styles.equipmentSection}>
        <div className={styles.equipmentLabel}>左手武器:</div>
        <div className={styles.equipmentValue}>
          {equippedLeftHandWeapon ? `${equippedLeftHandWeapon.name} (+${equippedLeftHandWeapon.attack})` : '未装備'}
        </div>
      </div>
    </div>
  );
};

