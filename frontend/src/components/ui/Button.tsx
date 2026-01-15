/**
 * Simple Button Component
 */

import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-neon-blue to-neon-purple 
    text-white font-semibold
    shadow-lg shadow-neon-blue/30 
    hover:shadow-neon-blue/50
    border-2 border-transparent
  `,
  secondary: `
    bg-transparent 
    text-neon-blue 
    font-semibold
    border-2 border-neon-blue
    hover:bg-neon-blue/10
    shadow-lg shadow-neon-blue/20
  `,
  danger: `
    bg-gradient-to-r from-neon-red to-red-600
    text-white font-semibold
    shadow-lg shadow-neon-red/30 
    border-2 border-transparent
  `,
  success: `
    bg-gradient-to-r from-neon-green to-green-600
    text-black font-semibold
    shadow-lg shadow-neon-green/30
    border-2 border-transparent
  `,
  ghost: `
    bg-transparent
    text-gray-300
    font-medium
    border-2 border-transparent
    hover:bg-white/5
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText = 'Loading...',
      leftIcon,
      rightIcon,
      children,
      fullWidth = false,
      disabled,
      onClick,
      type = 'button'
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        className={`
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          relative overflow-hidden
          transition-all duration-300 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-4 focus:ring-neon-blue/30
          inline-flex items-center justify-center gap-2
        `}
        disabled={isDisabled}
        onClick={onClick}
        type={type}
        whileHover={!isDisabled ? { scale: 1.02, y: -1 } : {}}
        whileTap={!isDisabled ? { scale: 0.98, y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <span className="relative flex items-center gap-2">
          {isLoading && (
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          )}
          {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{isLoading ? loadingText : children}</span>
          {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
