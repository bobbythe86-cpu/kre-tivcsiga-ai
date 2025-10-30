import React from 'react';
import Loader from './Loader';

interface ResultDisplayProps {
  isLoading: boolean;
  names: string[];
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, names }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (names.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10">
        <p>A generált terméknevek itt fognak megjelenni.</p>
        <p className="text-sm mt-1">Töltsön fel egy képet, majd kattintson a "Generálás" gombra a kezdéshez.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {names.map((name, index) => (
        <li
          key={index}
          className="bg-slate-100 p-4 rounded-lg text-slate-700 font-medium transition-all duration-300 hover:bg-indigo-100 hover:text-indigo-800 cursor-pointer"
          onClick={() => navigator.clipboard.writeText(name)}
          title="Kattintson a másoláshoz"
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

export default ResultDisplay;