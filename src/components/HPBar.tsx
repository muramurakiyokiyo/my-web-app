import React from 'react';
import { Progress } from "@/components/ui/progress";

interface HPBarProps {
  current: number;
  max: number;
  color?: 'green' | 'blue' | 'red'; // バーの色を任意で変更可能に
}

export const HPBar: React.FC<HPBarProps> = ({ current, max, color = 'green' }) => {
  const percent = (current / max) * 100;
  const displayPercent = Math.max(0, Math.min(100, percent)); // 0-100%にクランプ

  const indicatorColor = color === 'blue' 
    ? "bg-blue-500" 
    : color === 'red' 
    ? "bg-red-500" 
    : "bg-green-500";

  return (
    <div className="w-full">
      <Progress 
        value={displayPercent} 
        className="h-2" 
        indicatorClassName={indicatorColor}
      />
    </div>
  );
};
