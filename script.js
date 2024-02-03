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

        function isBoardFull(){
            const board = getBoard();
            let count = 0;
            for(let i=0; i<3; i++){
                for(let j=0; j<3; j++){
                    if(board[i][j] !== '')
                        count++;
                }
            }
            return count === 9;
        }
        
        return {
            startGame, renderBoard, getBoard, resetBoard, isBoardFull
        };
    }
)();

function GameController
    (
        playerOneName = "Player One",
        playerTwoName = "Player Two"
    ) {

    let board = gameBoard.getBoard();

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

        if(this.checkRows() || this.checkColumns() || this.checkDiagonals()){
            console.log(`Winner is ${getActivePlayer().name}!!`);
            gameBoard.renderBoard();
            gameBoard.resetBoard();
            board = gameBoard.getBoard();
            return;
        }
        else if(gameBoard.isBoardFull()){
            console.log(`This is a Draw!!`);
            gameBoard.renderBoard();
            gameBoard.resetBoard();
            board = gameBoard.getBoard();
            return;
        }
        gameBoard.renderBoard();
        switchPlayerTurn();
        
    }

    function checkRows() {
        const board = gameBoard.getBoard();
        const value = this.getActivePlayer().value;
        for(let row=0; row<3; row++){
            const rowArr = board[row];
            // console.log(rowArr);
            if(rowArr.every((field) => field === value))
                return true;
        }
        return false;
    }
    function checkColumns() {
        const board = gameBoard.getBoard();
        const value = this.getActivePlayer().value;
        for(let col=0; col<3; col++){
            const colArr = [];
            for(let row=0; row<3; row++)
                colArr.push(board[row][col]);
            // console.log(colArr);
            if(colArr.every((field) => field === value))
                return true;
        }
        return false;
    }
    function checkDiagonals(){
        const board = gameBoard.getBoard();
        const value = this.getActivePlayer().value;
        const leftDiagonal = [board[0][0], board[1][1], board[2][2]];
        const rightDiagonal = [board[0][2], board[1][1], board[2][0]];
        if(leftDiagonal.every((field) => field === value) ||
           rightDiagonal.every((field) => field === value)
           )
           return true;
        return false;
    }

    return {
        playTurn, getActivePlayer, start: gameBoard.startGame, checkRows, checkColumns, checkDiagonals
    };

}

const game = GameController("Hemant", "Aarav");



