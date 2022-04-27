const express = require('express')
const router = require('./routes/routes.js')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

/* Middleware */
// cors middleware for allowing requests to skip policies, and access resources from remote hosts
app.use(cors())
// Used instead of the body-parser module. Allows accessing of body from requests.
app.use(express.json())
/* Middleware */

app.use('/api/restaurants', router)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})