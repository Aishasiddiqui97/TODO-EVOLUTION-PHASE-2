'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingLabelProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

export default function FloatingLabel({
    label,
    type = 'text',
    value,
    onChange,
    error,
    placeholder = '',
    required = false,
    className = '',
}: FloatingLabelProps) {
    const [isFocused, setIsFocused] = useState(false);
    const isFloating = isFocused || value.length > 0;

    return (
        <div className={`relative ${className}`}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isFloating ? placeholder : ''}
                required={required}
                className={`w-full px-4 py-3 bg-dark-850 border-2 rounded-lg text-white placeholder-gray-500 transition-all duration-300 ${error
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-dark-700 focus:border-accent'
                    } ${isFloating ? 'pt-6 pb-2' : ''}`}
            />
            <motion.label
                className={`absolute left-4 pointer-events-none transition-all duration-300 ${error ? 'text-red-500' : isFloating ? 'text-accent' : 'text-gray-400'
                    }`}
                animate={{
                    top: isFloating ? '0.5rem' : '50%',
                    fontSize: isFloating ? '0.75rem' : '1rem',
                    y: isFloating ? 0 : '-50%',
                }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
                {label}
                {required && ' *'}
            </motion.label>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-sm mt-1 ml-1"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
