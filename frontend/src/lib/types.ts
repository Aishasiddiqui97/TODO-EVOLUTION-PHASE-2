// Define the Task type based on the backend model
export interface Task {
  id: string;
  description: string;
  completed: boolean;
  user_id: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  priority?: 'low' | 'medium' | 'high'; // Optional priority for UI
}

// Define the type for creating a new task
export interface CreateTaskData {
  description: string;
}

// Define the type for updating a task
export interface UpdateTaskData {
  description?: string;
  completed?: boolean;
}

// Define the type for user authentication
export interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}