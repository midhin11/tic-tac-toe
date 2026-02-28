let gameBoard = function () {
    let board = [];
    for (let i=0; i<3; i++){
        board[i] = [];
        for (let j=0; j<3; j++){
            board[i][j] = "";
        }
    }

    function printBoard() {
        return board 
    }

    function placeMarker(marker, row, col) {
        board[row][col] = marker;
    }

    return {printBoard, placeMarker};
}();


function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}
let player1 = new Player("Player1", "X");
let player2 = new Player("Player2", "O");

let board = gameBoard.printBoard();
let activePlayer = player1;
let cells = document.querySelectorAll(".cell"); // board selection
let commentary = document.querySelector(".win-lose-draw"); // Game status Display
let nextRoundBtn = document.querySelector(".next-round-btn"); // next round button
let restartBtn = document.querySelector(".restart-btn"); // Restart Button
nextRoundBtn.disabled = true;
let isGameOver = false;

// Score display
let playerOneWins = document.querySelector(".player1 > div:nth-of-type(2)");
let drawCount = document.querySelector(".draw > div:nth-of-type(2)");
let playerTwoWins = document.querySelector(".player2 > div:nth-of-type(2)"); 

// Adding loop to assign each cell in the board with click event
for(let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function(e) {
        let row = Number(e.target.dataset.row);
        let col = Number(e.target.dataset.col);

        if(board[row][col] !== "") {
            return;
        } 

        if(isGameOver === true) {
            return;
        }

        e.target.textContent = activePlayer.marker;
        board[row][col] = activePlayer.marker;  

        if(checkWin(board, activePlayer)) {
            commentary.textContent = `${activePlayer.name} with ${activePlayer.marker} wins the Round!`;
            if(activePlayer === player1) {
                playerOneWins.textContent = Number(playerOneWins.textContent) + 1;
            }
            else {
                playerTwoWins.textContent = Number(playerTwoWins.textContent) + 1;
            }
            nextRoundBtn.disabled = false;
            isGameOver = true;
        } 
        else if(isBoardFull(board)) {
            commentary.textContent = `The round is a draw!`;
            isGameOver = true
            drawCount.textContent = Number(drawCount.textContent) + 1;
            nextRoundBtn.disabled = false
        } 
        else {
        activePlayer = activePlayer === player1 ? player2 : player1;
        commentary.textContent = `${activePlayer.name} / ${activePlayer.marker} turn!`
        }
    })
}

// Condtions to happen on clicking the next button
nextRoundBtn.addEventListener("click", function(e) {
    boardLogicClear(board);
    renderClear(cells);

    activePlayer = player1;
    nextRoundBtn.disabled = true;
    commentary.textContent = `${activePlayer.name} / ${activePlayer.marker} turn!`;
    isGameOver = false;
})

// Conditions to restart the game
restartBtn.addEventListener("click", function() {
    nextRoundBtn.disabled = true;
    isGameOver = false;
    activePlayer = player1;
    commentary.textContent = `${activePlayer.name} / ${activePlayer.marker} turn!`;
    playerOneWins.textContent = 0;
    playerTwoWins.textContent = 0;
    drawCount.textContent = 0;

    boardLogicClear(board);
    renderClear(cells);
})

//win-check
function checkWin(board, activePlayer) {
    if((board[0][0] === activePlayer.marker && board[1][1] === activePlayer.marker && board[2][2] === activePlayer.marker)
    || (board[0][0] === activePlayer.marker && board[0][1] === activePlayer.marker && board[0][2] === activePlayer.marker)
    || (board[1][0] === activePlayer.marker && board[1][1] === activePlayer.marker && board[1][2] === activePlayer.marker)
    || (board[2][0] === activePlayer.marker && board[2][1] === activePlayer.marker && board[2][2] === activePlayer.marker)
    || (board[0][0] === activePlayer.marker && board[1][0] === activePlayer.marker && board[2][0] === activePlayer.marker)
    || (board[0][1] === activePlayer.marker && board[1][1] === activePlayer.marker && board[2][1] === activePlayer.marker)
    || (board[0][2] === activePlayer.marker && board[1][2] === activePlayer.marker && board[2][2] === activePlayer.marker)
    || (board[0][2] === activePlayer.marker && board[1][1] === activePlayer.marker && board[2][0] === activePlayer.marker)
    ) {
        return true;
    } 
    else {
        return false;
    }
}

//boardfull check
function isBoardFull(board) {
    let boardArray = [];
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            boardArray.push(board[i][j]);
        }
    }

    for(let item of boardArray){
        if(item == "") {
            return false;
        }
    }

    return true;
}

// Board logic clear 
function boardLogicClear(board) {
    for(let i = 0; i<3; i++){
        for(let j=0; j<3; j++) {
            board[i][j] = "";
        }
    }
}


// DOM board clear 
function renderClear(cells) {
    for(let i=0; i<cells.length; i++){
        cells[i].textContent = "";
    }
}