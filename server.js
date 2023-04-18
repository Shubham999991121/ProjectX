const express = require('express')
const app = express();
const axios = require('axios').default;


app.use(express.json())
app.use(express.urlencoded({extended : true}))

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const REAL_REQUEST_URL = "https://andind2022.com:443/UserAuth/GetCaptcha?v=1.0"
const REAL_REG__REQUEST_URL = "https://andind2022.com:443/Account/v1.1/Mb/Register/Registration"

const proxy = {
    protocol: 'http',
    host: 'premium.residential.proxyrack.net',
    port: 9000,
    auth: {
        username: 'astube1-country-RU',
        password: 'e58253-2984cd-48a6ee-aa5e24-cf16ca'
    }
}
// const proxy = {
//     protocol: 'http',
//     host: 'p.webshare.io',
//     port: 80,
//     auth: {
//         username: 'frhqalgx-rotate',
//         password: 'gx8058hs0c1b'
//     }
// }

app.post("/UserAuth/GetCaptcha", async (req, res) => {
    const copyHeaders = JSON.parse(JSON.stringify(req.headers));
    delete copyHeaders['host']
    delete copyHeaders['content-length']
    delete copyHeaders['connection']

    const resp = await getCaptcha(copyHeaders, req.body)
    res.json(resp.data)
})


app.post("/Account/v1.1/Mb/Register/Registration", async (req, res) => {
    const copyHeaders = JSON.parse(JSON.stringify(req.headers));
    delete copyHeaders['host']
    delete copyHeaders['content-length']
    delete copyHeaders['connection']

    const resp = await reg(copyHeaders, req.body)
    res.json(resp.data)
})

async function getCaptcha(headers, body) {
    try {
        const resp =  await axios.post(REAL_REQUEST_URL, body, { headers , proxy});

        return resp;
    } catch (error) {
        return error;
    }
}

async function reg(headers, body) {
    try {
        return await axios.post(REAL_REG__REQUEST_URL, body, { headers, proxy });
    } catch (error) {
        return error;
    }
}

app.get('/', (req, res) => {
    res.send("Server is up")
})

async function test(){
    headers =  { 
        'X-Language': 'en', 
        'X-Whence': '22', 
        'X-Referral': '8', 
        'X-Group': '62', 
        'X-Bundleid': 'org.xbet.client1', 
        'Appguid': '646613be459f170d_2', 
        'X-Request-Guid': '8_646613be459f170d_2_1681737988_186062', 
        'X-Fcountry': '8', 
        'Content-Type': 'application/json',
        // 'Accept-Encoding' : 'gzip, deflate, br',
        // 'Accept' : 'application/json',
        // 'Connection' :'keep-alive',
        'user-agent' :'PostmanRuntime/7.28.4',
      }

    body = {
        "Type": "3",
        "Language": "en",
        "AppGuid": "19f88fc3aea00be7_2",
        "Method": "Registration"
      }

    const resp = await getCaptcha(headers, body)

    console.log(resp.data);
}


 app.listen(1111);

// test();