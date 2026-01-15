/**
 * Simple Card Component
 */

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export type CardVariant = 'default' | 'glass' | 'neon' | 'solid';
export type CardPadding = 'sm' | 'md' | 'lg';
export type GlowColor = 'blue' | 'purple' | 'pink' | 'green';

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  hoverEffect?: boolean;
  glowColor?: GlowColor;
  padding?: CardPadding;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-gray-900/50 border border-gray-700/50 backdrop-blur-sm',
  glass: 'bg-white/5 border border-white/10 backdrop-blur-md',
  neon: 'bg-gray-900/80 border-2 border-neon-blue/50 shadow-lg shadow-neon-blue/20',
  solid: 'bg-gray-800 border border-gray-600',
};

const paddingStyles: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const glowStyles: Record<GlowColor, string> = {
  blue: 'hover:shadow-neon-blue/30 hover:border-neon-blue/70',
  purple: 'hover:shadow-neon-purple/30 hover:border-neon-purple/70',
  pink: 'hover:shadow-neon-pink/30 hover:border-neon-pink/70',
  green: 'hover:shadow-neon-green/30 hover:border-neon-green/70',
};

export const Card = ({
  children,
  variant = 'default',
  hoverEffect = true,
  glowColor = 'blue',
  padding = 'md',
  className = ''
}: CardProps) => {
  return (
    <motion.div
      className={`
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hoverEffect ? glowStyles[glowColor] : ''}
        ${className}
        rounded-xl
        transition-all duration-300
        ${hoverEffect ? 'hover:scale-[1.01]' : ''}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={hoverEffect ? { y: -4 } : {}}
    >
      {children}
    </motion.div>
  );
};
