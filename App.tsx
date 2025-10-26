import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { SettingsPanel } from './components/SettingsPanel';
import { PreviewWindow } from './components/PreviewWindow';
import { CodeDisplay } from './components/CodeDisplay';
import { Header } from './components/Header';
import { generateRobloxUI } from './services/geminiService';
import type { Settings } from './types';
import { LoadingSpinner, MagicWandIcon } from './components/Icons';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>({
    targetDevice: 'Mobile',
    parentGuiName: 'ScreenGui',
    includeComments: true,
    isDraggable: false,
    isToggleable: false,
    toggleKeybind: 'F',
    addMobileToggleButton: false,
    title: '',
    signature: '',
    signaturePosition: 'BottomLeft',
    introAnimation: 'None',
    clickSoundId: 'rbxassetid://1842239924',
    openSoundId: '',
    closeSoundId: '',
    notification: {
      enabled: true,
      text: 'THX For using By:Jardin',
      duration: 5,
      iconAssetId: ''
    },
    generateAsLibrary: false,
  });
  const [luaCode, setLuaCode] = useState<string>('');
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File, dataUrl: string) => {
    setImageFile(file);
    setImageDataUrl(dataUrl);
    setError(null);
    setLuaCode('');
    setPreviewHtml('');
  };

  const handleGenerate = useCallback(async () => {
    if (!imageDataUrl) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLuaCode('');
    setPreviewHtml('');

    try {
      const base64Data = imageDataUrl.split(',')[1];
      const mimeType = imageDataUrl.split(';')[0].split(':')[1];

      const result = await generateRobloxUI(base64Data, mimeType, settings);
      
      setLuaCode(result.luaCode);
      setPreviewHtml(result.previewHtml);
    } catch (err) {
      console.error(err);
      setError('Failed to generate UI. The AI may be experiencing issues. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [imageDataUrl, settings]);

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* Left Column */}
        <div className="lg:col-span-3 bg-gray-800 rounded-2xl p-6 flex flex-col gap-6 h-full shadow-lg border border-gray-700 overflow-y-auto">
          <ImageUploader onImageUpload={handleImageUpload} />
          <div className="flex-grow">
            <SettingsPanel settings={settings} onSettingsChange={setSettings} />
          </div>
           <button
            onClick={handleGenerate}
            disabled={!imageFile || isLoading}
            className="w-full mt-auto flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 text-lg shadow-md hover:shadow-indigo-500/50 flex-shrink-0"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                Generating...
              </>
            ) : (
               <>
                <MagicWandIcon />
                Generate UI
               </>
            )}
          </button>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-5 bg-gray-800 rounded-2xl p-4 md:p-6 flex flex-col shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-300">Preview</h2>
          {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>}
          <PreviewWindow htmlContent={previewHtml} isLoading={isLoading} hasContent={!!luaCode} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 bg-gray-800 rounded-2xl p-4 md:p-6 flex flex-col shadow-lg border border-gray-700">
           <h2 className="text-xl font-bold mb-4 text-gray-300">Generated Lua Code</h2>
           <CodeDisplay code={luaCode} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default App;