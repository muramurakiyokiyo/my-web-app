import React, { useState } from 'react';
import type { Character } from '../types/character';
import { EquipSlot } from '../types/character';
import { armors } from '../data/armors';
import { weapons } from '../data/weapons';
import { getCalculatedStats } from '../utils/characterStats';
import { CalculatedStatsWindow } from './CalculatedStatsWindow';
import { EquipmentDisplay } from './EquipmentDisplay';
import styles from './EquipmentScreen.module.css';

type EquipmentTab = EquipSlot;

interface EquipmentScreenProps {
  character: Character;
  onEquip: (type: EquipSlot, id: number) => void;
  onClose: () => void;
}

export const EquipmentScreen: React.FC<EquipmentScreenProps> = ({ character, onEquip, onClose }) => {
  const [activeTab, setActiveTab] = useState<EquipmentTab>(EquipSlot.Armor);
  const calculatedStats = getCalculatedStats(character);
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
          <h3 className={styles.characterName}>{character.name}</h3>
        </div>

        <div className={styles.equipmentScreenBody}>
          <div className={styles.equipmentListSection}>
            {/* タブ */}
            <div className={styles.tabContainer}>
              <button
                className={`${styles.tab} ${activeTab === EquipSlot.Armor ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(EquipSlot.Armor)}
              >
                防具
              </button>
              <button
                className={`${styles.tab} ${activeTab === EquipSlot.RightHandWeapon ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(EquipSlot.RightHandWeapon)}
              >
                右手武器
              </button>
              <button
                className={`${styles.tab} ${activeTab === EquipSlot.LeftHandWeapon ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(EquipSlot.LeftHandWeapon)}
              >
                左手武器
              </button>
            </div>

            {/* タブコンテンツ */}
            <div className={styles.tabContent}>
              {activeTab === EquipSlot.Armor && (
                <div className={styles.equipmentList}>
                  {armors.map((armor) => {
                    const isEquipped = character.equipment?.armor === armor.id;
                    return (
                      <button
                        key={armor.id}
                        className={`${styles.equipmentItem} ${isEquipped ? styles.equipmentItemEquipped : ''}`}
                        onClick={() => onEquip(EquipSlot.Armor, armor.id)}
                      >
                        <div className={styles.equipmentItemHeader}>
                          <div className={styles.equipmentItemName}>{armor.name}</div>
                          {isEquipped && <div className={styles.equipmentItemEquippedBadge}>装備中</div>}
                        </div>
                        <div className={styles.equipmentItemStat}>防御力: +{armor.defence}</div>
                      </button>
                    );
                  })}
                </div>
              )}

              {activeTab === EquipSlot.RightHandWeapon && (
                <div className={styles.equipmentList}>
                  {weapons.map((weapon) => {
                    const isEquipped = character.equipment?.rightHandWeapon === weapon.id;
                    return (
                      <button
                        key={weapon.id}
                        className={`${styles.equipmentItem} ${isEquipped ? styles.equipmentItemEquipped : ''}`}
                        onClick={() => onEquip(EquipSlot.RightHandWeapon, weapon.id)}
                      >
                        <div className={styles.equipmentItemHeader}>
                          <div className={styles.equipmentItemName}>{weapon.name}</div>
                          {isEquipped && <div className={styles.equipmentItemEquippedBadge}>装備中</div>}
                        </div>
                        <div className={styles.equipmentItemStat}>攻撃力: +{weapon.attack}</div>
                      </button>
                    );
                  })}
                </div>
              )}

              {activeTab === EquipSlot.LeftHandWeapon && (
                <div className={styles.equipmentList}>
                  {weapons.map((weapon) => {
                    const isEquipped = character.equipment?.leftHandWeapon === weapon.id;
                    return (
                      <button
                        key={weapon.id}
                        className={`${styles.equipmentItem} ${isEquipped ? styles.equipmentItemEquipped : ''}`}
                        onClick={() => onEquip(EquipSlot.LeftHandWeapon, weapon.id)}
                      >
                        <div className={styles.equipmentItemHeader}>
                          <div className={styles.equipmentItemName}>{weapon.name}</div>
                          {isEquipped && <div className={styles.equipmentItemEquippedBadge}>装備中</div>}
                        </div>
                        <div className={styles.equipmentItemStat}>攻撃力: +{weapon.attack}</div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className={styles.statsDisplaySection}>
            <CalculatedStatsWindow
              calculatedStats={calculatedStats}
              baseStats={character.stats}
            />
            <EquipmentDisplay character={character} />
          </div>
        </div>

        <button className={styles.backButton} onClick={onClose}>
          戻る
        </button>
      </div>
    </div>
  );
};

