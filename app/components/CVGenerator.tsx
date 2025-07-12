'use client';

import React from 'react';

// Composant pour le bouton de téléchargement du CV
export const CVDownloadButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Margoul1CV.pdf';
    link.download = 'CV_Margoul1_Theo_Morio.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleDownload}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
};

export default function CVGenerator() {
  return null;
} 