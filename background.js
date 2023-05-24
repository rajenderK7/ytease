// Write a function to open an Onboarding page
// when the extension is first installed.
// Use the onInstalled API from chrome.runtime

chrome.tabs.onUpdated.addListener((tabId, tabInfo) => {
    if (tabInfo.url && tabInfo.url.includes("youtube.com/watch")) {
        chrome.tabs.sendMessage(tabId, {
            type: "NEW"
        })
    }
})