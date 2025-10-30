import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-slate-800 border-b pb-4 mb-6">Beállítások</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-700">API Konfiguráció</h3>
          <p className="text-slate-500 mt-1">A Gemini API kulcsa a környezeti változókon keresztül van beállítva. Jelenleg nincsenek itt konfigurálható beállítások.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-700">Alkalmazás beállításai</h3>
          <p className="text-slate-500 mt-1">A jövőbeni alkalmazásbeállítások itt lesznek elérhetők.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;