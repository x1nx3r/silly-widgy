const { app, BrowserWindow, ipcMain, screen, globalShortcut } = require('electron')
const fs = require('fs')
const path = require('path')

let mainWindow
let settingsWindow

app.whenReady().then(() => {
  // Check if settings.md exists in the root directory
  const settingsFilePath = path.join(app.getAppPath(), 'settings.md')
  if (!fs.existsSync(settingsFilePath)) {
    // Create settings.md with a template if it doesn't exist
    const templateContent =
      '# Settings\n\nThis is the settings file. You can customize your settings here.'
    fs.writeFileSync(settingsFilePath, templateContent, 'utf-8')
  }

  // Get the primary display's dimensions
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize

  // Calculate the desired width and height as a percentage of the screen size
  const mainWindowWidth = Math.floor(screenWidth * 0.98) // 98% of screen width, 1568 pixels if 1600x900
  const mainWindowHeight = Math.floor(screenHeight * 0.05) // 5% of screen height, 45 pixels if 1600x900

  // Calculate the desired position to anchor the window at the bottom
  const mainWindowX = Math.floor((screenWidth - mainWindowWidth) / 2) // Center horizontally
  const mainWindowY = screenHeight - 10 // Align to bottom

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

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    // Make the transparent parts of the window click-through
    mainWindow.setIgnoreMouseEvents(true, { forward: true })
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

// Handle IPC event to save markdown content
ipcMain.handle('save-markdown', async (event, markdownContent) => {
  const filePath = path.join(app.getAppPath(), 'settings.md')
  fs.writeFileSync(filePath, markdownContent, 'utf-8')

  // Parse tasks from markdown content
  const taskRegex = /^- (.+)$/gm
  const tasks = []
  let match
  while ((match = taskRegex.exec(markdownContent)) !== null) {
    tasks.push(match[1])
  }

  // Send tasks to renderer process
  mainWindow.webContents.send('tasks-updated', tasks)

  return { success: true, filePath, tasks }
})
// Handle IPC event to load markdown content
ipcMain.handle('load-markdown', async () => {
  const filePath = path.join(app.getAppPath(), 'settings.md')
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return { success: true, content }
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
