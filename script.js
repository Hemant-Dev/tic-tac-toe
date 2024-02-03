// A IIFE To Set and Invoke the Game Board Module
const gameBoard = (
    function () {
        let board = [['', '', ''], ['', '', ''], ['', '', '']];

        const startGame = () => console.log(`Starting Game!`);

        const getBoard = () => board;

        const renderBoard = () => printBoard();

        function resetBoard() {
            board = [['', '', ''], ['', '', ''], ['', '', '']];
            this.renderBoard();
        }
        function printBoard() {
            // for (let row = 0; row < 3; row++) {
            //     console.log(board[row]);
            // }
            const boardWithValues = board.map((row) => row.map((cell) => cell));
            console.log(boardWithValues);
        }

        function checkWinner() {
            //row check
            for (let row = 0; row < 3; row++) {
                let countX = 0, countO = 0;
                for (let col = 0; col < 3; col++) {
                    if (board[row][col] === 'X')
                        countX++;
                    else if (board[row][col] === 'O')
                        countO++;
                }
                if (countX === 3) {
                    console.log(`Winner is X`);
                    break;
                }
                if (countO === 3) {
                    console.log(`Winner is O`);
                    break;
                }
            }

            // col check
            for (let col = 0; col < 3; col++) {
                let countX = 0, countO = 0;
                for (let row = 0; row < 3; row++) {
                    if (board[row][col] === 'X')
                        countX++;
                    else if (board[row][col] === 'O')
                        countO++;
                }
                if (countX === 3) {
                    console.log(`Winner is X`);
                    break;
                }
                if (countO === 3) {
                    console.log(`Winner is O`);
                    break;
                }
            }

            // left diag check
            let countX = 0, countO = 0;
            let leftDiag = [board[0][0], board[1][1], board[2][2]];
            for(let i = 0; i<3; i++){
                if(leftDiag[i] === 'X')
                    countX++;
                else if(leftDiag[i] === 'O')
                    countO++;
            }
            if (countX === 3) {
                console.log(`Winner is X`);
                return;
            }
            if (countO === 3) {
                console.log(`Winner is O`);
                return;
            }

            //Resetting x and o count
            countO = 0, countX = 0;
            let rightDiag = [board[0][2], board[1][1], board[2][0]];
            for(let i = 0; i<3; i++){
                if(rightDiag[i] === 'X')
                    countX++;
                else if(rightDiag[i] === 'O')
                    countO++;
            }
            if (countX === 3) {
                console.log(`Winner is X`);
                return;
            }
            if (countO === 3) {
                console.log(`Winner is O`);
                return;
            }


        }

        return { startGame, renderBoard, getBoard, checkWinner, resetBoard };
    }
)();

function GameController
    (
        playerOneName = "Player One",
        playerTwoName = "Player Two"
    ) {
    
        const board = gameBoard.getBoard();

    const players = [
        {
            name: playerOneName,
            value: 'X'
        },
        {
            name: playerTwoName,
            value: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    function playTurn(row, col) {

        console.log(`${getActivePlayer().name}'s turn.`)

        if (board[row][col] === 'X' || board[row][col] === 'O') {
            console.log(`Position already equipped!`);
            return;
        } else {
            board[row][col] = getActivePlayer().value;
        }

        switchPlayerTurn();
        gameBoard.checkWinner();
        gameBoard.renderBoard();
    }

    return { playTurn, getActivePlayer, start: gameBoard.startGame }

}

const game = GameController("Hemant", "Aarav");



