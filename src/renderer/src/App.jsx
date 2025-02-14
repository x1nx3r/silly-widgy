import '@fontsource/iosevka-aile'
import { useEffect } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { FaArrowRight } from 'react-icons/fa6'
import { BsThreeDots } from 'react-icons/bs'

function App() {
  useEffect(() => {
    // Ensure Electron is available in the renderer process
    if (!window.electron) {
      console.warn('Electron IPC not available')
    }
  }, [])

  const openSettings = () => {
    window.electron.ipcRenderer.send('open-settings') // Send an IPC event to open settings
  }

  return (
    <div className="font-display flex flex-row bg-macchiato-mantle w-full h-screen overflow-hidden">
      <div className="relative flex flex-1 items-center justify-center">
        <p className="absolute left-0 px-3 text-xl text-blue-600"></p>
        <div className="absolute right-0 px-3 text-xl text-blue-600">
          <BsThreeDots />
        </div>

        <div className="flex flex-row text-xl text-blue-600 items-center justify-center">
          <FaCheck className="mx-1" />
          <p className="mx-1">Current Task: Finish This One</p>
          <FaArrowRight className="mx-1" />
        </div>
      </div>
    </div>
  )
}

export default App
