// Core React + Router imports
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  Info,
  Menu,
  X
} from 'lucide-react';

// Page components
import Dashboard from './Screen/Dashboard';
import About from './Screen/About';
import LiveFeed from './Screen/LiveFeed';


// Single navigation item used inside the sidebar.
// It knows if it's "active" by comparing the current path with `to`.
const NavLink = ({ to, icon: Icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '12px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        background: isActive ? 'rgba(124,58,237,0.1)' : 'transparent',
        border: isActive ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
        marginBottom: '4px'
      }}
      onMouseEnter={(e) => {
        // Give non-active links a subtle hover background
        if (!isActive) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        }
      }}
      onMouseLeave={(e) => {
        // Reset hover state if link isn't active
        if (!isActive) {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      <Icon
        style={{
          width: '20px',
          height: '20px',
          color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.6)'
        }}
      />
      <span
        style={{
          fontSize: '15px',
          fontWeight: isActive ? '600' : '500',
          color: isActive ? '#fff' : 'rgba(255,255,255,0.7)'
        }}
      >
        {label}
      </span>
    </Link>
  );
};


// Slide‑in sidebar used on smaller screens.
// It uses a simple boolean `isOpen` to handle visibility.
const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Dark overlay behind the sidebar */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 40
          }}
        />
      )}

      {/* Actual sidebar panel */}
      <aside
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: '260px',
          background: 'rgba(10,13,18,0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Close button row */}
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X
              style={{
                width: '20px',
                height: '20px',
                color: 'rgba(255,255,255,0.7)'
              }}
            />
          </button>
        </div>

        {/* Navigation links */}
        <nav style={{ flex: 1, padding: '20px' }}>
          <NavLink to="/" icon={LayoutDashboard} label="Dashboard" onClick={onClose} />
          <NavLink to="/live-feed" icon={Activity} label="Live Feed" onClick={onClose} />
          <NavLink to="/about" icon={Info} label="About" onClick={onClose} />
        </nav>
      </aside>
    </>
  );
};


// Top header bar with page title and "Live" indicator.
// Also holds the button that opens the sidebar.
const Header = ({ onMenuClick }) => {
  const location = useLocation();

  // Basic mapping from route path → title.
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/live-feed':
        return 'Live Feed';
      case '/about':
        return 'About';
      default:
        return 'MindSight';
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'rgba(10,13,18,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px'
        }}
      >
        {/* Left side: menu button + current page title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onMenuClick}
            style={{
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '10px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
            }}
          >
            <Menu
              style={{
                width: '18px',
                height: '18px',
                color: '#a78bfa'
              }}
            />
          </button>

          <h2
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#fff'
            }}
          >
            {getPageTitle()}
          </h2>
        </div>

        {/* Right side: small “Live” chip, just a visual indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.3)'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10b981',
              animation: 'pulse 2s infinite'
            }}
          />
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#10b981'
            }}
          >
            Live
          </span>
        </div>
      </div>

      {/* Simple pulse animation used by the live dot */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </header>
  );
};


// Top‑level layout for all pages.
// Handles the sidebar, header, and main scrollable area.
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #07090d 0%, #0a0d12 100%)'
      }}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>
      </div>
    </div>
  );
};


// Root app component – wires up React Router and the layout.
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/live-feed" element={<LiveFeed />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

