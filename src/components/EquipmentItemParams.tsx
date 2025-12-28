import React from 'react';
import type { Armor, Weapon } from '../types/character';
import { getEquipPropSpec } from '../types/character';
import { getEquipPropIDs, getEquipProperty } from '../utils/equipment';
import { GamePropertyDisplay } from './GamePropertyDisplay';

interface EquipmentItemParamsProps {
  item: Armor | Weapon | null;
  equippedItem?: Armor | Weapon | null;
}

export const EquipmentItemParams: React.FC<EquipmentItemParamsProps> = ({ item, equippedItem }) => {
  if (!item) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 italic text-sm">
        装備品を選択してください
      </div>
    );
  }

  const propIDs = getEquipPropIDs(item);

  return (
    <div className="space-y-4">
      <h4 className="font-bold text-lg text-slate-800 border-b pb-2">{item.name}</h4>
      <div className="space-y-1">
        {propIDs
          .filter(propID => getEquipPropSpec(propID).section === 'stat')
          .map((propID) => {
            const property = getEquipProperty(item, propID);
            if (!property) return null;

            const compareProperty = equippedItem ? getEquipProperty(equippedItem, propID) : null;

            return (
              <GamePropertyDisplay
                key={propID}
                property={property}
                compareProperty={compareProperty}
              />
            );
          })}
      </div>
    </div>
  );
};
