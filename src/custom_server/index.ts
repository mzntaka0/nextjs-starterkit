//import * as express from 'express'
//import * as next from 'next'
import * as proxy from 'http-proxy-middleware'
import * as cors from 'cors'
import * as helmet from 'helmet'
//import {Request, Response, NextFunction}
import {IncomingMessage, ServerResponse} from 'http'

const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const API_DOMAIN = process.env.API_DOMAIN || 'http://localhost:3002'
const PORT = process.env.PORT || 8000


const app = next({dir: '.', dev})
const handle = app.getRequestHandler()


// TODO: Add passport.js for AuthN/AuthZ and create some BFF features
const main = async () => {
  await app.prepare()
  const server = express()


  //const options = {
  //  targert: '/api',
  //  changeOrigin: false,
  //  ws: false  // proxy websockets
  //}

  //server.use('/api', proxy(options)
  server.use(helmet())
  server.use(cors())

  server.get('*', (req: IncomingMessage, res: ServerResponse) => {
    return handle(req, res)
  })

  server.listen(PORT, (err: Error) => {
    if (err) {
      throw err
    }
    console.log(`Server running on port: ${PORT}`)
  })
}


main()
