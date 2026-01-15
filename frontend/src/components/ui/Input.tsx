/**
 * Simple Input Component
 */

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'neon';

export interface InputProps {
  size?: InputSize;
  variant?: InputVariant;
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg',
};

const variantStyles: Record<InputVariant, string> = {
  default: `
    bg-gray-900/50 
    border border-gray-600 
    text-white 
    placeholder-gray-400
    focus:border-neon-blue 
    focus:ring-2 
    focus:ring-neon-blue/30
  `,
  neon: `
    bg-transparent 
    border-2 border-neon-blue/50 
    text-neon-blue 
    placeholder-neon-blue/50
    focus:border-neon-blue 
    focus:ring-2 
    focus:ring-neon-blue/30
    shadow-lg shadow-neon-blue/20
  `,
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'default',
      label,
      error,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-neon-red ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <motion.input
            ref={ref}
            className={`
              ${sizeStyles[size]}
              ${variantStyles[variant]}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              w-full
              rounded-xl
              transition-all duration-300
              outline-none
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <motion.p
            className="mt-2 text-sm text-neon-red"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
