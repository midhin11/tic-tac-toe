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
        console.log(board);
        
        let row = Number(prompt(`${activePlayer.name} with ${activePlayer.marker} Please select row? (0-2)`, 0));
        let col = Number(prompt(`${activePlayer.name} with ${activePlayer.marker} Please select column? (0-2)`, 0));

        let isValid = validityTest(board, row, col);
        if(isValid) {
            gameBoard.placeMarker(activePlayer.marker, row, col)
           if (gameOverTest(board)){
                console.log(`${activePlayer.name} with ${activePlayer.marker} wins!`)
                break;
            }
            activePlayer = activePlayer === player1 ? player2 : player1;
        } 
        
    }
}

playGame();


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

//Game Over Test 

function gameOverTest (board){
    let isOver = true;

    //Win Test
    if((board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X")
    || (board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X")
    || (board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X")
    || (board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X")
    || (board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X")
    || (board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X")
    || (board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X")
    ) {
        return isOver = true;
    } 
    else if ((board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O")
    || (board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O")
    || (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O")
    || (board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O")
    || (board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O")
    || (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O")
    || (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O")
    ) {
        return isOver = true;
    }

    let boarArray = [];
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            boarArray.push(board[i][j]);
        }
    }

    for(let item of boarArray){
        if(item == "") {
            isOver = false;
        }
    }

    return isOver;
}
