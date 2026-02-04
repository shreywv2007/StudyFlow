import React from 'react';
import { Card } from './ui/Card';
import { motion } from 'framer-motion';
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}
export function StatCard({
  title,
  value,
  subtitle,
  icon,
  gradient,
  delay = 0
}: StatCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay,
        duration: 0.4
      }}>

      <Card className="p-6 h-full flex flex-col justify-between" hoverEffect>
        <div className="flex justify-between items-start mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>

            {icon}
          </div>
          {subtitle &&
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500">
              {subtitle}
            </span>
          }
        </div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </Card>
    </motion.div>);

}