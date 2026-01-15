'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PremiumButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

export default function PremiumButton({
    children,
    onClick,
    variant = 'primary',
    loading = false,
    disabled = false,
    type = 'button',
    className = '',
}: PremiumButtonProps) {
    const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 btn-premium';

    const variantStyles = {
        primary: 'bg-accent hover:bg-accent-light text-white shadow-premium hover:shadow-glow',
        secondary: 'bg-dark-800 hover:bg-dark-700 text-white shadow-premium',
        outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
    };

    const disabledStyles = 'opacity-50 cursor-not-allowed';

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variantStyles[variant]} ${disabled || loading ? disabledStyles : ''
                } ${className}`}
            whileHover={!disabled && !loading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            ) : (
                children
            )}
        </motion.button>
    );
}
