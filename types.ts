export interface NotificationSettings {
  enabled: boolean;
  text: string;
  duration: number;
  iconAssetId: string;
}

export interface Settings {
  targetDevice: 'Mobile' | 'Desktop' | 'Tablet';
  parentGuiName: string;
  includeComments: boolean;
  isDraggable: boolean;
  isToggleable: boolean;
  toggleKeybind: string;
  addMobileToggleButton: boolean;
  title: string;
  signature: string;
  signaturePosition: 'None' | 'TopLeft' | 'TopRight' | 'BottomLeft' | 'BottomRight';
  introAnimation: 'None' | 'FadeIn' | 'SlideDown' | 'Grow';
  clickSoundId: string;
  openSoundId: string;
  closeSoundId: string;
  notification: NotificationSettings;
  generateAsLibrary: boolean;
}