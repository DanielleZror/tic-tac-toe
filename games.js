const C = require('./consts')
var games = {}

module.exports = {
    createGame: (callback) => {
        let id = Object.keys(games).length + 1
        callback(games[id] = {
            id: id, status: C.GAME_STATUSES.WAITING, users: {}, turn: C.TURN_STATUS.NOT_STARTED,
            board: [new Array(C.GAME.BOARD_SIZE_MAX).fill(C.GAME.CELL_EMPTY),
            new Array(C.GAME.BOARD_SIZE_MAX).fill(C.GAME.CELL_EMPTY),
            new Array(C.GAME.BOARD_SIZE_MAX).fill(C.GAME.CELL_EMPTY)]
        })
    },

    joinGame: (gameId, user, callback, errorCallback) => {
        if (!isGameExist(gameId)) {
            errorCallback(C.ERRORS.GAME_NOT_FOUND)
            return
        }
        let game = games[gameId]
        switch (Object.keys(game.users).length) {
            case (C.GAME.MAX_PLAYERS):
                errorCallback(C.ERRORS.GAME_FULL)
                break
            case (C.GAME.FIRST_PLAYER):
                game.users[C.GAME.MAX_PLAYERS] =
                    { symbol: C.PLAYERS.SYMBOL_TWO, userId: C.GAME.MAX_PLAYERS, name: user, status: C.PLAYER_STATUSES.PLAYING }
                startPlaying(game)
                callback(game.users[C.GAME.MAX_PLAYERS])
                break
            case (C.GAME.EMPTY_GAME):
                game.users[C.GAME.FIRST_PLAYER] =
                    { symbol: C.PLAYERS.SYMBOL_ONE, userId: C.GAME.FIRST_PLAYER, name: user, status: C.PLAYER_STATUSES.WAITING }
                game.status = C.GAME_STATUSES.WAITING
                callback(game.users[C.GAME.FIRST_PLAYER])
                break
            default:
                errorCallback(C.ERRORS.ERROR)
                break
        }
    },

    status: (gameId, callback, errorCallback) => {
        if (!isGameExist(gameId)) {
            errorCallback(C.ERRORS.GAME_NOT_FOUND)
            return
        }
        let game = games[gameId]
        callback({ status: game.status, turn: game.turn })
    },

    statusByUser: (gameId, userId, callback, errorCallback) => {
        if (!isGameExist(gameId)) {
            errorCallback(C.ERRORS.GAME_NOT_FOUND)
            return
        }
        let game = games[gameId]
        let user = getUser(game, userId)
        if (!user) {
            errorCallback(C.ERRORS.USER_NOT_FOUND)
            return
        }
        callback({ status: user.status, isYourTurn: isMyTurn(game, userId) })
    },

    move: (gameId, userId, x, y, callback, errorCallback) => {
        if (!isGameExist(gameId)) {
            errorCallback(C.ERRORS.GAME_NOT_FOUND)
            return
        }
        let game = games[gameId]
        let user = getUser(game, userId)
        if (!user) {
            errorCallback(C.ERRORS.USER_NOT_FOUND)
            return
        }
        switch (game.status) {
            case (C.GAME_STATUSES.PLAYING):
                if (!isMyTurn(game, user.userId)) {
                    errorCallback(C.ERRORS.NOT_YOUR_TURN)
                    return
                }
                if (!isInTheBoard(x, y)) {
                    errorCallback(C.ERRORS.NOT_IN_THE_BOARD_RANGE)
                    return
                }
                if (!isTheCellEmpty(game, x, y)) {
                    errorCallback(C.ERRORS.NOT_EMPTY)
                    return
                }
                makeMove(game, user, x, y)
                callback(game.board)
                break
            case (C.GAME_STATUSES.WAITING):
                errorCallback(C.ERRORS.NEED_MORE_PLAYERS)
                break
            default:
                if (isGameEnd(game)) {
                    errorCallback(C.ERRORS.GAME_END)
                }
                break
        }
    }
}

startPlaying = (game) => {
    game.users[1].status = C.PLAYER_STATUSES.PLAYING
    game.status = C.GAME_STATUSES.PLAYING
    game.turn = Math.floor(Math.random() * C.GAME.MAX_PLAYERS) + 1
}

makeMove = (game, user, x, y) => {
    game.board[x][y] = user.symbol
    game.turn = getNextPlayer(game.turn)
    updateStatus(game, user)
}

updateStatus = (game, user) => {
    if (isUserWin(user.symbol, game.board)) {
        updateWinner(game, C.GAME_STATUSES.PLAYERS_WON[user.userId], user.userId)
    } else if (isNoMove(game)) {
        updateTie(game)
    }
}

updateWinner = (game, newStatus, wonId) => {
    game.status = newStatus
    game.users[wonId].status = C.PLAYER_STATUSES.WON
    game.users[getNextPlayer(wonId)].status = C.PLAYER_STATUSES.LOST
    game.turn = C.TURN_STATUS.DONE
}

updateTie = (game) => {
    game.status = C.GAME_STATUSES.TIE
    game.users[C.PLAYERS.PLAYER_ONE].status = C.PLAYER_STATUSES.TIE
    game.users[C.PLAYERS.PLAYER_TWO].status = C.PLAYER_STATUSES.TIE
    game.turn = C.TURN_STATUS.DONE
}

getNextPlayer = (userId) => {
    return (parseInt(userId) === C.PLAYERS.PLAYER_ONE ? C.PLAYERS.PLAYER_TWO : C.PLAYERS.PLAYER_ONE)
}

getUser = (game, userId) => {
    return game.users[parseInt(userId)]
}

isGameExist = (gameId) => {
    return Boolean(games[gameId])
}

isTheCellEmpty = (game, x, y) => {
    return game.board[x][y] === C.GAME.CELL_EMPTY
}

isMyTurn = (game, userId) => {
    return (game.turn === C.TURN_STATUS.DONE || game.turn === C.TURN_STATUS.NOT_STARTED) ? game.turn : (game.turn === parseInt(userId))
}

isGameEnd = (game) => {
    return (game.status === C.GAME_STATUSES.PLAYERS_WON[C.PLAYERS.PLAYER_ONE] ||
        game.status === C.GAME_STATUSES.PLAYERS_WON[C.PLAYERS.PLAYER_TWO] ||
        game.status === C.GAME_STATUSES.TIE)
}

isInTheBoard = (x, y) => {
    return ((parseInt(x) >= 0 && parseInt(x) < C.GAME.BOARD_SIZE_MAX) &&
        (parseInt(y) >= 0 && parseInt(y) < C.GAME.BOARD_SIZE_MAX))
}

isNoMove = (game) => {
    for (row of game.board) {
        if (row.includes(C.GAME.CELL_EMPTY)) {
            return false
        }
    }
    return true
}

// isUserWin = (user, board) => {
//     return ((board[0][0] === user && board[0][1] === user && board[0][2] === user) ||
//         (board[1][0] === user && board[1][1] === user && board[1][2] === user) ||
//         (board[2][0] === user && board[2][1] === user && board[2][2] === user) ||
//         (board[0][0] === user && board[1][1] === user && board[2][2] === user) ||
//         (board[0][2] === user && board[1][1] === user && board[2][0] === user) ||
//         (board[0][0] === user && board[1][0] === user && board[2][0] === user) ||
//         (board[0][1] === user && board[1][1] === user && board[2][1] === user) ||
//         (board[0][2] === user && board[1][2] === user && board[2][2] === user))
// }

isUserWin = (user, board) => {
    let firstDiagonal = 0
    let secondDiagonal = 0

    for (let i = 0; i < C.GAME.BOARD_SIZE_MAX; i++) {
        let rowCounter = 0
        let colCounter = 0
        for (let j = 0; j < C.GAME.BOARD_SIZE_MAX; j++) {
            if (board[i][j] === user) {
                rowCounter += 1
            }
            if (board[j][i] === user) {
                colCounter += 1
            }
        }
        if (rowCounter === C.GAME.BOARD_SIZE_MAX || colCounter === C.GAME.BOARD_SIZE_MAX) {
            return true
        }
        if (board[i][i] === user) {
            firstDiagonal += 1
        }
        if (board[i][C.GAME.BOARD_SIZE_MAX - i - 1] === user) {
            secondDiagonal += 1
        }
    }

    return (firstDiagonal === C.GAME.BOARD_SIZE_MAX || secondDiagonal === C.GAME.BOARD_SIZE_MAX)
}