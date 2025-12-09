import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import './styles.css';

function App(){
  return (
    <BrowserRouter>
      <header className="site-header">
        <div className="brand"><Link to="/">trial Creative</Link></div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin Panel</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
      <footer className="site-footer">© trial Creative — Demo Project</footer>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
