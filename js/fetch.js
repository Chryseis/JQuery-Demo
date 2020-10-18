const https = require('https');
const http = require('http')
const querystring = require('querystring');


const fetchApi = async ({
                            hostname, port, path, method = 'GET', data, headers = {
        'content-type': 'application/json'
    }, isHttps = true
                            , callback
                        }) => {
    console.log(data);
    let fetch = isHttps ? https : http;
    method = method.toUpperCase();
    data = headers['content-type'] === 'application/x-www-form-urlencoded' ? querystring.stringify(data) : JSON.stringify(data);
    headers = method == 'POST' ? Object.assign({}, headers, {'Content-Length': Buffer.byteLength(data)}) : headers;
    path = method == 'GET' ? `${path}?${querystring.stringify(data)}` : path;
    return await new Promise((resolve, reject) => {
        let rawData = '';
        const req = fetch.request({
            hostname,
            port,
            path,
            method,
            headers
        }, (res) => {
            res.setEncoding('utf8');
            res.on('data', chunk => rawData += chunk);
            res.on('end', () => {
                try {
                    callback && callback(rawData, 'true')
                    console.log(JSON.parse(rawData));
                    resolve(JSON.parse(rawData))
                } catch (err) {
                    throw err
                }
            })
        });

        req.on('error', (e) => {
            callback && callback(`problem with request: ${e.message}`, 'false');
            console.error(`problem with request: ${e.message}`);
        });


        method == 'POST' && req.write(data);
        req.end();
    })
}

async function test() {
    debugger;
    const res = await fetchApi({
        hostname: '10.20.8.185/',
        port: '8080',
        path: '/frontweb/code.htm',
        headers: {
            'content-type': 'application/json'
        },
        isHttps: false
    })
    debugger;
    console.log(res)
}


test();