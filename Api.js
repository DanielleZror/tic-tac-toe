const games = require('./games')
const C = require('./consts')

module.exports = {
    initApi: (app) => {
        app.post('/api/games/create', (req, res) => {
            games.createGame(sendRes(res))
        })
        app.post('/api/games/:gameId/join', (req, res) => {
            if (req.body.user) {
                games.joinGame(req.params.gameId, req.body.user, sendRes(res), sendBadReq(res))
            } else {
                sendBadReq(res)(C.ERRORS.BODY_PARAMS_NOT_PROVIDED)
            }
        })
        app.get('/api/games/:gameId/status', (req, res) => {
            games.status(req.params.gameId, sendRes(res), sendBadReq(res))
        })
        app.get('/api/games/:gameId/status/users/:userId', (req, res) => {
            games.statusByUser(req.params.gameId, req.params.userId, sendRes(res), sendBadReq(res))
        })
        app.post('/api/games/:gameId/play/users/:userId', (req, res) => {
            if (req.body.x !== undefined && req.body.y !== undefined) {
                games.move(req.params.gameId, req.params.userId, req.body.x, req.body.y, sendRes(res), sendBadReq(res))
            } else {
                sendBadReq(res)(C.ERRORS.BODY_PARAMS_NOT_PROVIDED)
            }
        })
    }
}

sendRes = (res) => {
    return (result) => { res.send(result) };
}

sendBadReq = (res) => {
    return (err) => {
        res.status(400).send({
            message: err
        })
    }
}