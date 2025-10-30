import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { HomeIcon } from './icons/HomeIcon';
import { TagIcon } from './icons/TagIcon';
import { SettingsIcon } from './icons/SettingsIcon';

interface SidebarProps {
  currentPath: string;
}

const NavLink: React.FC<{ href: string; currentPath: string; icon: React.ReactNode; children: React.ReactNode }> = ({ href, currentPath, icon, children }) => {
  const isActive = currentPath === href;
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${
        isActive
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
      }`}
    >
      {icon}
      {children}
    </a>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-4 flex-col flex-shrink-0 hidden md:flex">
      <div className="flex items-center gap-3 px-4 py-2.5 mb-8">
        <SparklesIcon className="h-8 w-8 text-indigo-600" />
        <h1 className="text-xl font-bold text-slate-800 whitespace-nowrap">
          MI Asszisztens
        </h1>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink href="#/" currentPath={currentPath} icon={<HomeIcon className="h-5 w-5" />}>
          Vezérlópult
        </NavLink>
        <NavLink href="#/product-namer" currentPath={currentPath} icon={<TagIcon className="h-5 w-5" />}>
          Termékelnevező
        </NavLink>
        {/* Add more feature links here */}
      </nav>
      <div className="mt-auto">
        <NavLink href="#/settings" currentPath={currentPath} icon={<SettingsIcon className="h-5 w-5" />}>
          Beállítások
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;