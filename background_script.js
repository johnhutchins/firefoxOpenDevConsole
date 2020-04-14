const devSuffix = '/_ui/common/apex/debug/ApexCSIPage'
browser.browserAction.onClicked.addListener(function () {
    const currentUrl = browser.tabs[0].url
    const matches = currentUrl.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
    let creating = browser.tabs.create({
        url: matches[0] + devSuffix
    })
})