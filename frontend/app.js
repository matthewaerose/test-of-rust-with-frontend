const express = require("express")
const app = express()

const backendServiceEndpoint = `http://backend.rust.local.demo.garden`

app.get("/hello-frontend", (req, res) => res.send("Hello from the frontend!"))

app.get("/call-backend", (req, res) => {
  // Query the backend and return the response
  fetch(backendServiceEndpoint)
    .then((response) => response.text())
    .then((message) => {
      message = `Backend says: '${message}'`
      res.json({
        message,
      })
    })
    .catch((err) => {
      res.statusCode = 500
      res.json({
        error: err,
        message: "Unable to reach service at " + backendServiceEndpoint,
      })
    })
})

module.exports = { app }
