import React from 'react';
import type { Armor, Weapon, EquipSlot } from '../types/character';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EquipmentListProps {
  equipmentList: (Armor | Weapon)[];
  equippedId: number | undefined;
  activeTab: EquipSlot;
  onEquip: (type: EquipSlot, id: number) => void;
  onMouseEnterItem: (id: number) => void;
  onMouseLeaveItem: () => void;
  className?: string;
}

export const EquipmentList: React.FC<EquipmentListProps> = ({
  equipmentList,
  equippedId,
  activeTab,
  onEquip,
  onMouseEnterItem,
  onMouseLeaveItem,
  className,
}) => {
  return (
    <div className={cn("h-[400px] md:h-[550px] overflow-y-auto border rounded-lg bg-white p-2 space-y-2 shadow-sm", className)}>
      {/* 装備品リスト: 常に独立してスクロール可能 */}
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
            onMouseEnter={() => onMouseEnterItem(item.id)}
            onMouseLeave={onMouseLeaveItem}
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
  );
};

