const express = require('express')
const fetcher = require('./fetcher.js')
const server = express()

server.use(express.json())

server.post('/', async (req, res) => {
  let cnae = req.body.cnae

  if (cnae.match(/\b[0-9]{7}$/g)) {
    console.log(`Consulting CNAE no. ${cnae}.`)
    let list = await fetcher.getByCNAE(cnae)
    res
      .status(200)
      .send({ success: "true", result: list })
  } else {
    res
      .status(400)
      .send({ message: "CNAE is invalid." })

  }
})

server.listen(8080, () => {
  console.log("Listening!")
})