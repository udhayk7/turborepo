'use client';

import { useEffect } from 'react';

export function ProjectPageScript() {
  useEffect(() => {
    // Find the header export button and link it to the export button in the video player
    const headerExportBtn = document.getElementById('header-export-btn');
    
    if (headerExportBtn) {
      headerExportBtn.addEventListener('click', () => {
        // Find the export button in the video player section and click it
        const editorExportBtn = document.querySelector('.relative .absolute button') as HTMLButtonElement;
        if (editorExportBtn) {
          editorExportBtn.click();
        }
      });
    }
    
    return () => {
      if (headerExportBtn) {
        headerExportBtn.removeEventListener('click', () => {});
      }
    };
  }, []);
  
  return null;
}
