'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    isOpen?: boolean;
}

export default function Sidebar({ isOpen = true }: SidebarProps) {
    const pathname = usePathname();

    const navItems = [
        { icon: '🏠', label: 'Dashboard', href: '/todos' },
        { icon: '📋', label: 'My Todos', href: '/todos' },
        { icon: '📅', label: 'Calendar', href: '/todos' },
        { icon: '🤖', label: 'AI Assistant', href: '/todos' },
        { icon: '📊', label: 'Analytics', href: '/todos' },
        { icon: '⚙️', label: 'Settings', href: '/todos' },
    ];

    return (
        <motion.aside
            className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-20 glass-neon-glow border-r border-neon-purple/30 z-40"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <nav className="flex flex-col items-center py-8 space-y-6">
                {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.label} href={item.href}>
                            <motion.div
                                className={`relative group cursor-pointer`}
                                whileHover={{ scale: 1.2, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* Icon */}
                                <div
                                    className={`text-4xl transition-all duration-300 ${isActive
                                            ? 'drop-shadow-[0_0_20px_currentColor] text-neon-blue'
                                            : 'text-gray-400 group-hover:text-neon-purple group-hover:drop-shadow-[0_0_15px_currentColor]'
                                        }`}
                                >
                                    {item.icon}
                                </div>

                                {/* Active indicator */}
                                {isActive && (
                                    <motion.div
                                        className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-neon-blue to-neon-purple rounded-r-full"
                                        layoutId="activeIndicator"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                {/* Tooltip */}
                                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="glass-neon px-4 py-2 rounded-lg whitespace-nowrap">
                                        <span className="text-sm font-semibold text-neon-blue neon-text-sm">
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>
        </motion.aside>
    );
}
