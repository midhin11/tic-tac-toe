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



let playGame = function() {

    function Player(name, marker) {
        this.name = name;
        this.marker = marker;
    }
    let player1 = new Player("Player1", "X");
    let player2 = new Player("Player2", "O");
    let activePlayer = player1;
    let board = gameBoard.printBoard();

    
    while(true){
        
        let row = Number(prompt(`${activePlayer.name} with ${activePlayer.marker} Please select row? (0-2)`, 0));
        let col = Number(prompt(`${activePlayer.name} with ${activePlayer.marker} Please select column? (0-2)`, 0));

        let isValid = validityTest(board, row, col);
        if(isValid) {
            gameBoard.placeMarker(activePlayer.marker, row, col)
            displayBoard(board);

            if(checkWin(board, activePlayer) === true) {
                console.log(`${activePlayer.name} with ${activePlayer.marker} marker wins!`)
                break;
            } else if (isBoardFull(board) === true) {
                console.log(`The Game is a draw!`)
                break;
            } else {activePlayer = activePlayer === player1 ? player2 : player1};
        } 
        
    }
}

playGame();


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


//validity test

function validityTest(board, row, col){
    if(row<0 || row>2 || col<0 || col>2){
        return false;
    }
    else if(board[row][col] != ""){
        return false;
    }
    else return true;
}

//display-board 

function displayBoard (board) {
    for (let i=0; i<3; i++){
        const row = board[i].map(cell => cell === "" ? " " : cell)
        console.log(row.join(" | "));
        if(i<2){
            console.log("----------")
        }
    }
    console.log("");
    console.log("");
}
