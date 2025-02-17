import '@fontsource/iosevka-aile'
import { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { FaArrowRight } from 'react-icons/fa6'
import { BsThreeDots } from 'react-icons/bs'

function App() {
  const [tasks, setTasks] = useState(['One', 'Two', 'Three', 'Four'])
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)

  // Function to cycle tasks correctly
  const handleNextTask = () => {
    setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % tasks.length)
  }

  const handleOpenSettings = () => {
    window.electron.ipcRenderer.send('open-settings')
  }

  useEffect(() => {
    // Ensure we remove existing listeners before adding new ones
    window.electron.ipcRenderer.removeAllListeners('next-task')
    window.electron.ipcRenderer.removeAllListeners('open-settings')
    window.electron.ipcRenderer.removeAllListeners('tasks-updated')

    // Now, add the correct listeners
    window.electron.ipcRenderer.on('next-task', handleNextTask)
    window.electron.ipcRenderer.on('open-settings', handleOpenSettings)
    window.electron.ipcRenderer.on('tasks-updated', (event, newTasks) => {
      setTasks(newTasks)
      setCurrentTaskIndex(0) // Reset to the first task
    })

    return () => {
      window.electron.ipcRenderer.removeListener('next-task', handleNextTask)
      window.electron.ipcRenderer.removeListener('open-settings', handleOpenSettings)
      window.electron.ipcRenderer.removeListener('tasks-updated', (event, newTasks) => {
        setTasks(newTasks)
        setCurrentTaskIndex(0)
      })
    }
  }, []) // Runs once when the component mounts

  return (
    <div className="font-display flex flex-row bg-macchiato-mantle w-full h-screen overflow-hidden">
      <div className="relative flex flex-1 items-center justify-center">
        <div className="absolute right-0 px-3 text-xl text-blue-600"></div>

        <div className="flex flex-row text-xl text-white">
          <p className="mx-1">Current Task: {tasks[currentTaskIndex]}</p>
          <button onClick={handleNextTask} className="focus:outline-none ml-2">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
