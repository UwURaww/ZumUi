import React from 'react';

export const UploadIcon: React.FC<{className?: string}> = ({className = "w-10 h-10"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export const LoadingSpinner: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const MagicWandIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25278C12 6.25278 15.2144 3 17.6254 3C20.0365 3 21.9333 4.8202 21.9333 7.14286C21.9333 9.46551 20.0365 11.2857 17.6254 11.2857C15.2144 11.2857 12 8.14286 12 8.14286" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25278V8.14286" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.1429 3L9.19048 5.30612L6.85714 6.25279L9.19048 7.19946L10.1429 9.50558L11.0952 7.19946L13.4286 6.25279L11.0952 5.30612L10.1429 3Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.1429L4.42857 14.0895L3 15.0362L1.57143 14.0895L3 13.1429Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21L4.42857 18.2L7 17L4.42857 15.8L3 13L1.57143 15.8L-1.19209e-07 17L1.57143 18.2L3 21Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.125C12 14.125 15.2144 17.3778 17.6254 17.3778C20.0365 17.3778 21.9333 19.198 21.9333 21.5207C21.9333 23.8433 20.0365 25.6635 17.6254 25.6635C15.2144 25.6635 12 22.5207 12 22.5207" />
//... (path might be clipped in some renderers, but this is a common representation)
  </svg>
);

export const RobloxIcon: React.FC<{className?: string}> = ({className = "w-10 h-10 text-gray-400"}) => (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.132 26.868L26.868 5.132l-2.064-2.064L3.068 24.804zM3.068 7.196L24.804 28.932l2.064-2.064L5.132 5.132z"></path>
    </svg>
);


export const MobileIcon: React.FC<{className?: string}> = ({className = "w-5 h-5"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

export const DesktopIcon: React.FC<{className?: string}> = ({className = "w-5 h-5"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const NoSymbolIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

export const CopyIcon: React.FC<{className?: string}> = ({className = "w-5 h-5"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export const CheckIcon: React.FC<{className?: string}> = ({className = "w-5 h-5 text-green-400"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);
