// src/renderer/src/components/SettingsPage.jsx
import { useState, useEffect } from 'react'

function SettingsPage() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    // Load initial tasks
    loadTasks()

    // Set up listener for task updates
    const updateListener = (newTasks) => {
      setTasks(newTasks)
    }

    window.api.on('tasks-updated', updateListener)

    // Cleanup listener when component unmounts
    return () => {
      // If you have a way to remove listeners, implement it here
      // window.api.removeListener('tasks-updated', updateListener)
    }
  }, [])

  const loadTasks = async () => {
    const result = await window.api.getTasks()
    if (result.success) {
      setTasks(result.tasks)
    }
  }

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const result = await window.api.addTask(newTask.trim())
      if (result.success) {
        setTasks(result.tasks) // Update local state with new tasks
        setNewTask('') // Clear input
      }
    }
  }

  const handleRemoveTask = async (index) => {
    const result = await window.api.removeTask(index)
    if (result.success) {
      setTasks(result.tasks) // Update local state with new tasks
    }
  }

  const handleEditTask = async (index, newText) => {
    const result = await window.api.editTask({ index, newText })
    if (result.success) {
      setTasks(result.tasks) // Update local state with new tasks
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  return (
    <div className="min-h-screen bg-color-macchiato-base p-6 font-display">
      <div className="max-w-3xl mx-auto bg-color-macchiato-mantle rounded-lg shadow-lg p-6 border border-color-macchiato-surface0">
        <h1 className="text-2xl font-bold text-color-lavender mb-6 text-center">Task Settings</h1>

        {/* Add new task section */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter new task"
            className="flex-1 px-4 py-2 bg-color-macchiato-surface0 text-color-text
                       border border-color-macchiato-surface1 rounded-md
                       placeholder-color-overlay0
                       focus:outline-none focus:ring-2 focus:ring-color-blue
                       focus:border-transparent transition-colors duration-200"
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-color-blue text-color-macchiato-base rounded-md
                       hover:bg-color-sapphire transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-color-blue focus:ring-offset-2
                       focus:ring-offset-color-macchiato-base"
          >
            Add Task
          </button>
        </div>

        {/* Task list */}
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-color-macchiato-surface0
                         rounded-lg group hover:bg-color-macchiato-surface1
                         transition-colors duration-200 border border-color-macchiato-surface1"
            >
              <input
                type="text"
                value={task}
                onChange={(e) => handleEditTask(index, e.target.value)}
                className="flex-1 px-3 py-2 bg-transparent text-color-text
                           border border-color-macchiato-surface2 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-color-blue
                           focus:border-transparent transition-colors duration-200"
              />
              <button
                onClick={() => handleRemoveTask(index)}
                className="p-2 text-color-maroon hover:text-color-red
                           hover:bg-color-macchiato-surface2/50 rounded-md
                           transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-color-red
                           focus:ring-offset-2 focus:ring-offset-color-macchiato-surface0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-color-overlay0 italic">
              No tasks yet. Add some tasks to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsPage
