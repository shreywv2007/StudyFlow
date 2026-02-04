import React from 'react';
import { motion } from 'framer-motion';
interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showValue?: boolean;
  label?: string;
}
export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#EC4899',
  // Pink default
  trackColor = '#F3F4F6',
  showValue = true,
  label
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress / 100 * circumference;
  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{
        width: size,
        height: size
      }}>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90">

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round" />

        {/* Progress */}
        <motion.circle
          initial={{
            strokeDashoffset: circumference
          }}
          animate={{
            strokeDashoffset: offset
          }}
          transition={{
            duration: 1.5,
            ease: 'easeOut'
          }}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round" />

      </svg>
      {showValue &&
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-gray-900">{progress}%</span>
          {label &&
        <span className="text-xs text-gray-500 font-medium">{label}</span>
        }
        </div>
      }
    </div>);

}