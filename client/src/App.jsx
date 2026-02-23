import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import {
  Play,
  Folder,
  FileJson,
  FileType2,
  Terminal,
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  Download,
  Copy,
  X,
  Edit2,
  XCircle,
} from "lucide-react";
import "./App.css";

// Initial mock files
const initialFiles = [
  {
    id: "1",
    name: "script.js",
    language: "javascript",
    content:
      'console.log("Hello, World!");\n\nconst greet = (name) => {\n  return `Hello, ${ name } !`;\n}\n\nconsole.log(greet("VS Code Fan"));\n',
  },
  {
    id: "2",
    name: "utils.js",
    language: "javascript",
    content:
      'export const add = (a, b) => a + b;\n\nconsole.log("Testing utils...", add(5, 7));\n',
  },
];

function App() {
  const [files, setFiles] = useState(initialFiles);
  const [activeFileId, setActiveFileId] = useState(initialFiles[0].id);

  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasExecuted, setHasExecuted] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" or "rename"
  const [modalInput, setModalInput] = useState("");
  const [editingFileId, setEditingFileId] = useState(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const activeFile = files.find((f) => f.id === activeFileId);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Enter or Cmd+Enter to run code
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
      // Ctrl+\ or Cmd+\ to toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === "\\") {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
      }
      // Ctrl+` or Cmd+` to toggle terminal
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFile]);

  const handleEditorChange = (value) => {
    setFiles(
      files.map((f) => (f.id === activeFileId ? { ...f, content: value } : f)),
    );
  };

  const addNewFile = () => {
    const newId = Date.now().toString();
    const newFile = {
      id: newId,
      name: `untitled - ${files.length + 1}.js`,
      language: "javascript",
      content: "// write your code here",
    };
    setFiles([...files, newFile]);
    setActiveFileId(newId);
  };

  const runCode = async () => {
    if (!activeFile) return;

    setIsLoading(true);
    setError("");
    setOutput("");
    setHasExecuted(false);
    setTerminalOpen(true); // Ensure terminal is visible when running

    try {
      // Send the currently active file's content
      const response = await axios.post("http://localhost:4000/run", {
        code: activeFile.content,
      });
      if (response.data.success) {
        setOutput(response.data.output);
        setHasExecuted(true);
      } else {
        setError(response.data.error || "Execution failed");
        setOutput(response.data.output);
        setHasExecuted(true);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Server error");
        setOutput(err.response.data.output || "");
      } else {
        setError(
          err.message || "An error occurred while connecting to the server",
        );
      }
      setHasExecuted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vscode-container">
      {/* Activity Bar (Thin left strip) */}
      <div className="activity-bar">
        <div
          className={`activity - icon ${sidebarOpen ? "active" : ""} `}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title="Explorer"
        >
          <Folder size={24} strokeWidth={1.5} />
        </div>
        <div style={{ flex: 1 }}></div>
      </div>

      {/* Sidebar (File Explorer) */}
      {sidebarOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <span>EXPLORER</span>
            <button
              className="icon-button"
              onClick={addNewFile}
              title="New File"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="sidebar-section">
            <div className="section-header">
              <ChevronDown size={14} />
              <span>JS-CODEFORGE</span>
            </div>
            <div className="file-list">
              {files.map((file) => (
                <div
                  key={file.id}
                  className={`file - item ${file.id === activeFileId ? "active" : ""} `}
                  onClick={() => setActiveFileId(file.id)}
                >
                  {file.name.endsWith(".js") ? (
                    <FileType2
                      size={14}
                      color="#f7df1e"
                      className="file-icon"
                    />
                  ) : (
                    <FileJson size={14} className="file-icon" />
                  )}
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Editor Area */}
      <div className="main-area">
        {/* Editor Group Tab Bar */}
        <div className="editor-tabs">
          <div className="tabs-scroll-area">
            {files.map((file) => (
              <div
                key={file.id}
                className={`tab ${file.id === activeFileId ? "active" : ""} `}
                onClick={() => setActiveFileId(file.id)}
              >
                {file.name.endsWith(".js") ? (
                  <FileType2 size={12} color="#f7df1e" className="tab-icon" />
                ) : (
                  <FileJson size={12} className="tab-icon" />
                )}
                {file.name}
              </div>
            ))}
          </div>
          <div className="tab-actions">
            <button
              onClick={runCode}
              disabled={isLoading}
              className="run-action-button"
              title="Run Code"
            >
              <Play size={14} fill={isLoading ? "none" : "currentColor"} />
              <span>{isLoading ? "Running..." : "Run"}</span>
            </button>
          </div>
        </div>

        {/* Editor Container */}
        <div className="editor-container">
          {activeFile ? (
            <Editor
              height="100%"
              language={activeFile.language}
              theme="vs-dark"
              value={activeFile.content}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                fontFamily:
                  "'JetBrains Mono', 'Consolas', 'Courier New', monospace",
                automaticLayout: true,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
              }}
            />
          ) : (
            <div className="empty-editor">Select a file to start coding</div>
          )}
        </div>

        {/* Terminal/Output Panel (Bottom) */}
        {terminalOpen && (
          <div className="panel-container">
            <div className="panel-tabs">
              <div className="panel-tab active">
                <Terminal size={12} className="tab-icon" />
                OUTPUT
              </div>
              <div className="panel-actions">
                <button
                  className="icon-button"
                  onClick={() => setTerminalOpen(false)}
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>
            <div className="panel-content">
              {isLoading && (
                <div className="loading-text">
                  Executing {activeFile?.name}...
                </div>
              )}
              {error && (
                <div className="error-text">
                  [{activeFile?.name}] Error:
                  <br />
                  {error}
                </div>
              )}
              {output && <pre className="output-text">{output}</pre>}
              {!output && !error && !isLoading && hasExecuted && (
                <div className="placeholder-text" style={{ color: "#4EC9B0" }}>
                  ✓ Code executed successfully (no console output)
                </div>
              )}
              {!output && !error && !isLoading && !hasExecuted && (
                <div className="placeholder-text">
                  output will appear here...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
