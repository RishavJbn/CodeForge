# CodeForge - Interactive JavaScript Code Editor

A VS Code-inspired online code editor built with React and Monaco Editor, featuring real-time code execution and file management.

## ✨ Features

### 🎯 Interactive File Management

- **Custom File Names**: When clicking the + button, a modal prompts you to enter a custom file name
- **File Renaming**: Rename any file by clicking the edit icon
- **File Download**: Download files to your local system
- **File Deletion**: Remove unwanted files (with protection against deleting the last file)
- **Smart File Detection**: Automatically detects .js and .json file types

### ⌨️ Keyboard Shortcuts

- **Ctrl+Enter** (or Cmd+Enter): Run current file
- **Ctrl+\\** (or Cmd+\\): Toggle sidebar/file explorer
- **Ctrl+`** (or Cmd+`): Toggle output terminal
- **Enter**: Submit in modal dialogs
- **Escape**: Cancel modal dialogs

### 🎨 Enhanced UI/UX

- Hover effects on file items reveal action buttons (rename, download, delete)
- Smooth animations for modals and UI elements
- "Copied!" confirmation when copying output
- Clear visual feedback for all interactions
- Terminal toggle button when output panel is closed
- Better placeholder messages with keyboard shortcut hints

### 🔧 Output Panel Features

- **Copy Output**: Copy execution results or errors to clipboard
- **Clear Output**: Clear the output panel
- **Show/Hide Terminal**: Toggle output visibility
- Real-time execution feedback
- Color-coded success and error messages

### 💻 Code Editor

- Monaco Editor with VS Code-like experience
- Syntax highlighting for JavaScript and JSON
- Auto-formatting and IntelliSense
- Dark theme optimized for long coding sessions

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎮 Usage

1. **Create a New File**: Click the + button in the sidebar, enter your file name
2. **Edit Code**: Click on any file to edit in the Monaco editor
3. **Run Code**: Click the Run button or press Ctrl+Enter
4. **Manage Files**: Hover over files to see rename, download, and delete options
5. **View Output**: Check the output panel at the bottom for execution results

## 🛠️ Tech Stack

- React 18
- Monaco Editor (VS Code's editor)
- Vite (Build tool)
- Lucide React (Icons)
- Axios (HTTP client)

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
