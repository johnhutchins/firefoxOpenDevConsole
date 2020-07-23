const devSuffix = '/_ui/common/apex/debug/ApexCSIPage'
browser.browserAction.onClicked.addListener(function () {
    browser.tabs.query({ currentWindow: true, active: false }, tabs => {
        tabs.forEach((tab) => {
            if (tab.url.includes('salesforce') || tab.url.includes('lightning.force')) {
                url = tab.url
            } else {
                url = tabs[0].url
            }
        })
        const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
        return browser.tabs.create({ 'url': matches[0] + devSuffix })
    })
})
