import React, { useState, useMemo } from 'react';
import type { Character, Armor, Weapon } from '../types/character';
import { EquipSlot, equipSlots, getEquipType, getEquipSlotDisplayName } from '../types/character';
import { getCalculatedStats } from '../utils/characterStats';
import { getEquipmentList, getEquippedId, getEquippedItem } from '../utils/equipment';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EquipmentList } from './EquipmentList';
import { EquipmentStatus } from './EquipmentStatus';
import { CharacterStatus } from './CharacterStatus';

type EquipmentTab = EquipSlot;

interface EquipmentScreenProps {
  character: Character;
  onEquip: (type: EquipSlot, id: number) => void;
  onClose: () => void;
}

export const EquipmentScreen: React.FC<EquipmentScreenProps> = ({ character, onEquip, onClose }) => {
  const [activeTab, setActiveTab] = useState<EquipmentTab>(EquipSlot.Armor);
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

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            装備変更: <span className="text-primary">{character.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* タブを最上段（全幅）に配置 */}
          <Tabs 
            value={activeTab} 
            onValueChange={(v) => setActiveTab(v as EquipmentTab)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              {equipSlots.map((slot) => (
                <TabsTrigger key={slot} value={slot}>
                  {getEquipSlotDisplayName(slot)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* 3分割レイアウト: [リスト] [詳細] [サイドバー]
              モバイルでもリストと詳細は横並びにするため、ベースを grid-cols-2 にする */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-6 text-inherit">
            
            {/* 1. 装備リスト (左: 3カラム分 / モバイルでは 1列目) */}
            <EquipmentList
              className="col-span-1 md:col-span-3"
              equipmentList={equipmentList}
              equippedId={equippedId}
              activeTab={activeTab}
              onEquip={onEquip}
              onMouseEnterItem={setHoveredItemId}
              onMouseLeaveItem={() => setHoveredItemId(null)}
            />

            {/* 2. 装備品ステータス: モデル+パラメータ (中央: 5カラム分 / モバイルでは 2列目) */}
            <EquipmentStatus
              className="col-span-1 md:col-span-5"
              selectedItem={selectedItem}
              currentEquippedItem={currentEquippedItem}
            />

            {/* 3. キャラクターステータス: 全体ステータス+現在の装備 (右: 4カラム分 / モバイルでは下段に全幅) */}
            <CharacterStatus
              className="col-span-2 md:col-span-4"
              character={character}
              currentStats={currentStats}
              previewStats={previewStats}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
