const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow
let settingsWindow

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // Load main React app
  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
})

// Handle IPC event to open settings window
ipcMain.on('open-settings', () => {
  if (settingsWindow) {
    settingsWindow.focus() // Bring to front if already open
    return
  }

  settingsWindow = new BrowserWindow({
    width: 600,
    height: 500,
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
