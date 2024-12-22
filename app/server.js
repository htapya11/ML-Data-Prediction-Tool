const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const wmlRoutes = require("./routes/api/wml")
app.use("/api/wml", wmlRoutes)

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})


