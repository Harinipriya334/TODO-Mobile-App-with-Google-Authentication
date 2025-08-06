import React, { createContext, useContext, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Read a book',
      description: 'Finish reading the latest productivity book',
      completed: false,
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Finish project report',
      description: 'Complete the quarterly report for the project',
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      priority: 'high',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Plan project kickoff meeting',
      description: 'Schedule and prepare agenda for the team meeting',
      completed: true,
      dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
      priority: 'low',
      createdAt: new Date().toISOString(),
    },
  ]);

  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      toggleTask,
      deleteTask,
      updateTask,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}