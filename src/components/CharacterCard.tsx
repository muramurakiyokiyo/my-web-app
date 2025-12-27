import React from 'react';
import type { Character } from '../types/character';

interface CharacterCardProps {
  character: Character;
  onSelect?: (id: string) => void; // 選択イベントも定義
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  const borderColor = character.stats.hp < character.stats.maxHp * 0.2 ? '#ef4444' : '#3b82f6';
  const hpPercent = (character.stats.hp / character.stats.maxHp) * 100;
  const mpPercent = (character.stats.mp / character.stats.maxMp) * 100;

  return (
    <div 
      style={{
        backgroundColor: '#1f2937',
        color: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        margin: '0.5rem',
        border: `2px solid ${borderColor}`,
        cursor: 'pointer',
        minWidth: '250px',
      }}
      onClick={() => onSelect && onSelect(character.id)}
    >
      {/* アバター部分 */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <img 
          src={character.avatarUrl || "/default-avatar.png"} 
          alt={character.name} 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '2px solid #9ca3af',
            marginRight: '1rem',
            objectFit: 'cover'
          }}
        />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>{character.name}</h2>
      </div>

      {/* HPバーとMPバー */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
          <span>HP</span>
          <span>{character.stats.hp} / {character.stats.maxHp}</span>
        </div>
        <div style={{ width: '100%', backgroundColor: '#374151', borderRadius: '9999px', height: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${hpPercent}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '9999px', transition: 'width 0.3s' }} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
          <span>MP</span>
          <span>{character.stats.mp} / {character.stats.maxMp}</span>
        </div>
        <div style={{ width: '100%', backgroundColor: '#374151', borderRadius: '9999px', height: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${mpPercent}%`, height: '100%', backgroundColor: '#3b82f6', borderRadius: '9999px', transition: 'width 0.3s' }} />
        </div>
      </div>

      {/* その他のステータス */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
        <div>攻撃力: <span style={{ fontWeight: '600' }}>{character.stats.attack}</span></div>
        <div>防御力: <span style={{ fontWeight: '600' }}>{character.stats.defense}</span></div>
      </div>
    </div>
  );
};

