const UrlPrettifier = require('next-url-prettifier').default

const routes = [
    {
        page: 'index',
        prettyUrl: '/'
    },
    {
        page: 'index'
        // prettyUrl: ({ game = '', user = '', map = '', stratNumber = '' }) =>
        //     `/${game}/${user}/${map}/${stratNumber}`,
        // prettyUrl: ({ game = '', map = '', stratNumber = '' }) =>
        //     `/${game}/${map}/${stratNumber}`,
        // prettyUrlPatterns: [
        //     { pattern: '/:game/:user/:map/:stratNumber' },
        //     { pattern: '/:game/:map/:stratNumber' }
        // ]
    },
    {
        page: 'overwatch',
        prettyUrl: ({ game = '', user = '', map = '', stratNumber = '' }) =>`/Overwatch/${user}/${map}/${stratNumber}`,
        prettyUrl: ({ game = '', user = '', map = '', stratNumber = '' }) =>`/Overwatch/${map}/${stratNumber}`,
        prettyUrlPatterns: [
            { pattern: '/Overwatch/:user/:map/:stratNumber' },
            { pattern: '/Overwatch/:user/:map' },
            // { pattern: '/Overwatch/:map/:stratNumber' },
            { pattern: '/Overwatch/:map' },
            { pattern: '/Overwatch/:user' },
            { pattern: '/Overwatch' },
            { pattern: '/OW/:user/:map/:stratNumber' },
            { pattern: '/OW/:user/:map' },
            // { pattern: '/OW/:map/:stratNumber' },
            { pattern: '/OW/:map' },
            { pattern: '/OW/:user' },
            { pattern: '/OW' }
        ]
    }
    // {
    //     page: 'Overwatch',
    //     prettyUrl: '/OW',
    //     prettyUrlPatterns: [
    //         { pattern: '/Overwatch/:user/:map/:stratNumber' },
    //         { pattern: '/OW/:map/:stratNumber' }
    //     ]
    // }
]

const urlPrettifier = new UrlPrettifier(routes)
exports.default = routes
exports.Router = urlPrettifier
