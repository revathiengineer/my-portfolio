import { useEffect } from 'react';
import { usePortfolioData } from '@/hooks/usePortfolioData';

const HeadManager = () => {
  const { data } = usePortfolioData();

  useEffect(() => {
    if (!data) return;

    // Update favicon
    const updateFavicon = (href: string) => {
      // Remove existing favicon links
      const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
      existingFavicons.forEach(link => link.remove());

      // Add new favicon
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/webp';
      favicon.href = href;
      document.head.appendChild(favicon);

      // Add apple-touch-icon for better mobile support
      const appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      appleTouchIcon.href = href;
      document.head.appendChild(appleTouchIcon);
    };

    // Update Open Graph image
    const updateOGImage = (imageUrl: string) => {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', imageUrl);
      }

      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (twitterImage) {
        twitterImage.setAttribute('content', imageUrl);
      }
    };

    // Update favicon
    if (data.personal.favicon) {
      updateFavicon(data.personal.favicon);
    }

    // Update Open Graph image
    if (data.personal.ogImage) {
      updateOGImage(data.personal.ogImage);
    }
  }, [data]);

  return null; // This component doesn't render anything
};

export default HeadManager;
