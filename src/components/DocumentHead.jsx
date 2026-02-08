import { useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';

/**
 * Component to dynamically update document head (title, favicon) based on settings
 */
export default function DocumentHead() {
  const { settings } = useSettings();

  useEffect(() => {
    // Settings loaded

    // Update document title
    const platformName = settings.branding?.platformName || '';
    const tagline = settings.branding?.tagline || '';

    if (platformName && platformName.trim() !== '') {
      // Use tagline if available
      const title = (tagline && tagline.trim() !== '')
        ? `${platformName} - ${tagline}`
        : platformName;

      document.title = title;
    } else {
      document.title = 'Platform - Please configure platform name from admin dashboard';
    }

    // Update favicon
    const faviconUrl = settings.branding?.favicon || '';

    // Remove existing favicon links
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach(link => link.remove());

    if (faviconUrl && faviconUrl.trim() !== '') {
      // Create new favicon link
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = faviconUrl;
      document.head.appendChild(link);
    } else {
      // Create placeholder favicon (data URI with a simple icon)
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      // Simple placeholder SVG favicon
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#94A3B8"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`;
      link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      document.head.appendChild(link);
    }
  }, [settings.branding?.platformName, settings.branding?.favicon, settings.branding?.tagline]);

  return null; // This component doesn't render anything
}

