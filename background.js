// Background script for Pinterest Image Downloader
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadImage') {
    downloadImage(request.url, request.filename);
    sendResponse({success: true});
  }
});

// Download image function
async function downloadImage(url, filename) {
  try {
    // First, try to download directly
    const downloadId = await chrome.downloads.download({
      url: url,
      filename: filename,
      conflictAction: 'uniquify'
    });
    
    console.log('Download started:', downloadId);
    
    // Listen for download completion
    chrome.downloads.onChanged.addListener(function(downloadDelta) {
      if (downloadDelta.id === downloadId && downloadDelta.state) {
        if (downloadDelta.state.current === 'complete') {
          console.log('Download completed:', filename);
          showNotification('Download completed!', `${filename} has been downloaded.`);
        } else if (downloadDelta.state.current === 'interrupted') {
          console.log('Download interrupted:', filename);
          showNotification('Download failed!', `Failed to download ${filename}.`);
        }
      }
    });
    
  } catch (error) {
    console.error('Download error:', error);
    showNotification('Download failed!', 'Unable to download the image.');
  }
}

// Show notification
function showNotification(title, message) {
  if (chrome.notifications) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon48.png',
      title: title,
      message: message
    });
  }
}

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Pinterest Image Downloader installed');
});