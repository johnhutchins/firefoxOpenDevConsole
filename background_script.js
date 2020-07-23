const devSuffix = '/_ui/common/apex/debug/ApexCSIPage'
browser.browserAction.onClicked.addListener(function () {
    browser.tabs.query({ currentWindow: true, active: true }, tabs => {
        let url = tabs[0].url
        const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
        console.log(typeof matches[0])
        if (!matches[0].includes('salesforce')) {
            console.error("THIS IS AN ERROR. NOT SALESFORCE")
        }
        return browser.tabs.create({ 'url': matches[0] + devSuffix })
    })
})
