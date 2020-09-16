module.exports = {
    GAME_STATUSES: {
        WAITING: 'WAITING',
        PLAYING: 'PLAYING',
        PLAYERS_WON: {1: 'PLAYER_ONE_WON', 2: 'PLAYER_TWO_WON'},
        TIE: 'TIE',
    },
    PLAYER_STATUSES: {
        WAITING: 'WAITING',
        PLAYING: 'PLAYING',
        WON: 'WON',
        LOST: 'LOST',
        TIE: 'TIE',
    },
    TURN_STATUS: {
        NOT_STARTED: 'NOT_STARTED',
        DONE: 'DONE'
    },
    PLAYERS: {
        PLAYER_ONE: 1,
        PLAYER_TWO: 2,
        SYMBOL_ONE: 'O',
        SYMBOL_TWO: 'X'
    },
    ERRORS: {
        USER_NOT_FOUND: 'USER_NOT_FOUND',
        GAME_NOT_FOUND: 'GAME_NOT_FOUND',
        NOT_EMPTY: 'NOT_EMPTY',
        GAME_END: 'GAME_END',
        GAME_FULL: 'GAME_FULL',
        NOT_IN_THE_BOARD_RANGE: 'NOT_IN_THE_BOARD_RANGE',
        NOT_YOUR_TURN: 'NOT_YOUR_TURN',
        NEED_MORE_PLAYERS: 'NEED_MORE_PLAYERS',
        BODY_PARAMS_NOT_PROVIDED: 'BODY_PARAMS_NOT_PROVIDED',
        ERROR: 'SOMETHING HAPPEND. TRY AGAIN'
    },
    GAME: {
        CELL_EMPTY: '',
        EMPTY_GAME: 0,
        FIRST_PLAYER: 1,
        MAX_PLAYERS: 2,
        BOARD_SIZE_MAX: 3
    }
}
