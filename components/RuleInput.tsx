import React from 'react';

interface RuleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const RuleInput: React.FC<RuleInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="naming-rule" className="block text-sm font-medium text-slate-600 mb-2">
        Opcionális: Adjon meg egy stílust, kulcsszót vagy szabályt az elnevezéshez.
      </label>
      <textarea
        id="naming-rule"
        rows={4}
        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
        placeholder="pl. 'Legyen futurisztikus hangzású', 'Tartalmazza az 'organikus' szót', 'Legfeljebb 3 szóból álljon'"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default RuleInput;