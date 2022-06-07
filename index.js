const keys = require('./env')
const functions = require('@google-cloud/functions-framework')


// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
const main = functions.http('scrape_defillama', (req, res) => {
    const protocol = req.query.protocol
    const adaptor = require(`./src/adaptors/${protocol}/index`)

    adaptor.apy().then(result => {
        res.status(200).send(result)
    }).catch(error => {
        console.log(error)
        res.status(500).send(error)

    })
})

module.exports = main

