import React from 'react';
import type { Character, CalculatedStats } from '../types/character';
import { CalculatedStatsWindow } from './CalculatedStatsWindow';
import { EquipmentDisplay } from './EquipmentDisplay';
import { cn } from "@/lib/utils";

interface CharacterStatusProps {
  character: Character;
  currentStats: CalculatedStats;
  previewStats: CalculatedStats | null;
  className?: string;
}

export const CharacterStatus: React.FC<CharacterStatusProps> = ({
  character,
  currentStats,
  previewStats,
  className,
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* ステータス比較ウィンドウ */}
      <div className="bg-white rounded-lg border p-4 shadow-sm">
        <h3 className="text-xs font-bold mb-3 text-slate-400 uppercase tracking-widest">ステータス</h3>
        <CalculatedStatsWindow
          calculatedStats={previewStats || currentStats}
          compareStats={previewStats ? currentStats : undefined}
        />
      </div>

      {/* 現在の装備一覧表示 */}
      <div className="bg-white rounded-lg border p-4 shadow-sm">
        <h3 className="text-xs font-bold mb-3 text-slate-400 uppercase tracking-widest">現在の装備</h3>
        <EquipmentDisplay character={character} />
      </div>
    </div>
  );
};

