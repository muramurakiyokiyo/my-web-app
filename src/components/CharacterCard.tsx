import React from 'react';
import { motion } from 'framer-motion';
import type { Character } from '../types/character';
import { getCalculatedStats } from '../utils/characterStats';
import { armors } from '../data/armors';
import { HPBar } from './HPBar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CharacterCardProps {
  character: Character;
  onSelect?: (id: string) => void;
  onOpenEquipment?: (id: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect, onOpenEquipment }) => {
  const calculatedStats = getCalculatedStats(character.stats, character.equipment);
  const isDead = character.stats.hp <= 0;
  const isLowHP = character.stats.hp < character.stats.maxHp * 0.2;
  
  // 防御力の表示用（baseDefense + armor.defence）
  const baseDefense = character.stats.baseDefense;
  const armorDefense = character.equipment?.armor !== undefined
    ? armors.find(a => a.id === character.equipment!.armor)?.defence || 0
    : 0;
  const defenseDisplay = armorDefense > 0 
    ? `${baseDefense}+${armorDefense}` 
    : `${baseDefense}`;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: isDead ? 0.5 : 1 }}
      exit={{ 
        opacity: 0,
        scale: 0.8,
        filter: 'grayscale(100%)',
        transition: { duration: 1 }
      }}
      layout
      className="cursor-pointer w-full"
      onClick={() => !isDead && onSelect && onSelect(character.id)}
    >
      <Card className={cn(
        "transition-all duration-300 overflow-hidden",
        isLowHP ? "border-red-500 shadow-lg shadow-red-200" : "hover:border-primary",
        isDead && "grayscale opacity-60"
      )}>
        {/* アバター部分 */}
        <CardHeader className="p-4 flex flex-row items-center gap-4 space-y-0">
          <img 
            src={character.avatarUrl || "/default-avatar.png"} 
            alt={character.name} 
            className="w-12 h-12 rounded-full border shadow-sm"
          />
          <CardTitle className="text-lg font-bold truncate">{character.name}</CardTitle>
        </CardHeader>

        {/* HPバーとMPバー */}
        <CardContent className="p-4 pt-0 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span>HP</span>
              <span>{character.stats.hp} / {character.stats.maxHp}</span>
            </div>
            <HPBar current={character.stats.hp} max={character.stats.maxHp} color={isLowHP ? "red" : "green"} />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span>MP</span>
              <span>{character.stats.mp} / {character.stats.maxMp}</span>
            </div>
            <HPBar current={character.stats.mp} max={character.stats.maxMp} color="blue" />
          </div>

          {/* その他のステータス */}
          <div className="grid grid-cols-2 gap-2 text-sm pt-2">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-[10px] uppercase">攻撃力</span>
              <span className="font-bold">{calculatedStats.attack}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-[10px] uppercase">防御力</span>
              <span className="font-bold">{defenseDisplay}</span>
            </div>
            {character.equipment?.armor !== undefined && (
              <div className="col-span-2 flex flex-col pt-1 border-t">
                <span className="text-muted-foreground text-[10px] uppercase">防具</span>
                <span className="truncate">{armors.find(a => a.id === character.equipment!.armor)?.name || '不明'}</span>
              </div>
            )}
          </div>
        </CardContent>
        
        {/* 装備変更ボタン */}
        <CardFooter className="p-4 pt-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            disabled={isDead}
            onClick={(e) => {
              e.stopPropagation(); // カードのクリックイベントを防ぐ
              if (onOpenEquipment) {
                onOpenEquipment(character.id);
              }
            }}
          >
            装備変更！
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
