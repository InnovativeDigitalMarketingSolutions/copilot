'use client';

import React, { createContext, useContext, useState } from "react"

interface Task {
  id: string
  name: string
  status: "pending" | "running" | "completed"
}

interface TaskContextProps {
  tasks: Task[]
  addTask: (task: Task) => void
  updateTask: (id: string, status: Task["status"]) => void
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const updateTask = (id: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    )
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}