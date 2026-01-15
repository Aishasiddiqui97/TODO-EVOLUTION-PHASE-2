'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AIPanelProps {
    taskCount?: number;
    highPriorityCount?: number;
}

export default function AIPanel({ taskCount = 0, highPriorityCount = 0 }: AIPanelProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const messages = [
        `You have ${highPriorityCount} high-priority tasks. Stay focused! 🎯`,
        `Great progress! ${taskCount} tasks in your workflow. 📈`,
        `Pro tip: Break large tasks into smaller chunks. ✨`,
        `Time to tackle that high-priority task! 💪`,
    ];

    const currentMessage = messages[currentIndex % messages.length];

    useEffect(() => {
        let charIndex = 0;
        const interval = setInterval(() => {
            if (charIndex <= currentMessage.length) {
                setDisplayText(currentMessage.substring(0, charIndex));
                charIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setCurrentIndex((prev) => prev + 1);
                }, 3000);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [currentIndex, currentMessage]);

    return (
        <motion.div
            className="glass-neon-glow p-6 rounded-2xl border-2 border-neon-purple"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🤖</div>
                <h3 className="text-xl font-black text-transparent bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text neon-text-sm">
                    AI Evolution
                </h3>
            </div>

            {/* AI Message with Typing Effect */}
            <div className="glass-neon p-4 rounded-xl mb-4 min-h-[80px]">
                <p className="text-gray-200 text-sm leading-relaxed">
                    {displayText}
                    <motion.span
                        className="inline-block w-0.5 h-4 bg-neon-purple ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
                <motion.button
                    className="w-full px-4 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-bold text-sm btn-neon text-neon-blue"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                >
                    🔄 Reschedule Tasks
                </motion.button>
                <motion.button
                    className="w-full px-4 py-3 bg-gradient-to-r from-neon-purple to-neon-orange text-white rounded-xl font-bold text-sm btn-neon text-neon-purple"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                >
                    ✨ Auto-plan My Day
                </motion.button>
            </div>

            {/* Insights */}
            <div className="mt-4 pt-4 border-t border-neon-purple/30">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Productivity Score</span>
                    <span className="text-neon-purple font-bold neon-text-sm">
                        {taskCount > 0 ? '85%' : '0%'} 🔥
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
