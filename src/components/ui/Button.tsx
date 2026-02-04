import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:
    'bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 text-white shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 border-none',
    secondary:
    'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm',
    outline:
    'bg-transparent border-2 border-fuchsia-500 text-fuchsia-600 hover:bg-fuchsia-50',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg'
  };
  return (
    <motion.button
      whileHover={{
        scale: disabled || isLoading ? 1 : 1.02
      }}
      whileTap={{
        scale: disabled || isLoading ? 1 : 0.98
      }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}>

      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>);

}