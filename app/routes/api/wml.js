const express  = require('express')
const router = express.Router()
const request = require("request-promise")

router.post('/score', async(req, res) => {
    
    const options = {
        method:"POST",
        url: process.env.AUTH_URL,
        headers:{
            Accept:"application.json",
            "Content-Type":"application/x-www-form-urlencoded"
        },
        form:{
            apikey:process.env.WML_API_KEY,
            grant_type:"urn:ibm:params:oauth:grant-type:api-key"
        }
    }

    let response = ""
    let access_token = ""

    try {
        response = await request(options)
        access_token = JSON.parse(response)["access_token"]
        //res.send(access_token)
    } catch (error){
        console.log(error)
        res.send(error)
    }

    const {year, month, costCenter, account} = req.body
    console.log(year, month, costCenter, account)
})

module.exports = router