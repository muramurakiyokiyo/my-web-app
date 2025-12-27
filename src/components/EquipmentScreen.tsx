import React, { useState, useMemo } from 'react';
import type { Character, Armor, Weapon } from '../types/character';
import { EquipSlot, equipSlots, getEquipType, getEquipSlotDisplayName, getEquipPropClassName, getEquipPropSection } from '../types/character';
import { getCalculatedStats } from '../utils/characterStats';
import { getEquipmentList, getEquippedId, getEquipPropIDs, getEquipProperty, getEquippedItem } from '../utils/equipment';
import { CalculatedStatsWindow } from './CalculatedStatsWindow';
import { EquipmentDisplay } from './EquipmentDisplay';
import { EquipmentItemParams } from './EquipmentItemParams';
import styles from './EquipmentScreen.module.css';

type EquipmentTab = EquipSlot;

interface EquipmentScreenProps {
  character: Character;
  onEquip: (type: EquipSlot, id: number) => void;
  onClose: () => void;
}

export const EquipmentScreen: React.FC<EquipmentScreenProps> = ({ character, onEquip, onClose }) => {
  const [activeTab, setActiveTab] = useState<EquipmentTab>(EquipSlot.Armor);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
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
              {equipSlots.map((slot) => (
                <button
                  key={slot}
                  className={`${styles.tab} ${activeTab === slot ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(slot)}
                >
                  {getEquipSlotDisplayName(slot)}
                </button>
              ))}
            </div>

            {/* タブコンテンツ */}
            <div className={styles.tabContent}>
              <div className={styles.equipmentListContainer}>
                <div className={styles.equipmentList}>
                  {equipmentList.map((item) => {
                    const isEquipped = item.id === equippedId;
                    const equipmentItem = item as Armor | Weapon;
                    const propIDs = getEquipPropIDs(equipmentItem);
                    
                    return (
                      <button
                        key={item.id}
                        className={`${styles.equipmentItem} ${isEquipped ? styles.equipmentItemEquipped : ''}`}
                        onClick={() => onEquip(activeTab, item.id)}
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                      >
                      <div className={styles.equipmentItemHeader}>
                        {propIDs
                          .filter(propID => getEquipPropSection(propID) === 'header')
                          .map((propID) => {
                            const property = getEquipProperty(equipmentItem, propID);
                            if (!property) return null;
                            
                            const classNameKey = getEquipPropClassName(propID);
                            const className = classNameKey ? styles[classNameKey as keyof typeof styles] : '';
                            
                            return (
                              <div key={propID} className={className}>{property.value}</div>
                            );
                          })}
                        {isEquipped && <div className={styles.equipmentItemEquippedBadge}>装備中</div>}
                      </div>
                      <div className={styles.equipmentItemStat}>
                        {propIDs
                          .filter(propID => getEquipPropSection(propID) === 'stat')
                          .map((propID) => {
                            const property = getEquipProperty(equipmentItem, propID);
                            if (!property) return null;
                            
                            const classNameKey = getEquipPropClassName(propID);
                            const className = classNameKey ? styles[classNameKey as keyof typeof styles] : '';
                            
                            return (
                              <div key={propID} className={className}>
                                {property.displayName}: +{property.value}
                              </div>
                            );
                          })}
                      </div>
                    </button>
                  );
                })}
                </div>
                <div className={styles.paramsDisplay}>
                  <EquipmentItemParams
                    item={
                      hoveredItemId !== null
                        ? (equipmentList.find(item => item.id === hoveredItemId) as Armor | Weapon | null)
                        : (equippedId !== undefined
                            ? (equipmentList.find(item => item.id === equippedId) as Armor | Weapon | null)
                            : null)
                    }
                    equippedItem={
                      equippedId !== undefined
                        ? getEquippedItem(character.equipment, activeTab)
                        : null
                    }
                  />
                </div>
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

