// Creating board using IIFEs
let Gameboard = function (){
    const array = [];
    const rows = 3;
    const columns = 3;

    for(let i = 0; i<rows; i++){
        array[i] = []; 
        for(let j = 0; j<columns; j++){
            array[i].push("");
        }
    }

    return {array};
}()

let board = Gameboard.array;


//Printing the board
let displayboard = function(board){
    for (let i of board){
        let joined = i.join(" | ");
        console.log(joined);
    }
}


//checking condition for winning
let winCondition = function (board, marker) {
    return (
        (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) 
        || (board[0][2] === marker && board[1][1] === marker && board[2][0] === marker)
        || (board[0][0] === marker && board[0][1] === marker && board[0][2] === marker)
        || (board[1][0] === marker && board[1][1] === marker && board[1][2] === marker) 
        || (board[2][0] === marker && board[2][1] === marker && board[2][2] === marker) 
        || (board[0][0] === marker && board[1][0] === marker && board[2][0] === marker) 
        || (board[0][1] === marker && board[1][1] === marker && board[2][1] === marker)
        || (board[0][2] === marker && board[1][2] === marker && board[2][2] === marker)
    )
}

//play
let play = function(player1, player2, board) {
    let moves = 0;
    let maxMoves = board.length * board[0].length;
    let currentPlayer = player1;

    while(moves < maxMoves) {
        let position = prompt(`${currentPlayer.name}'s (${currentPlayer.marker}) chance: (eg: 1,2)`);
        let [row, column] = position.split(",");

        //checking if rows and columns enterd are within bounds
        if(row>=0 && column>=0 && row<=2 && column<=2) {
            //checking if position already taken
            if(board[row][column] === ""){
                board[row][column] = currentPlayer.marker;
                moves++;
                displayboard(board);
                //checking win condition
                if(winCondition(board, currentPlayer.marker)) {
                    console.log (`${currentPlayer.name} wins`);
                    break;
                }

                currentPlayer = currentPlayer === player1 ? player2 : player1;
            }
            else {
                console.log("Position taken! Try again!")
            }
        }
        else {
            console.log("Invalid position! Please enter a valid position!");
        }

        if(moves === 8){
            console.log("Game over! It's a tie");
        }
    }

}

//Creating players and calling play
let playerFactory = function(name, marker){
    return {name, marker};
}

let player1 = playerFactory("Player1", "X");
let player2 = playerFactory("Player2", "O");

play(player1, player2, board);