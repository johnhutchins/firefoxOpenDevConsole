const devSuffix = '/_ui/common/apex/debug/ApexCSIPage'
const errPage = '/home.html'
browser.browserAction.onClicked.addListener(function () {
    browser.tabs.query({ currentWindow: true, active: true }, tabs => {
        let url = tabs[0].url
        const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
        if (!matches[0].includes('salesforce')) {
            console.error("THIS IS AN ERROR. NOT SALESFORCE")
            browser.notifications.create(cakeNotification, {
                "type": "basic",
                //"iconUrl": browser.runtime.getURL("icons/cake-96.png"),
                "title": "Time for cake!",
                "message": "Something something cake"
            });
            //browser.tabs.create({ 'url': errPage })
        } else {
            return browser.tabs.create({ 'url': matches[0] + devSuffix })
        }
    })
})
