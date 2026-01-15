'use client';

import { motion } from 'framer-motion';

interface FloatingAddButtonProps {
    onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full shadow-3d-lg flex items-center justify-center text-white text-3xl font-bold z-50 btn-neon text-neon-blue"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                +
            </motion.div>
        </motion.button>
    );
}
