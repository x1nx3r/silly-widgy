const { app, BrowserWindow, ipcMain, screen, globalShortcut } = require('electron')
const path = require('path')

let mainWindow
let settingsWindow
// Initialize tasks array
let tasksArray = [
  'Welcome to Silly-Widgy!',
  'Open settings with Alt+Shift+S',
  'Navigate tasks with Alt+Shift+Right'
]

app.whenReady().then(() => {
  // Get the primary display's dimensions
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize

  // Calculate the desired width and height as a percentage of the screen size
  const mainWindowWidth = Math.floor(screenWidth * 0.98)
  const mainWindowHeight = Math.floor(screenHeight * 0.05)

  // Calculate the desired position
  const mainWindowX = Math.floor((screenWidth - mainWindowWidth) / 2)
  const mainWindowY = screenHeight - 10

  // Create the main window
  mainWindow = new BrowserWindow({
    width: mainWindowWidth,
    height: mainWindowHeight,
    x: mainWindowX,
    y: mainWindowY,
    movable: false,
    frame: false,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    transparent: true,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // Now that mainWindow exists, we can set up its events
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.setIgnoreMouseEvents(true, { forward: true })
    // Send initial tasks
    mainWindow.webContents.send('tasks-updated', tasksArray)
  })

  // Load main React app
  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  // Register global shortcuts
  globalShortcut.register('Alt+Shift+Right', () => {
    mainWindow.webContents.send('next-task')
  })

  globalShortcut.register('Alt+Shift+S', () => {
    mainWindow.webContents.send('open-settings')
  })
})

// Add IPC handlers
ipcMain.handle('get-tasks', async () => {
  try {
    return { success: true, tasks: tasksArray }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('update-tasks', async (event, newTasks) => {
  try {
    tasksArray = newTasks
    mainWindow.webContents.send('tasks-updated', tasksArray)
    return { success: true, tasks: tasksArray }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('add-task', async (event, task) => {
  try {
    tasksArray.push(task)
    mainWindow.webContents.send('tasks-updated', tasksArray)
    return { success: true, tasks: tasksArray }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('remove-task', async (event, index) => {
  try {
    tasksArray.splice(index, 1)
    mainWindow.webContents.send('tasks-updated', tasksArray)
    return { success: true, tasks: tasksArray }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('edit-task', async (event, { index, newText }) => {
  try {
    tasksArray[index] = newText
    mainWindow.webContents.send('tasks-updated', tasksArray)
    return { success: true, tasks: tasksArray }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

// Handle IPC event to open settings window
ipcMain.on('open-settings', () => {
  if (settingsWindow) {
    settingsWindow.focus() // Bring to front if already open
    return
  }

  // Get the primary display's dimensions
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize

  // Calculate the desired width and height as a percentage of the screen size
  const settingsWindowWidth = Math.floor(screenWidth * 0.5) // 50% of screen width
  const settingsWindowHeight = Math.floor(screenHeight * 0.8) // 50% of screen height

  // Calculate the desired position to anchor the window at the bottom
  const settingsWindowX = Math.floor((screenWidth - settingsWindowWidth) / 2) // Center horizontally
  const settingsWindowY = screenHeight - settingsWindowHeight // Align to bottom

  settingsWindow = new BrowserWindow({
    width: settingsWindowWidth,
    height: settingsWindowHeight,
    x: settingsWindowX,
    y: settingsWindowY,
    parent: mainWindow, // Makes it a child window
    modal: false,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  settingsWindow.once('ready-to-show', () => {
    settingsWindow.show()
  })

  // Load React Settings Page
  if (process.env.ELECTRON_RENDERER_URL) {
    settingsWindow.loadURL(`${process.env.ELECTRON_RENDERER_URL}/#/settings`)
  } else {
    settingsWindow.loadFile(path.join(__dirname, '../renderer/index.html'), { hash: 'settings' })
  }

  settingsWindow.on('closed', () => {
    settingsWindow = null // Cleanup
  })
})

// Unregister all shortcuts when the app quits
app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
