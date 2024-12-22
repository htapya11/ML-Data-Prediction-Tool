const express  = require('express')
const router = express.Router()
const request = require("request-promise")
const utils = require("../../utils/utils")
const fields = utils.fields
const accountMap = utils.accountMap


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

    const template = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    template[fields.findIndex((val)=>val === `Year_${year}`)] = 1
    template[fields.findIndex((val)=>val === `Month_${month}`)] = 1
    template[fields.findIndex((val)=>val === `Account_ACC${account}`)] = 1
    template[fields.findIndex((val)=>val === `Cost Center_${costCenter}`)] = 1
    template[fields.findIndex((val)=>val === `Account Type_${accountMap[account]}`)] = 1

    res.send(
        {
        "fields":fields,
        "template":template
        }
    )

    const scoring_options = {
        method:"POST",
        url:process.env.WML_SCORING_URL,
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer $(access_token}`,
            "ML-Instance-ID":process.env.WML_INSTANCE_ID
        },
        body:JSON.stringify({fields:fields, values:[template]})

    }
    let scoring_response = ""
    try {
        scoring_response = await request(scoring_options)
        res.send(scoring_response)
    } catch (error){
        console.log(error)
        res.send(error)
    }

})

module.exports = router