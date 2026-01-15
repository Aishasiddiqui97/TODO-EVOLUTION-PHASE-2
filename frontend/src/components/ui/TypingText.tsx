'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
    texts: string[];
    speed?: number;
    loop?: boolean;
    className?: string;
    onComplete?: () => void;
}

export default function TypingText({
    texts,
    speed = 100,
    loop = true,
    className = '',
    onComplete,
}: TypingTextProps) {
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const currentText = texts[textIndex];
        const typingSpeed = isDeleting ? speed / 2 : speed;
        const pauseDuration = isDeleting ? 500 : 2000;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentText.length) {
                    setDisplayText(currentText.substring(0, displayText.length + 1));
                } else {
                    if (!loop && textIndex === texts.length - 1) {
                        setIsComplete(true);
                        if (onComplete) onComplete();
                        return;
                    }
                    setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(currentText.substring(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, textIndex, texts, speed, loop, onComplete]);

    return (
        <span className={className}>
            {displayText}
            {!isComplete && (
                <motion.span
                    className="ml-1 inline-block w-0.5 h-6 bg-accent"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            )}
        </span>
    );
}
