'use client';

import { motion } from 'framer-motion';
import { Task } from '@/lib/types';
import { fadeSlideIn, hoverLift } from '@/lib/animations';

interface TodoItemProps {
    task: Task;
    onToggle: (task: Task) => void;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

export default function TodoItem({ task, onToggle, onEdit, onDelete }: TodoItemProps) {
    return (
        <motion.div
            variants={fadeSlideIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -100, height: 0 }}
            className="glass-premium-light p-4 rounded-lg group"
            whileHover="hover"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                    {/* Checkbox */}
                    <motion.button
                        onClick={() => onToggle(task)}
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-300 ${task.completed
                                ? 'bg-accent border-accent'
                                : 'border-gray-600 hover:border-accent'
                            }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {task.completed && (
                            <motion.svg
                                className="w-3 h-3 text-white"
                                viewBox="0 0 12 10"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.path
                                    d="M1 5L4.5 8.5L11 1.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </motion.svg>
                        )}
                    </motion.button>

                    {/* Task text */}
                    <span
                        className={`flex-1 truncate transition-all duration-300 ${task.completed
                                ? 'line-through text-gray-500'
                                : 'text-white'
                            }`}
                    >
                        {task.description}
                    </span>
                </div>

                {/* Action buttons - appear on hover */}
                <motion.div
                    className="flex items-center space-x-2 ml-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.button
                        onClick={() => onEdit(task)}
                        className="p-2 text-gray-400 hover:text-accent transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Edit"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </motion.button>
                    <motion.button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Delete"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </motion.button>
                </motion.div>
            </div>

            {/* Task metadata */}
            {task.created_at && (
                <div className="text-xs text-gray-500 mt-2 ml-8">
                    {new Date(task.created_at).toLocaleDateString()}
                </div>
            )}
        </motion.div>
    );
}
