import React from 'react';
import { TagIcon } from '../components/icons/TagIcon';
import { PencilIcon } from '../components/icons/PencilIcon';

const FeatureCard: React.FC<{ href: string; icon: React.ReactNode; title: string; description: string; disabled?: boolean }> = ({
  href,
  icon,
  title,
  description,
  disabled = false,
}) => {
  const content = (
      <div className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 h-full ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1'
      }`}>
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>
        <p className="text-slate-600">{description}</p>
      </div>
  );

  return disabled ? <div>{content}</div> : <a href={href}>{content}</a>;
};


const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Üdvözöljük az MI Asszisztensben</h2>
        <p className="text-slate-600 mt-2">Válasszon egy eszközt alább a marketing, SEO és szövegírási feladatok megkezdéséhez.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          href="#/product-namer"
          icon={<TagIcon className="w-6 h-6" />}
          title="Termékelnevező"
          description="Generáljon kreatív, SEO-barát neveket termékeihez egy kép alapján."
        />
        <FeatureCard
          href="#"
          icon={<PencilIcon className="w-6 h-6" />}
          title="Szövegíró (Hamarosan)"
          description="Hozzon létre lenyűgöző termékleírásokat, blogbejegyzéseket és hirdetési szövegeket."
          disabled
        />
        {/* Add more feature cards here */}
      </div>
    </div>
  );
};

export default Dashboard;