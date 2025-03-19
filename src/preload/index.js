import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args)),
  // Add task management APIs
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  updateTasks: (tasks) => ipcRenderer.invoke('update-tasks', tasks),
  addTask: (task) => ipcRenderer.invoke('add-task', task),
  removeTask: (index) => ipcRenderer.invoke('remove-task', index),
  editTask: (data) => ipcRenderer.invoke('edit-task', data),
  onTasksUpdated: (callback) =>
    ipcRenderer.on('tasks-updated', (event, ...args) => callback(...args))
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error('Error exposing APIs:', error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
