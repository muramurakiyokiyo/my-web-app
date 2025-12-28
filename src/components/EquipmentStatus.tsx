import React from 'react';
import type { Armor, Weapon } from '../types/character';
import { ModelViewer } from './ModelViewer';
import { EquipmentItemParams } from './EquipmentItemParams';
import { cn } from "@/lib/utils";

interface EquipmentStatusProps {
  selectedItem: Armor | Weapon | null;
  currentEquippedItem: Armor | Weapon | null;
  className?: string;
}

export const EquipmentStatus: React.FC<EquipmentStatusProps> = ({
  selectedItem,
  currentEquippedItem,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-4 md:h-[550px]", className)}>
      {/* 3Dモデルプレビュー */}
      <div className="flex-1 min-h-[150px] md:min-h-[200px]">
        <ModelViewer
          modelUrl={selectedItem?.modelUrl}
          fallbackImage={selectedItem?.imageUrl}
        />
      </div>

      {/* パラメータ詳細 */}
      <div className="bg-white rounded-lg border p-4 shadow-sm overflow-y-auto max-h-[300px] md:max-h-none">
        <EquipmentItemParams
          item={selectedItem}
          equippedItem={currentEquippedItem}
        />
      </div>
    </div>
  );
};

