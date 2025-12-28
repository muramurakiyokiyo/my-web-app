import React from 'react';
import type { Character, Armor, Weapon } from '../types/character';
import { equipSlots, getEquipSlotDisplayName, getEquipType } from '../types/character';
import { getEquippedItem } from '../utils/equipment';

interface EquipmentDisplayProps {
  character: Character;
}

export const EquipmentDisplay: React.FC<EquipmentDisplayProps> = ({ character }) => {
  const equipment = character.equipment;

  return (
    <div className="space-y-2">
      {equipSlots.map((slot) => {
        const equippedItem = getEquippedItem(equipment, slot);
        const equipType = getEquipType(slot);
        const isArmor = equipType === 'armor';
        
        return (
          <div key={slot} className="flex flex-col gap-0.5 py-1 border-b border-slate-100 last:border-0">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {getEquipSlotDisplayName(slot)}:
            </div>
            <div className="text-sm font-medium text-slate-700">
              {equippedItem
                ? (
                  <div className="flex justify-between items-center">
                    <span className="truncate mr-2">{equippedItem.name}</span>
                    <span className="text-xs font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded">
                      {isArmor ? (equippedItem as Armor).defence : (equippedItem as Weapon).attack}
                    </span>
                  </div>
                )
                : <span className="text-slate-300 italic">未装備</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
