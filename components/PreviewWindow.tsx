
import React, { useState } from 'react';
import { DesktopIcon, LoadingSpinner, MobileIcon, NoSymbolIcon } from './Icons';

interface PreviewWindowProps {
  htmlContent: string;
  isLoading: boolean;
  hasContent: boolean;
}

type PreviewDevice = 'mobile' | 'desktop';

export const PreviewWindow: React.FC<PreviewWindowProps> = ({ htmlContent, isLoading, hasContent }) => {
  const [device, setDevice] = useState<PreviewDevice>('mobile');

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <LoadingSpinner className="w-12 h-12" />
          <p className="mt-4 text-lg font-medium animate-pulse">AI is designing your UI...</p>
          <p className="text-sm text-gray-500">This might take a moment.</p>
        </div>
      );
    }

    if (!hasContent) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <NoSymbolIcon className="w-16 h-16" />
                <p className="mt-4 text-lg font-medium">Preview will appear here</p>
                <p className="text-sm">Upload a design and click "Generate UI".</p>
            </div>
        );
    }
    
    return (
        <div 
          className="w-full h-full" 
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
    );
  };

  return (
    <div className="flex-grow flex flex-col bg-gray-900 rounded-xl p-4">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gray-800 p-1 rounded-lg flex gap-1">
          <button onClick={() => setDevice('mobile')} className={`p-2 rounded-md ${device === 'mobile' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}>
            <MobileIcon />
          </button>
          <button onClick={() => setDevice('desktop')} className={`p-2 rounded-md ${device === 'desktop' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}>
            <DesktopIcon />
          </button>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div
          className={`bg-gray-700/50 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300
            ${device === 'mobile' ? 'w-[300px] h-[550px]' : 'w-full max-w-[700px] h-[450px]'}
          `}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
