const devSuffix = '/_ui/common/apex/debug/ApexCSIPage'
let allOrgs = []

//var instead of let?
browser.browserAction.onClicked.addListener(function (info) {
    let baseUrl = ''

    //never save the org info, delete it and rebuild everytime the browser action is called
    if (allOrgs.length > 0) {
        allOrgs = []
    }
    browser.tabs.query({ currentWindow: true }, tabs => {
        let domains = []
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].url.includes('salesforce') || tabs[i].url.includes('lightning.force')) {
                let domain = tabs[i].url.match(/^https?\:\/\/([^.]+)/i)
                if (!domains.includes(domain[1])) {
                    domains.push(domain[1])
                    let obj = {
                        'url': tabs[i].url,
                        'name': domain[1]
                    }
                    allOrgs.push(obj)
                }
            }
        }
        if (domains.length > 1) {
            console.log(allOrgs)
            //handle multiple orgs here, might need to
            return allOrgs
        } else {
            const matches = allOrgs[0]['url'].match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
            console.log("Match = " + matches[0])
            return browser.tabs.create({ 'url': matches[0] + devSuffix })
        }
    })
})