'use client';

import { motion } from 'framer-motion';
import { Task } from '@/lib/types';

interface KanbanColumnProps {
    title: string;
    tasks: Task[];
    color: string;
    onTaskClick?: (task: Task) => void;
    onTaskToggle?: (task: Task) => void;
    onTaskDelete?: (taskId: string) => void;
}

export default function KanbanColumn({
    title,
    tasks,
    color,
    onTaskClick,
    onTaskToggle,
    onTaskDelete,
}: KanbanColumnProps) {
    const colorMap: Record<string, string> = {
        'neon-blue': 'border-neon-blue text-neon-blue',
        'neon-orange': 'border-neon-orange text-neon-orange',
        'neon-purple': 'border-neon-purple text-neon-purple',
        'neon-green': 'border-neon-green text-neon-green',
    };

    const priorityColors: Record<string, string> = {
        high: 'bg-neon-red',
        medium: 'bg-neon-yellow',
        low: 'bg-neon-green',
    };

    return (
        <div className="flex-1 min-w-[280px]">
            {/* Column Header */}
            <div className={`glass-neon-glow p-4 rounded-t-2xl border-t-4 ${colorMap[color]}`}>
                <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-black ${colorMap[color]} neon-text-sm`}>
                        {title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full glass-neon text-sm font-bold ${colorMap[color]}`}>
                        {tasks.length}
                    </span>
                </div>
            </div>

            {/* Tasks Container */}
            <div className="glass-neon p-4 rounded-b-2xl min-h-[400px] space-y-3">
                {tasks.map((task, index) => (
                    <motion.div
                        key={task.id}
                        className="glass-neon-glow p-4 rounded-xl cursor-pointer card-3d relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        onClick={() => onTaskClick?.(task)}
                    >
                        {/* Priority Strip */}
                        <div
                            className={`absolute left-0 top-0 bottom-0 w-1 ${priorityColors[(task as any).priority || 'low']
                                }`}
                        />

                        {/* Task Content */}
                        <div className="ml-3">
                            <div className="flex items-start justify-between mb-2">
                                <p className="text-white font-medium flex-1 pr-2">
                                    {task.description}
                                </p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onTaskToggle?.(task);
                                    }}
                                    className={`flex-shrink-0 w-5 h-5 rounded border-2 ${task.completed
                                            ? 'bg-neon-green border-neon-green'
                                            : 'border-gray-500 hover:border-neon-blue'
                                        } transition-all duration-300`}
                                >
                                    {task.completed && (
                                        <svg className="w-full h-full text-white" viewBox="0 0 12 10" fill="none">
                                            <path
                                                d="M1 5L4.5 8.5L11 1.5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Priority Badge */}
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className={`px-2 py-1 text-xs font-bold rounded-full ${priorityColors[(task as any).priority || 'low']
                                        } text-black`}
                                >
                                    {((task as any).priority || 'low').toUpperCase()}
                                </span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {['Work', 'Study'].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-xs rounded-full glass-neon border border-neon-purple/50 text-neon-purple"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Date */}
                            {task.created_at && (
                                <div className="text-xs text-gray-500 mt-2">
                                    {new Date(task.created_at).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}

                {tasks.length === 0 && (
                    <div className="text-center py-12 text-gray-600">
                        <div className="text-4xl mb-2">📭</div>
                        <p className="text-sm">No tasks</p>
                    </div>
                )}
            </div>
        </div>
    );
}
