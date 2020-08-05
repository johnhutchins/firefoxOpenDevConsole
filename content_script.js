function handleMessage(request, sender, sendResponse) {
    console.log("handle message from content script....")
    console.log(`background script sent a message: ${request.content}`)
    sendResponse({ response: "this will eventually be an object" })
}

browser.runtime.onMessage.addListener(handleMessage)