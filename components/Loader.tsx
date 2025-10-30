import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-slate-500 py-10 animate-pulse">
      <SparklesIcon className="w-12 h-12 text-indigo-400 mb-4" />
      <p className="font-semibold">A mesterséges intelligencia gondolkodik...</p>
      <p className="text-sm mt-1">Kreatív termékneveket generálunk Önnek.</p>
    </div>
  );
};

export default Loader;