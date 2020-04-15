
const devSuffix = '/_ui/common/apex/debug/ApexCSIPage'
browser.browserAction.onClicked.addListener(function () {
    browser.tabs.query({ currentWindow: true, active: true }, tabs => {
        let url = tabs[0].url
        const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
        return browser.tabs.create({ 'url': matches[0] + devSuffix })
    })
})
