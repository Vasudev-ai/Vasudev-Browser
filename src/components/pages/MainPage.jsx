import React, { useState } from "react";
import {
  Menu, Search, Mic, Settings, History, Download, Star, User, HelpCircle,
  X, Plus
} from "lucide-react";

// Modal component
function ShortcutModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  // Reset modal state when opened/closed
  React.useEffect(() => {
    if (open) {
      setName("");
      setUrl("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-slate-800 p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-700/60 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 hover:bg-slate-700"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4 text-slate-200">Add Shortcut</h2>
        <form onSubmit={e => {
          e.preventDefault();
          onSubmit({ name, url });
        }}>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-slate-400">Name</label>
            <input
              type="text"
              required
              className="w-full bg-slate-700 text-white p-2 rounded outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Website Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-slate-400">Website Link</label>
            <input
              type="url"
              required
              className="w-full bg-slate-700 text-white p-2 rounded outline-none"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MainPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [shortcuts, setShortcuts] = useState([
    { name: "YouTube", url: "https://youtube.com", color: "bg-red-100" },
    { name: "Gmail", url: "https://gmail.com", color: "bg-blue-100" },
    { name: "Drive", url: "https://drive.google.com", color: "bg-green-100" },
    { name: "Maps", url: "https://maps.google.com", color: "bg-yellow-100" },
    { name: "News", url: "https://news.google.com", color: "bg-purple-100" },
    { name: "Photos", url: "https://photos.google.com", color: "bg-pink-100" },
    { name: "Calendar", url: "https://calendar.google.com", color: "bg-indigo-100" },
    { name: "Translate", url: "https://translate.google.com", color: "bg-cyan-100" }
  ]);

  const sidebarItems = [
    { icon: History, label: "History", shortcut: "Ctrl+H" },
    { icon: Download, label: "Downloads", shortcut: "Ctrl+J" },
    { icon: Star, label: "Bookmarks", shortcut: "Ctrl+Shift+O" },
    { icon: Settings, label: "Settings" },
    { icon: User, label: "Profile" },
    { icon: HelpCircle, label: "Help & Support" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleAddShortcut = ({ name, url }) => {
    setShortcuts([
      ...shortcuts,
      { name, url, color: "bg-slate-600" }
    ]);
    setModalOpen(false);
  };

  const handleDeleteShortcut = index => {
    setShortcuts(shortcuts.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-slate-800/95 backdrop-blur-xl border-r border-slate-700/50 z-50 transform transition-transform duration-300 ease-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Vasudev Browser
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-3 hover:bg-slate-700/50 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <item.icon size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                <span className="text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
              </div>
              {item.shortcut && (
                <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">
                  {item.shortcut}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium">Welcome back!</p>
                <p className="text-sm text-slate-400">vasudev@browser.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-3 hover:bg-slate-700/30 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-700/30 rounded-lg transition-colors">
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
          </div>
        </header>
        {/* Main Content Area */}
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
          {/* Logo */}
          <div className="mb-12">
            <h1 className="text-7xl font-light tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default">
              Vasudev
            </h1>
          </div>
          {/* Search Bar */}
          <div className="w-full max-w-2xl mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-full px-6 py-4 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300">
                <Search size={20} className="text-slate-400 mr-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  placeholder="Search Google or type a URL"
                  className="flex-1 bg-transparent outline-none text-white placeholder-slate-400"
                />
                <button onClick={handleSearch} className="ml-4 p-2 hover:bg-slate-700/50 rounded-full transition-colors">
                  <Mic size={16} className="text-slate-400 hover:text-white transition-colors" />
                </button>
              </div>
            </div>
          </div>
          {/* Shortcuts Grid */}
          <div className="grid grid-cols-4 gap-6 max-w-2xl w-full">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="group flex flex-col items-center p-6 hover:bg-slate-800/30 rounded-2xl transition-all duration-300 hover:scale-105 relative"
              >
                <a
                  href={shortcut.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-16 h-16 ${shortcut.color} text-[grey] rounded-2xl flex items-center justify-center text-[0.5vw] mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <span>{shortcut.name}</span>
                </a>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors mb-1">
                  {shortcut.name}
                </span>
                <button
                  onClick={() => handleDeleteShortcut(index)}
                  className="absolute top-2 right-2 p-1 cursor-pointer bg-slate-700/80 rounded-full text-xs text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
                  title="Delete shortcut"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          {/* Add Shortcut Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="mt-8 flex cursor-pointer items-center space-x-2 px-6 py-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-full border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group"
          >
            <Plus size={16} className="text-slate-400 group-hover:text-white transition-colors" />
            <span className="text-slate-400 group-hover:text-white transition-colors">Add shortcut</span>
          </button>
        </main>
      </div>
      {/* Shortcut Add Modal */}
      <ShortcutModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddShortcut}
      />
    </div>
  );
}
