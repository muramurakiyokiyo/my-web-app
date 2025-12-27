import React from 'react';
import type { Character } from '../types/character';
import { HPBar } from './HPBar';

interface CharacterCardProps {
  character: Character;
  onSelect?: (id: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  const borderColor = character.stats.hp < character.stats.maxHp * 0.2 ? 'border-red-500' : 'border-blue-500';

  return (
    <div 
      className={`bg-gray-800 text-white rounded-lg shadow-lg p-4 m-2 border-2 ${borderColor} cursor-pointer hover:scale-105 transition-transform duration-200 min-w-[250px]`}
      onClick={() => onSelect && onSelect(character.id)}
    >
      {/* アバター部分 */}
      <div className="flex items-center mb-4">
        <img 
          src={character.avatarUrl || "/default-avatar.png"} 
          alt={character.name} 
          className="w-16 h-16 rounded-full border-2 border-gray-400 mr-4 object-cover" 
        />
        <h2 className="text-xl font-bold">{character.name}</h2>
      </div>

      {/* HPバーとMPバー */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>HP</span>
          <span>{character.stats.hp} / {character.stats.maxHp}</span>
        </div>
        <HPBar current={character.stats.hp} max={character.stats.maxHp} color="bg-green-500" />
        
        <div className="flex justify-between text-sm mt-2 mb-1">
          <span>MP</span>
          <span>{character.stats.mp} / {character.stats.maxMp}</span>
        </div>
        <HPBar current={character.stats.mp} max={character.stats.maxMp} color="bg-blue-500" />
      </div>

      {/* その他のステータス */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>攻撃力: <span className="font-semibold">{character.stats.attack}</span></div>
        <div>防御力: <span className="font-semibold">{character.stats.defense}</span></div>
      </div>
    </div>
  );
};

