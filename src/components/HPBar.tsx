import React from 'react';
import styles from './HPBar.module.css';

interface HPBarProps {
  current: number;
  max: number;
  color?: 'green' | 'blue' | 'red'; // バーの色を任意で変更可能に
}

export const HPBar: React.FC<HPBarProps> = ({ current, max, color = 'green' }) => {
  const percent = (current / max) * 100;
  const displayPercent = Math.max(0, Math.min(100, percent)); // 0-100%にクランプ

  const colorClass = color === 'blue' 
    ? styles.barFillBlue 
    : color === 'red' 
    ? styles.barFillRed 
    : styles.barFillGreen;

  return (
    <div className={styles.barContainer}>
      <div 
        className={`${styles.barFill} ${colorClass}`}
        style={{ width: `${displayPercent}%` }}
      />
    </div>
  );
};

