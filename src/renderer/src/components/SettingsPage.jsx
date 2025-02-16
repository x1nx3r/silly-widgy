import { useState, useEffect, useRef } from 'react'
import EasyMDE from 'easyMDE'
import 'easymde/dist/easymde.min.css' // Import the EasyMDE CSS
import 'font-awesome/css/font-awesome.min.css'
import ReactMarkdown from 'react-markdown'

function SettingsPage() {
  const [markdownContent, setMarkdownContent] = useState('')
  const editorRef = useRef(null)
  const [editor, setEditor] = useState(null)

  useEffect(() => {
    // Load the content of settings.md
    const loadSettings = async () => {
      const result = await window.electron.ipcRenderer.invoke('load-markdown')
      if (result.success) {
        setMarkdownContent(result.content)
      } else {
        console.error('Failed to load markdown content')
      }
    }

    loadSettings()

    // Initialize EasyMDE editor
    const easyMDE = new EasyMDE({
      element: editorRef.current,
      initialValue: markdownContent,
      spellChecker: false,
      status: false,
      placeholder: 'Write your tasks in markdown format...',
      autosave: {
        enabled: true,
        uniqueId: 'settingsEditor',
        delay: 1000
      },
      toolbar: [
        'bold',
        'italic',
        'heading',
        '|',
        'quote',
        'code',
        'unordered-list',
        'ordered-list',
        '|',
        'link',
        'image',
        'table',
        '|',
        'guide'
      ],
      // Modify toolbar icon color using Tailwind's text color utility
      toolbarTips: true,
      hideIcons: ['guide'],
      // Modify the icons' color through the toolbar's class
      toolbarClass: 'text-black' // Use black color for toolbar icons
    })

    setEditor(easyMDE)

    return () => {
      easyMDE.toTextArea()
    }
  }, [])

  const handleSave = async () => {
    if (editor) {
      const newMarkdown = editor.value()
      setMarkdownContent(newMarkdown)
      console.log('Saved markdown content:', newMarkdown)

      // Send the markdown content to the main process to save it
      const result = await window.electron.ipcRenderer.invoke('save-markdown', newMarkdown)
      if (result.success) {
        console.log('Markdown content saved to:', result.filePath)
      } else {
        console.error('Failed to save markdown content')
      }
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
      <h2 className="text-3xl font-semibold mb-4">Settings</h2>
      <p className="mb-6">Modify your application preferences in markdown format.</p>

      <div className="flex">
        {/* EasyMDE Editor */}
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md mr-4">
          <textarea ref={editorRef} />
        </div>

        {/* Markdown Viewer */}
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default SettingsPage
