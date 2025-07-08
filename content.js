// Content script for Pinterest Image Downloader
(function() {
  'use strict';

  // Configuration
  const DOWNLOAD_BUTTON_CLASS = 'pinterest-download-btn';
  const DOWNLOAD_BUTTON_ID = 'pinterest-download-button';
  
  // Initialize the extension
  function init() {
    addDownloadButtons();
    observePageChanges();
  }

  // Add download buttons to Pinterest images
  function addDownloadButtons() {
    // Look for Pinterest pin images
    const imageContainers = document.querySelectorAll('[data-test-id="pin"], [data-test-id="pinrep"], .GrowthUnauthPin_container, .Pj7, .sLG');
    
    imageContainers.forEach(container => {
      if (container.querySelector(`.${DOWNLOAD_BUTTON_CLASS}`)) {
        return; // Button already exists
      }

      const img = container.querySelector('img');
      if (!img || !img.src) return;

      createDownloadButton(container, img);
    });

    // Also handle individual pin pages
    const pinImage = document.querySelector('[data-test-id="pin-image"], .hCL.kVc.L4E.MIw');
    if (pinImage && !document.querySelector(`.${DOWNLOAD_BUTTON_CLASS}`)) {
      createDownloadButton(pinImage.parentElement, pinImage);
    }
  }

  // Create and insert download button
  function createDownloadButton(container, img) {
    const downloadBtn = document.createElement('button');
    downloadBtn.className = DOWNLOAD_BUTTON_CLASS;
    downloadBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      Download
    `;
    
    downloadBtn.title = 'Download Image';
    downloadBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      downloadImage(img);
    };

    // Position the button
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'pinterest-download-container';
    buttonContainer.appendChild(downloadBtn);
    
    // Try to find the best position for the button
    const actionBar = container.querySelector('[data-test-id="pin-action-bar"], .tBJ.dyH.iFc.j1A.O2T.zDA');
    if (actionBar) {
      actionBar.appendChild(buttonContainer);
    } else {
      container.style.position = 'relative';
      container.appendChild(buttonContainer);
    }
  }

  // Download image function
  function downloadImage(img) {
    const imageUrl = getHighResImageUrl(img.src);
    const filename = generateFilename(imageUrl);
    
    // Send message to background script to download
    chrome.runtime.sendMessage({
      action: 'downloadImage',
      url: imageUrl,
      filename: filename
    });
  }

  // Get high resolution image URL
  function getHighResImageUrl(src) {
    // Pinterest image URLs often have size parameters
    // Remove size limitations to get full resolution
    return src
      .replace(/\/\d+x\d+\//, '/originals/')
      .replace(/\/\d+x\//, '/originals/')
      .replace(/_\d+\./, '_.')
      .replace(/\.jpg_\d+x\d+\./, '.jpg');
  }

  // Generate filename from URL
  function generateFilename(url) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    
    // Add timestamp to avoid conflicts
    const timestamp = new Date().getTime();
    const extension = filename.includes('.') ? filename.split('.').pop() : 'jpg';
    const baseName = filename.includes('.') ? filename.split('.').slice(0, -1).join('.') : filename;
    
    return `pinterest_${baseName}_${timestamp}.${extension}`;
  }

  // Observe page changes (Pinterest is a SPA)
  function observePageChanges() {
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && 
                (node.querySelector('img') || node.tagName === 'IMG')) {
              shouldUpdate = true;
            }
          });
        }
      });
      
      if (shouldUpdate) {
        setTimeout(addDownloadButtons, 500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also initialize on page navigation (for SPA)
  window.addEventListener('popstate', () => {
    setTimeout(init, 1000);
  });

})();