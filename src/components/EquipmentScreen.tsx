import React, { useState, useMemo } from 'react';
import type { Character, Armor, Weapon } from '../types/character';
import { EquipSlot, equipSlots, getEquipType, getEquipSlotDisplayName } from '../types/character';
import { getCalculatedStats } from '../utils/characterStats';
import { getEquipmentList, getEquippedId, getEquippedItem } from '../utils/equipment';
import { CalculatedStatsWindow } from './CalculatedStatsWindow';
import { EquipmentDisplay } from './EquipmentDisplay';
import { EquipmentItemParams } from './EquipmentItemParams';
import { ModelViewer } from './ModelViewer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-50">
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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-6">
              {/* タブコンテンツ相当のレイアウト: 左にリスト、右にパラメータ */}
              {/* モバイルでもリストの横にプレビューを表示するためグリッドを使用 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* 装備品リスト (縦並び) */}
                {/* モバイルでも横にプレビューを出すため高さを制限 */}
                <div className="col-span-1 h-[300px] md:h-[550px] overflow-y-auto border rounded-lg bg-white p-2 space-y-2 shadow-sm">
                  {equipmentList.map((item) => {
                    const isEquipped = item.id === equippedId;
                    
                    return (
                      <button
                        key={item.id}
                        className={cn(
                          "w-full flex items-center gap-3 p-2 rounded-md border transition-all hover:bg-slate-50",
                          isEquipped ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-transparent"
                        )}
                        onClick={() => onEquip(activeTab, item.id)}
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                        title={item.name}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 border rounded overflow-hidden bg-slate-100 relative">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-slate-200" />
                          )}
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div className="text-xs sm:text-sm font-bold truncate">{item.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">ID: {item.id}</div>
                        </div>
                        {isEquipped && (
                          <Badge variant="default" className="px-1 h-4 sm:h-5 text-[9px] sm:text-xs font-bold shrink-0">E</Badge>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* プレビューとパラメータ (デスクトップでは右側、モバイルではリストの横) */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-4 min-w-0 h-[300px] md:h-[550px]">
                  {/* 3Dモデルプレビュー */}
                  <div className="flex-1 min-h-[150px] md:min-h-[200px]">
                    <ModelViewer
                      modelUrl={
                        hoveredItemId !== null
                          ? (equipmentList.find(item => item.id === hoveredItemId) as Armor | Weapon | null)?.modelUrl
                          : (equippedId !== undefined
                                ? (equipmentList.find(item => item.id === equippedId) as Armor | Weapon | null)?.modelUrl
                                : undefined)
                      }
                      fallbackImage={
                        hoveredItemId !== null
                          ? (equipmentList.find(item => item.id === hoveredItemId) as Armor | Weapon | null)?.imageUrl
                          : (equippedId !== undefined
                                ? (equipmentList.find(item => item.id === equippedId) as Armor | Weapon | null)?.imageUrl
                                : undefined)
                      }
                    />
                  </div>

                  {/* パラメータ数値表示 (デスクトップではプレビューの下に配置) */}
                  <div className="hidden md:block bg-white rounded-lg border p-4 shadow-sm">
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

                {/* パラメータ数値表示 (モバイルでは下段に全幅で配置) */}
                <div className="col-span-2 md:hidden bg-white rounded-lg border p-4 shadow-sm">
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

            {/* サイドバー: ステータスと現在の装備 */}
            <div className="md:col-span-4 space-y-6">
              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <h3 className="text-sm font-bold mb-3 text-slate-500 uppercase tracking-wider">ステータス</h3>
                <CalculatedStatsWindow
                  calculatedStats={previewStats || currentStats}
                  compareStats={previewStats ? currentStats : undefined}
                />
              </div>
              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <h3 className="text-sm font-bold mb-3 text-slate-500 uppercase tracking-wider">現在の装備</h3>
                <EquipmentDisplay character={character} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
