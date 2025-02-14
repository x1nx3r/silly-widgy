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
      <div className="flex flex-1 items-center justify-center">
        <p className="mr-auto ml-0 px-2 text-xl text-blue-600">Hello this is the left one</p>
        <p className="mx-auto text-xl text-blue-600">Hello World</p>
        <p className="ml-auto mr-0 px-2 text-xl text-blue-600">Hello this is the right one</p>
      </div>
    </div>
  )
}

export default App
