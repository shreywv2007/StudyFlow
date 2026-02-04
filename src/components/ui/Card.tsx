import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
interface CardProps extends HTMLMotionProps<'div'> {
  gradientBorder?: boolean;
  hoverEffect?: boolean;
}
export function Card({
  children,
  className = '',
  gradientBorder = false,
  hoverEffect = true,
  ...props
}: CardProps) {
  return (
    <motion.div
      initial={
      hoverEffect ?
      {
        y: 0
      } :
      undefined
      }
      whileHover={
      hoverEffect ?
      {
        y: -5,
        boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      } :
      undefined
      }
      className={`relative bg-white rounded-2xl overflow-hidden ${className} ${!gradientBorder ? 'shadow-md border border-gray-100' : ''}`}
      {...props}>

      {gradientBorder &&
      <div className="absolute inset-0 p-[2px] rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-500 opacity-100 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-white rounded-2xl" />
        </div>
      }
      <div
        className={`relative z-10 ${gradientBorder ? 'bg-white h-full rounded-2xl' : ''}`}>

        {children}
      </div>
    </motion.div>);

}