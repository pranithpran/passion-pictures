import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isEditing, toggleEditing, messages, isAuthenticated, login, logout, content } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Video', href: '#video' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(passwordInput);
    if (success) {
      setShowLoginModal(false);
      setPasswordInput('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(content, null, 2);
    navigator.clipboard.writeText(dataStr).then(() => {
        alert("Content Config copied to clipboard! \n\nTo make these changes permanent for Firebase Hosting, replace the 'defaultContent' object in 'context/ContentContext.tsx' with this copied data.");
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-charcoal">
      
      {/* AUTHENTICATED ADMIN PANEL - HIDDEN FOR PUBLIC */}
      {isAuthenticated && (
        <div className="sticky top-0 z-50 bg-charcoal text-white px-4 py-3 flex justify-between items-center shadow-lg border-b border-gray-800 animate-slideDown">
          <div className="flex items-center gap-4">
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-gold-500">
              Admin Panel
            </span>
            <button 
                onClick={logout}
                className="text-[10px] text-gray-400 hover:text-white border border-gray-600 px-2 py-1 rounded"
            >
                Logout
            </button>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={handleExport}
              className="hidden md:flex items-center gap-2 text-xs uppercase font-bold hover:text-gold-400 transition-colors mr-4"
              title="Copy current content to clipboard for deployment"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
               </svg>
               Save for Publish
            </button>

            <button 
              onClick={() => setShowInbox(!showInbox)}
              className="relative flex items-center gap-2 text-xs uppercase font-bold hover:text-gold-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Inbox
              {messages.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full absolute -top-2 -right-3">
                  {messages.length}
                </span>
              )}
            </button>

            <label className="flex items-center cursor-pointer gap-2 select-none">
              <span className="text-xs uppercase font-bold text-gray-400">
                {isEditing ? 'Editing On' : 'Editing Off'}
              </span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={isEditing} 
                  onChange={toggleEditing} 
                />
                <div className={`block w-10 h-5 rounded-full transition-colors ${isEditing ? 'bg-gold-500' : 'bg-gray-600'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${isEditing ? 'transform translate-x-5' : ''}`}></div>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-sm shadow-2xl relative">
                <button 
                    onClick={() => { setShowLoginModal(false); setLoginError(false); }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black"
                >✕</button>
                <h3 className="font-serif text-2xl mb-2 text-center">Owner Access</h3>
                <p className="text-gray-500 text-sm text-center mb-6">Enter password to edit site</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input 
                            type="password" 
                            className={`w-full border p-3 rounded outline-none focus:border-gold-500 bg-white text-gray-900 placeholder-gray-400 ${loginError ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            autoFocus
                        />
                        {loginError && <p className="text-red-500 text-xs mt-1">Incorrect password</p>}
                    </div>
                    <button className="w-full bg-charcoal text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-gold-600 transition-colors">
                        Unlock Admin
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* Inbox Modal (Server Simulation) */}
      {showInbox && isAuthenticated && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 bg-charcoal text-white flex justify-between items-center">
              <h3 className="font-serif text-xl">Incoming Messages</h3>
              <button onClick={() => setShowInbox(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-0 overflow-y-auto flex-1 bg-gray-50">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  No messages yet.
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-4 hover:bg-white transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-charcoal">{msg.name}</span>
                        <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-gold-600 mb-2">{msg.date}</div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="bg-white py-6 px-4 md:px-12 border-b border-gray-100 flex justify-between items-center relative">
        <a href="#" className="text-2xl md:text-3xl font-serif font-bold tracking-widest uppercase text-charcoal">
          Passion Pictures
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-bold uppercase tracking-[0.2em] hover:text-gold-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-xl z-40 border-t border-gray-100 md:hidden flex flex-col p-4 space-y-4">
             {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-[0.2em] hover:text-gold-500"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12 px-4 md:px-12 mt-12 border-t border-gold-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-2xl mb-4 text-gold-500">Passion Pictures</h4>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">Capturing moments that last a lifetime. Professional photography and videography for your most special days.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors uppercase text-xs tracking-widest">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors uppercase text-xs tracking-widest">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors uppercase text-xs tracking-widest">WhatsApp</a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 text-gray-500 text-xs mt-8 md:mt-0">
            <span>&copy; {new Date().getFullYear()} Passion Pictures. All rights reserved.</span>
            {!isAuthenticated && (
                <button 
                    onClick={() => setShowLoginModal(true)}
                    className="hover:text-gold-500 transition-colors opacity-50 hover:opacity-100"
                >
                    Owner Access
                </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;