import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ProductNamer from './pages/ProductNamer';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);
  const [pageTitle, setPageTitle] = useState('Vezérlópult');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange, false);
    
    // Set initial route
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, []);

  const renderPage = () => {
    switch (route) {
      case '#/product-namer':
        if (pageTitle !== 'Termékelnevező') setPageTitle('Termékelnevező');
        return <ProductNamer />;
      case '#/settings':
        if (pageTitle !== 'Beállítások') setPageTitle('Beállítások');
        return <Settings />;
      case '#/':
      case '':
      default:
        if (pageTitle !== 'Vezérlópult') setPageTitle('Vezérlópult');
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex">
      <Sidebar currentPath={route || '#/'} />
      <div className="flex-1 flex flex-col h-screen">
        <Header title={pageTitle} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;