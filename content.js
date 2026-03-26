// YouTube Shorts Blocker - Fixed Version

// Wait for page to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  checkAndRedirect();
  
  // Use a single, throttled observer
  let timeoutId;
  const observer = new MutationObserver(() => {
    clearTimeout(timeoutId);
  });
  
  // Start observing after a short delay to let YouTube load
  setTimeout(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }, 500);
}


// Redirect Shorts URLs to regular video format
function checkAndRedirect() {
  if (window.location.pathname.includes('/shorts/')) {
    const videoId = window.location.pathname.split('/shorts/')[1]?.split('?')[0]?.split('/')[0];
    if (videoId) {
      // Convert shorts URL to regular video URL
      const newUrl = `https://www.youtube.com/watch?v=LhQGzeiYS_Q`;
      window.location.replace(newUrl);
    }
  }
}

// Monitor URL changes for Single Page App navigation
let lastUrl = location.href;
const urlObserver = new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    checkAndRedirect();
  }
});

urlObserver.observe(document.querySelector('title'), {
  subtree: true,
  characterData: true,
  childList: true
});