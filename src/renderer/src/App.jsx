import '@fontsource/iosevka-aile'
import { useEffect } from 'react'

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
    <div className="font-display flex flex-col bg-macchiato-mantle w-full h-screen overflow-hidden">
      <div className="relative flex flex-1 items-center justify-center">
        <p className="absolute left-0 px-3 text-xl text-blue-600">Hello this is the left one</p>
        <p className="absolute right-0 px-3 text-xl text-blue-600">Hello this is the right</p>
        <p className="text-xl text-blue-600">Hello World</p>
      </div>
    </div>
  )
}

export default App
