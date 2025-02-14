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
    <div className="font-display flex flex-col bg-macchiato-mantle w-full min-h-screen overflow-auto">
      <div className="flex flex-col m-auto p-3 shadow-md items-center justify-center">
        <p className="p-2 text-3xl text-blue-600">Hello World</p>
        <button
          onClick={openSettings}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition"
        >
          Open Settings
        </button>
      </div>
    </div>
  )
}

export default App
