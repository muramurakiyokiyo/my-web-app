import React from 'react';

interface HPBarProps {
  current: number;
  max: number;
  color?: string; // バーの色を任意で変更可能に
}

export const HPBar: React.FC<HPBarProps> = ({ current, max, color = 'bg-green-500' }) => {
  const percent = (current / max) * 100;
  const displayPercent = Math.max(0, Math.min(100, percent)); // 0-100%にクランプ

  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-300 ease-out`}
        style={{ width: `${displayPercent}%` }}
      />
    </div>
  );
};

