import { useState, useMemo } from 'react';
import type { Character, Armor, Weapon } from '../types/character';
import { EquipSlot, getEquipType } from '../types/character';
import { getCalculatedStats } from '../utils/characterStats';
import { getEquipmentList, getEquippedId, getEquippedItem } from '../utils/equipment';

export function useEquipment(character: Character) {
  const [activeTab, setActiveTab] = useState<EquipSlot>(EquipSlot.Armor);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  
  // アクティブなタブからEquipTypeと装備品リストを取得
  const equipType = useMemo(() => getEquipType(activeTab), [activeTab]);
  const equipmentList = useMemo(() => getEquipmentList(equipType), [equipType]);
  const equippedId = useMemo(() => getEquippedId(character.equipment, activeTab), [character.equipment, activeTab]);

  const currentStats = useMemo(() => getCalculatedStats(character.stats, character.equipment), [character]);

  // 表示するステータスを決定（ホバー中の装備品がある場合は仮装備したステータス、なければ現在のステータス）
  const previewStats = useMemo(() => {
    if (hoveredItemId !== null && hoveredItemId !== equippedId) {
      // 仮想的な装備状態を作成
      const tempEquipment = { ...character.equipment };
      if (activeTab === EquipSlot.Armor) {
        tempEquipment.armor = hoveredItemId;
      } else if (activeTab === EquipSlot.RightHandWeapon) {
        tempEquipment.rightHandWeapon = hoveredItemId;
      } else if (activeTab === EquipSlot.LeftHandWeapon) {
        tempEquipment.leftHandWeapon = hoveredItemId;
      }
      return getCalculatedStats(character.stats, tempEquipment);
    }
    return null;
  }, [character, activeTab, hoveredItemId, equippedId]);

  // 現在表示（プレビュー）すべき装備品アイテムを特定
  const selectedItem = useMemo(() => {
    const id = hoveredItemId !== null ? hoveredItemId : equippedId;
    return equipmentList.find(item => item.id === id) as Armor | Weapon | null;
  }, [hoveredItemId, equippedId, equipmentList]);

  // 現在実際に装備しているアイテムの詳細を取得
  const currentEquippedItem = useMemo(() => 
    getEquippedItem(character.equipment, activeTab),
    [character.equipment, activeTab]
  );

  return {
    activeTab,
    setActiveTab,
    hoveredItemId,
    setHoveredItemId,
    equipmentList,
    equippedId,
    currentStats,
    previewStats,
    selectedItem,
    currentEquippedItem,
  };
}

