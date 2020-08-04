function handleMessage(request, sender, sendResponse) {
    console.log(`content script sent a message: ${request.content}`);
    sendResponse({ response: "response from background script" });
}

browser.runtime.onMessage.addListener(handleMessage);