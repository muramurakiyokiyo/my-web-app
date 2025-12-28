import React from 'react';
import type { Character, EquipSlot } from '../types/character';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EquipmentSlotTabs } from './EquipmentSlotTabs';
import { EquipmentList } from './EquipmentList';
import { EquipmentStatus } from './EquipmentStatus';
import { CharacterStatus } from './CharacterStatus';
import { useEquipment } from '../hooks/useEquipment';

interface EquipmentScreenProps {
  character: Character;
  onEquip: (type: EquipSlot, id: number) => void;
  onClose: () => void;
}

export const EquipmentScreen: React.FC<EquipmentScreenProps> = ({ character, onEquip, onClose }) => {
  // 装備変更画面のロジックをカスタムフックに委譲
  const {
    activeTab,
    setActiveTab,
    setHoveredItemId,
    equipmentList,
    equippedId,
    currentStats,
    previewStats,
    selectedItem,
    currentEquippedItem,
  } = useEquipment(character);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            装備変更: <span className="text-primary">{character.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 装備スロット切り替えタブ */}
          <EquipmentSlotTabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          />

          {/* 3分割レイアウト: [リスト] [詳細] [サイドバー] */}
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
