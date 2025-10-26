
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, NoSymbolIcon, LoadingSpinner } from './Icons';

interface CodeDisplayProps {
  code: string;
  isLoading: boolean;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    // Reset copied state when code changes
    setCopied(false);
  }, [code]);
  
  const renderContent = () => {
     if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <LoadingSpinner className="w-12 h-12" />
          <p className="mt-4 text-lg font-medium animate-pulse">Writing Lua script...</p>
        </div>
      );
    }

    if (!code) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <NoSymbolIcon className="w-16 h-16" />
                <p className="mt-4 text-lg font-medium">Code will appear here</p>
            </div>
        );
    }

    return (
        <pre className="text-sm font-mono overflow-auto p-4 h-full"><code className="language-lua">{code}</code></pre>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl h-full flex flex-col relative">
      {code && !isLoading && (
         <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-300"
          title="Copy to clipboard"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      )}
      <div className="flex-grow overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};
