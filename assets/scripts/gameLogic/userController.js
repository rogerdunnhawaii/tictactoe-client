const api = require('./api')
const ui = require('./ui')
// const decision = require('./decision')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const decision = require('./decision')
const {sumOfXandO} = decision

const onClick = function () {
    if (store.game.over === false) {
        const turns = decision.countClicks()
        const cellId = $(this).attr('data-cell-index')
        if (decision.alreadyHasAValue(store, cellId)) {
            $('#Message').html('choose a different cell')
        } else {
            if (store.game.cells.every(x => x === '')) {
                store.lastmove = 'x'
                $(this).text(store.lastmove)
            }
            $(this).text(store.lastmove)
            const xOrO = store.lastmove
            if (xOrO === 'o') {
                $('#Message').html(`It is Player X's Turn`)
                sumOfXandO(cellId, xOrO)
                store.countOfO += 1
            } else {
                $('#Message').html(`It is Player O's Turn`)
                store.countOfX += 1
                sumOfXandO(cellId, xOrO)
            }
            decision.isTied(turns)
            decision.isWinner(cellId, xOrO)
            api.updateTurn(cellId, store.lastmove)
                .then(ui.onUpdateGameSuccess)
                .catch(ui.onUpdateGameFailure)
            decision.determineValue()
        }
    }
}

const onGameIndex = function (event) {
    event.preventDefault()
    api.gameIndex()
        .then(ui.onGameIndexSuccess)
        .catch(ui.onGameIndexFailure)
}

const onClose = function () {
    store.games = 'null'
}


const onCreateGame = function (event) {
    event.preventDefault()
    store.game = {}
    store.lastmove = 'x'
    $('.box').text('')
    $('.box').on('click')

    // comment out?
    api.createGame()
        .then(ui.onCreateGameSuccess)
        .catch(ui.onCreateGameFailure)

    // initalize the store
    store.sumOfRow1 = 0
    store.sumOfRow2 = 0
    store.sumOfRow3 = 0
    store.sumOfCol1 = 0
    store.sumOfCol2 = 0
    store.sumOfCol3 = 0
    store.sumOfDiag = 0
    store.sumOfAntiDiag = 0
    store.gameBoard = ['', '', '', '', '', '', '', '', '']
}

const onViewGame = function () {
    console.log('in viewgame')
    $('.tictactoe-grid').show()
    // document.getElementsById('tictactoe-grid').show()
    // console.log('in viewgame after show')
    const id = $(this).attr('id')
    $('#Message').html('You are viewing Game ID#: ' + id)
    $('#tictactoe-grid').show()
    $('#insideGrid').show()
    api.viewGame(id)
        .then(ui.onViewGameSuccess)
        .catch(ui.onViewGameFailure)
}

const onShowGame = function (event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    api.showGame(data)
        .then(ui.onShowGameSuccess)
        .catch(ui.onShowGameFailure)
}

const onUpdateGame = function (event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    api.updateGame(data)
        .then(ui.onUpdateGameSuccess)
        .catch(ui.onUpdateGameFailure)
}

module.exports = {
    onGameIndex,
    onCreateGame,
    onShowGame,
    onUpdateGame,
    onClick,
    onViewGame,
    onClose

}