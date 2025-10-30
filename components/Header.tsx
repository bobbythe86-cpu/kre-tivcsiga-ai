
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-slate-200">
      <div className="px-4 py-4 md:px-8">
        <h1 className="text-2xl font-bold text-slate-800">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
