const express = require('express')
const next = require('next')
const Router = require('./routes').Router

const dev = process.env.NODE_ENV !== 'dev'
const port = parseInt(process.env.PORT, 10) || 42069
const app = next({ dev })
const handle = app.getRequestHandler()

// const { getShows, getShow } = require('./lib/getShows');

app.prepare().then(() => {
    const server = express()
    // Custom Next.js URLs

    Router.forEachPrettyPattern((page, pattern, defaultParams) => {
        // console.log({ page, pattern, defaultParams })
        server.get(pattern, (req, res) => {
            app.render(
                req,
                res,
                `/${page}`,
                Object.assign({}, defaultParams, req.query, req.params)
            )
        })
    })
    // everything else
    server.get('*', (req, res) => handle(req, res))
    server.listen(port, () => `Listening on ${port}`)
})
