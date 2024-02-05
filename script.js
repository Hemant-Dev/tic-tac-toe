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

    let winnerPlayer = '';
    const getWinner = () => winnerPlayer;

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
            winnerPlayer = getActivePlayer().name;
            gameBoard.renderBoard();
            gameBoard.resetBoard();
            board = gameBoard.getBoard();
            return;
        }
        if(gameBoard.isBoardFull()){
            console.log(`This is a Draw!!`);
            winnerPlayer = 'Draw';
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
        playTurn, getActivePlayer, start: gameBoard.startGame, checkRows, checkColumns, checkDiagonals,
        getWinner
    };

}



function screenController() {
    let game = GameController("Hemant", "Aarav");
    const boardDiv = document.querySelector('.board');
    const turnHeader = document.querySelector('.turn');
    
    const replay = document.createElement('button');
    replay.classList.add('replay-btn');
    replay.textContent = 'Replay'; 

    const updateScreen = () => {
        boardDiv.textContent = '';

        const activePlayer = game.getActivePlayer();
        const board = gameBoard.getBoard();
        
        turnHeader.textContent = `${activePlayer.name}'s Turn with symbol ${activePlayer.value}`;
        
        // let index = 0;
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.dataset.column = colIndex;
                cellButton.dataset.row = rowIndex;
                cellButton.textContent = cell;
                boardDiv.appendChild(cellButton);
            });
        });        
    }

    function handleBoardClick(e) {
        const selectedRow = e.target.dataset.row;
        const selectedCol = e.target.dataset.column;

        if(!selectedRow || !selectedCol)
            return;
        
        game.playTurn(selectedRow, selectedCol);
        if(game.getWinner() !== ''){
            boardDiv.textContent = '';
            turnHeader.textContent = `Winner is ${game.getWinner()}`;
            boardDiv.appendChild(replay);
            return;
        }
        updateScreen();
    }

    function handleReplay() {
        game = GameController("Hemant", "Aarav");
        game.winnerPlayer = ''; //Resetting the winner
        updateScreen();
    }

    boardDiv.addEventListener('click', handleBoardClick);
    replay.addEventListener('click', handleReplay);
    updateScreen();
    
}

screenController();


