import React from 'react';
import type { GameProperty } from '../types/character';
import { EquipPropComparisonType } from '../types/character';
import { cn } from "@/lib/utils";

interface GamePropertyDisplayProps {
  property: GameProperty;
  compareProperty?: GameProperty | null; // 比較対象のプロパティ（優劣表示用）
}

export const GamePropertyDisplay: React.FC<GamePropertyDisplayProps> = ({ property, compareProperty }) => {
  // 優劣判定に基づいて色を決定する関数
  const getValueColorClass = (): string => {
    if (!compareProperty || typeof property.value !== 'number' || typeof compareProperty.value !== 'number') {
      return "text-slate-900";
    }

    const currentValue = property.value;
    const compareValue = compareProperty.value;
    const comparisonType = property.spec.comparisonType;

    // 優劣判定なしの場合は色分けしない
    if (comparisonType === EquipPropComparisonType.None) {
      return "text-slate-900";
    }

    // 優劣判定タイプに基づいて色を決定
    if (comparisonType === EquipPropComparisonType.Lower) {
      // 値が小さい方が高性能
      if (currentValue < compareValue) {
        return "text-blue-600 font-bold"; // 小さい = 良い = 青
      } else if (currentValue > compareValue) {
        return "text-red-600 font-bold"; // 大きい = 悪い = 赤
      }
    } else {
      // 値が大きい方が高性能
      if (currentValue > compareValue) {
        return "text-blue-600 font-bold"; // 大きい = 良い = 青
      } else if (currentValue < compareValue) {
        return "text-red-600 font-bold"; // 小さい = 悪い = 赤
      }
    }
    return "text-slate-900";
  };

  const valueColorClass = getValueColorClass();
  const displayValue = property.value;

  // 比較プロパティがある場合の表示値
  const compareDisplayValue = compareProperty ? compareProperty.value : null;

  // 値が同じかどうかを判定
  const isSameValue = compareProperty && (
    typeof property.value === 'number' && typeof compareProperty.value === 'number'
      ? property.value === compareProperty.value
      : property.value === compareProperty.value
  );

  return (
    <div className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0 text-sm">
      <span className="text-slate-500 font-medium">{property.spec.displayName}:</span>
      <span className={cn("font-mono", valueColorClass)}>
        {compareProperty && !isSameValue ? (
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 line-through text-xs">{compareDisplayValue}</span>
            <span className="text-slate-400 text-[10px]">▶</span>
            <span>{displayValue}</span>
          </div>
        ) : (
          <span>{displayValue}</span>
        )}
      </span>
    </div>
  );
};
