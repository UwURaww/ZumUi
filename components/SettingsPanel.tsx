import React, { useState } from 'react';
import type { Settings, NotificationSettings } from '../types';
import { ChevronDownIcon } from './Icons';

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
}

const SettingsSection: React.FC<{ title: string; children: React.ReactNode, defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-700 rounded-lg">
      <button
        className="w-full flex justify-between items-center p-3 bg-gray-700/50 hover:bg-gray-700 transition-colors rounded-t-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-gray-200">{title}</h3>
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="p-4 space-y-6 bg-gray-800 rounded-b-lg">{children}</div>}
    </div>
  );
};


export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange }) => {
  const handleSettingChange = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };
  
  const handleNotificationChange = <K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) => {
    onSettingsChange({ ...settings, notification: { ...settings.notification, [key]: value } });
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-300">2. Configure</h2>
      <div className="space-y-4">

        <SettingsSection title="Behavior">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium text-gray-400">Draggable</span>
            <div className="relative">
              <input type="checkbox" checked={settings.isDraggable} onChange={(e) => handleSettingChange('isDraggable', e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium text-gray-400">Toggleable</span>
            <div className="relative">
              <input type="checkbox" checked={settings.isToggleable} onChange={(e) => handleSettingChange('isToggleable', e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
          </label>

          {settings.isToggleable && (
            <>
              <div>
                <label htmlFor="toggleKeybind" className="block text-sm font-medium text-gray-400 mb-2">Toggle Keybind</label>
                <input type="text" id="toggleKeybind" maxLength={1} value={settings.toggleKeybind} onChange={(e) => handleSettingChange('toggleKeybind', e.target.value.toUpperCase())} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="e.g., F" />
              </div>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-gray-400">Add Mobile Toggle Button</span>
                 <div className="relative">
                   <input type="checkbox" checked={settings.addMobileToggleButton} onChange={(e) => handleSettingChange('addMobileToggleButton', e.target.checked)} className="sr-only peer" />
                   <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                 </div>
              </label>
            </>
          )}
        </SettingsSection>

        <SettingsSection title="Appearance & Metadata">
           <div>
            <label htmlFor="introAnimation" className="block text-sm font-medium text-gray-400 mb-2">Intro Animation</label>
            <select id="introAnimation" value={settings.introAnimation} onChange={(e) => handleSettingChange('introAnimation', e.target.value as Settings['introAnimation'])} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500 transition">
              <option value="None">None</option>
              <option value="FadeIn">Fade In</option>
              <option value="SlideDown">Slide Down</option>
              <option value="Grow">Grow (from center)</option>
            </select>
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">UI Title</label>
            <input type="text" id="title" value={settings.title} onChange={(e) => handleSettingChange('title', e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="e.g., Main Menu" />
          </div>
          <div>
            <label htmlFor="signature" className="block text-sm font-medium text-gray-400 mb-2">'Made by' Signature</label>
            <input type="text" id="signature" value={settings.signature} onChange={(e) => handleSettingChange('signature', e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="e.g., Made by Coder" />
          </div>
          {settings.signature && (
            <div>
              <label htmlFor="signaturePosition" className="block text-sm font-medium text-gray-400 mb-2">Signature Position</label>
              <select id="signaturePosition" value={settings.signaturePosition} onChange={(e) => handleSettingChange('signaturePosition', e.target.value as Settings['signaturePosition'])} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500 transition">
                <option value="BottomLeft">Bottom Left</option>
                <option value="BottomRight">Bottom Right</option>
                <option value="TopLeft">Top Left</option>
                <option value="TopRight">Top Right</option>
              </select>
            </div>
          )}
        </SettingsSection>

        <SettingsSection title="Sounds" defaultOpen={false}>
            <div>
              <label htmlFor="openSoundId" className="block text-sm font-medium text-gray-400 mb-2">Open Sound ID</label>
              <input type="text" id="openSoundId" value={settings.openSoundId} onChange={(e) => handleSettingChange('openSoundId', e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="rbxassetid://..."/>
            </div>
             <div>
              <label htmlFor="closeSoundId" className="block text-sm font-medium text-gray-400 mb-2">Close Sound ID</label>
              <input type="text" id="closeSoundId" value={settings.closeSoundId} onChange={(e) => handleSettingChange('closeSoundId', e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="rbxassetid://..."/>
            </div>
            <div>
              <label htmlFor="clickSoundId" className="block text-sm font-medium text-gray-400 mb-2">Button Click Sound ID</label>
              <input type="text" id="clickSoundId" value={settings.clickSoundId} onChange={(e) => handleSettingChange('clickSoundId', e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="rbxassetid://..."/>
            </div>
        </SettingsSection>

        <SettingsSection title="Notifications" defaultOpen={false}>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-400">Enable Notifications</span>
              <div className="relative">
                <input type="checkbox" checked={settings.notification.enabled} onChange={(e) => handleNotificationChange('enabled', e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </div>
            </label>
            {settings.notification.enabled && (
              <>
                <div>
                  <label htmlFor="notificationText" className="block text-sm font-medium text-gray-400 mb-2">Startup Notification Text</label>
                  <input type="text" id="notificationText" value={settings.notification.text} onChange={(e) => handleNotificationChange('text', e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                </div>
                 <div>
                  <label htmlFor="notificationDuration" className="block text-sm font-medium text-gray-400 mb-2">Notification Duration (sec)</label>
                  <input type="number" id="notificationDuration" min="1" value={settings.notification.duration} onChange={(e) => handleNotificationChange('duration', parseInt(e.target.value, 10))} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                </div>
              </>
            )}
        </SettingsSection>

        <SettingsSection title="Advanced" defaultOpen={false}>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="flex flex-col">
              <span className="text-sm font-medium text-gray-400">Generate as UI Library</span>
              <span className="text-xs text-gray-500">Outputs a reusable ModuleScript.</span>
            </span>
            <div className="relative">
              <input type="checkbox" checked={settings.generateAsLibrary} onChange={(e) => handleSettingChange('generateAsLibrary', e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
          </label>
        </SettingsSection>
      </div>
    </div>
  );
};