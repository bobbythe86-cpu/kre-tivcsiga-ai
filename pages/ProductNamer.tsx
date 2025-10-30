import React, { useState, useCallback } from 'react';
import ImageUploader from '../components/ImageUploader';
import RuleInput from '../components/RuleInput';
import ResultDisplay from '../components/ResultDisplay';
import { generateProductNames } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';

const ProductNamer: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [namingRule, setNamingRule] = useState<string>('');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!imageFile) {
      setError('Kérjük, először töltsön fel egy képet.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setGeneratedNames([]);

    try {
      const { base64, mimeType } = await fileToBase64(imageFile);
      const imageData = { data: base64, mimeType };
      
      const names = await generateProductNames(imageData, namingRule);
      setGeneratedNames(names);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Váratlan hiba történt. Kérjük, próbálja újra.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, namingRule]);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* Left Column: Controls */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-xl font-bold text-slate-700 border-b pb-3">1. Termékkép feltöltése</h2>
        <ImageUploader onImageUpload={setImageFile} />
        
        <h2 className="text-xl font-bold text-slate-700 border-b pb-3 pt-4">2. Elnevezési szabály megadása</h2>
        <RuleInput value={namingRule} onChange={setNamingRule} />
        
        <button
          onClick={handleGenerate}
          disabled={isLoading || !imageFile}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generálás...
            </>
          ) : (
            'Terméknevek generálása'
          )}
        </button>
      </div>

      {/* Right Column: Results */}
      <div className="bg-white p-6 rounded-2xl shadow-lg min-h-[300px]">
        <h2 className="text-xl font-bold text-slate-700 border-b pb-3 mb-6">3. MI által generált eredmények</h2>
        {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
        <ResultDisplay isLoading={isLoading} names={generatedNames} />
      </div>
    </div>
  );
};

export default ProductNamer;