import React, { useState, useMemo } from 'react';
import type { Character, Armor, Weapon } from '../types/character';
import { EquipSlot, getEquipType } from '../types/character';
import { getCalculatedStats } from '../utils/characterStats';
import { getEquipmentList, getEquippedId } from '../utils/equipment';
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
  
  // アクティブなタブからEquipTypeと装備品リストを取得
  const equipType = useMemo(() => getEquipType(activeTab), [activeTab]);
  const equipmentList = useMemo(() => getEquipmentList(equipType), [equipType]);
  const equippedId = useMemo(() => getEquippedId(character.equipment, activeTab), [character.equipment, activeTab]);
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
              <div className={styles.equipmentList}>
                {equipmentList.map((item) => {
                  const isEquipped = item.id === equippedId;
                  const isArmor = equipType === 'armor';
                  const equipmentItem = item as Armor | Weapon;
                  
                  return (
                    <button
                      key={item.id}
                      className={`${styles.equipmentItem} ${isEquipped ? styles.equipmentItemEquipped : ''}`}
                      onClick={() => onEquip(activeTab, item.id)}
                    >
                      <div className={styles.equipmentItemHeader}>
                        <div className={styles.equipmentItemName}>{equipmentItem.name}</div>
                        {isEquipped && <div className={styles.equipmentItemEquippedBadge}>装備中</div>}
                      </div>
                      <div className={styles.equipmentItemStat}>
                        {isArmor 
                          ? `防御力: +${(equipmentItem as Armor).defence}`
                          : `攻撃力: +${(equipmentItem as Weapon).attack}`
                        }
                      </div>
                    </button>
                  );
                })}
              </div>
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

