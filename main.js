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
let play = function(player1, player2, board, result) {
    let moves = 0;
    let currentPlayer = player1;
    let gameOver = false;

    const boardDOM = document.querySelector(".game-board");
    boardDOM.addEventListener("click", markerSelect)

    function markerSelect(e) {
        if(gameOver){
            return;       
        }
        if(e.target.classList.contains('grids') && e.target.textContent === ""){
            e.target.textContent = currentPlayer.marker;
            boardMarking(board, currentPlayer.marker, e);
            if(winCondition(board, currentPlayer.marker)){
               
                console.log(`${currentPlayer.name} wins`);
                result.textContent = `${currentPlayer.marker} wins`;

                const newGameBtn = document.createElement("button");
                newGameBtn.textContent = "New Game";
                newGameBtn.classList = "new-game"
                const article = document.querySelector(".article");
                article.appendChild(newGameBtn);

                // Remove the reset button after the game is over
                const resetBtn = document.querySelector(".reset");
                resetBtn.remove();

                // Add event listener to the new game button
                newGameBtn.addEventListener("click", function () {
                    resetGame(board);
                    const allGrids = document.querySelectorAll(".grids");
                    for (let i of allGrids) {
                        i.textContent = "";
                    }
                    result.textContent  = "";
                    article.removeChild(newGameBtn); // Remove the "New Game" button
                    const buttons = document.querySelector(".buttons");
                    buttons.appendChild(playBtn);
                }); 

                gameOver = true;
                return;
            }

            currentPlayer = currentPlayer === player1 ? player2 : player1;
            result.textContent = `${currentPlayer.marker}'s turn`;
            moves++;

            if(moves === 9) {
                result.textContent = "The game is a draw! Press reset!"
                gameOver = true;

                const newGameBtn = document.createElement("button");
                newGameBtn.textContent = "New Game";
                newGameBtn.classList = "new-game"
                const article = document.querySelector(".article");
                article.appendChild(newGameBtn);

                // Remove the reset button after the game is over
                const resetBtn = document.querySelector(".reset");
                resetBtn.remove();

                // Add event listener to the new game button
                newGameBtn.addEventListener("click", function () {
                    resetGame(board);
                    const allGrids = document.querySelectorAll(".grids");
                    for (let i of allGrids) {
                        i.textContent = "";
                    }
                    result.textContent  = "";
                    article.removeChild(newGameBtn); // Remove the "New Game" button
                    const buttons = document.querySelector(".buttons");
                    buttons.appendChild(playBtn);
                }); 

                return; 
            }
        }
    }
}

//Creating players and calling play
let playerFactory = function(name, marker){
    return {name, marker};
}

let player1 = playerFactory("Player1", "X");
let player2 = playerFactory("Player2", "O");

//Play button 
const result = document.querySelector(".result");
const playBtn = document.querySelector(".play");
playBtn.addEventListener("click", function(){
    playBtn.remove();
    play(player1, player2, board, result);

    //Reset button
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    resetBtn.classList = "reset";
    const buttons = document.querySelector(".buttons");
    buttons.appendChild(resetBtn);
    resetBtn.addEventListener("click", function(){
        const allGrids = document.querySelectorAll(".grids");
        for(let i of allGrids){
            i.textContent = ""; 
        }
    });
})

//resetting the array
function resetGame(board) {
    // Reset the board array
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = "";
        }
    }
}


//DOM
function boardMarking (board, marker, e){
    if(e.target.classList.contains("grid1")) {
        board[0][0] = marker;
    }
    if(e.target.classList.contains("grid2")) {
        board[0][1] = marker;
    }
    if(e.target.classList.contains("grid3")) {
        board[0][2] = marker;
    }
    if(e.target.classList.contains("grid4")) {
        board[1][0] = marker;
    }
    if(e.target.classList.contains("grid5")) {
        board[1][1] = marker;
    }
    if(e.target.classList.contains("grid6")) {
        board[1][2] = marker;
    }
    if(e.target.classList.contains("grid7")) {
        board[2][0] = marker;
    }
    if(e.target.classList.contains("grid8")) {
        board[2][1] = marker;
    }
    if(e.target.classList.contains("grid9")) {
        board[2][2] = marker;
    }
}