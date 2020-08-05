const devSuffix = '/_ui/common/apex/debug/ApexCSIPage'
let allOrgs = []

function handleResponse() {
    console.log(`Message from the content script:  ${message.response}`)
    let url = message.response.data['url']
    return browser.tabs.create({ 'url': url + devSuffix })
}

function handleError() {
    console.log("Error.")
}

function sendMessageToContent(data) {
    console.log("opening sendMessagToContent method...")
    let sending = browser.runtime.sendMessage({
        data: data
    })
    try {
        console.log("sending == ", sending)
        sending.then(handleResponse, handleError)
    } catch (e) {
        console.log("error: ", e)
    }
}

browser.browserAction.onClicked.addListener(function () {
    //Clean old data if exists
    if (allOrgs.length > 0) {
        allOrgs = []
    }
    browser.tabs.query({ currentWindow: true }, tabs => {
        let domains = []
        //Get all Urls
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
            //TODO wait for response from user, and return the new url to match that.
            console.log('send Orgs to the Content Script here...')
            sendMessageToContent(allOrgs)
        } else {
            const matches = allOrgs[0]['url'].match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
            console.log("Match = " + matches[0])
            return browser.tabs.create({ 'url': matches[0] + devSuffix })
        }
    })
})