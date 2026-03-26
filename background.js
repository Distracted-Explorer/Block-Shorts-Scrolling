chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && changeInfo.url.includes('youtube.com/shorts/')) {
    const videoId = changeInfo.url.split('/shorts/')[1]?.split('?')[0];
    if (videoId) {
      const newUrl = `https://www.youtube.com/watch?v=${videoId}`;
      chrome.tabs.update(tabId, { url: newUrl });
    }
  }
});

console.log('YouTube Shorts Blocker: Background service active');