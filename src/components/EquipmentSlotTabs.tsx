import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { equipSlots, getEquipSlotDisplayName } from '../types/character';
import type { EquipSlot } from '../types/character';

interface EquipmentSlotTabsProps {
  value: EquipSlot;
  onValueChange: (value: EquipSlot) => void;
  className?: string;
}

export const EquipmentSlotTabs: React.FC<EquipmentSlotTabsProps> = ({
  value,
  onValueChange,
  className,
}) => {
  return (
    <Tabs 
      value={value} 
      onValueChange={(v) => onValueChange(v as EquipSlot)}
      className={className}
    >
      <TabsList className="grid w-full grid-cols-3">
        {equipSlots.map((slot) => (
          <TabsTrigger key={slot} value={slot}>
            {getEquipSlotDisplayName(slot)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

