import React from 'react';
import { RobloxIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 border-b border-gray-700 p-4 sticky top-0 z-10 backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto flex items-center gap-4">
        <RobloxIcon />
        <div>
          <h1 className="text-xl font-bold text-white">ZumUi</h1>
          <p className="text-sm text-gray-400">AI-Powered Roblox UI Generator</p>
        </div>
      </div>
    </header>
  );
};