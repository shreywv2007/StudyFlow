import React from 'react';
import { motion } from 'framer-motion';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}
export function Input({
  label,
  error,
  icon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label &&
      <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
          {label}
        </label>
      }
      <div className="relative group">
        {icon &&
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-fuchsia-500 transition-colors">
            {icon}
          </div>
        }
        <motion.input
          whileFocus={{
            scale: 1.01
          }}
          className={`w-full bg-gray-50 border-2 border-gray-100 text-gray-900 rounded-xl py-3 ${icon ? 'pl-10' : 'pl-4'} pr-4 focus:outline-none focus:border-fuchsia-500 focus:bg-white transition-all placeholder:text-gray-400 ${error ? 'border-red-500 bg-red-50' : ''} ${className}`}
          {...props} />

      </div>
      {error && <p className="mt-1 text-sm text-red-500 ml-1">{error}</p>}
    </div>);

}