function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <div className="flex flex-col bg-macchiato-mantle w-full min-h-screen overflow-auto">
      <div className="flex flex-col m-auto p-3 shadow-md bg-red-600 items-center justify-center">
        <p className="p-2 text-3xl text-blue-600">Hello World</p>
      </div>
    </div>
  )
}

export default App
