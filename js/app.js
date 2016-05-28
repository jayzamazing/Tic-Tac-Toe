$(document).ready(function() {
    var currentGame = newGame();
    /*
    * Function that deals with click events on the board
    */
    $('.ticTacToeBoard').click(function(event) {
        var element = event.target;
        var boardClass = $.trim(element.className.substr(element.className.lastIndexOf(' ')));
        xOrO(element, boardClass);
    });
    /*
    * Function that deals with restarting the game
    */
    $('.newGame').click(function(event) {
      currentGame = newGame();
    });
    /*
     * Function to set a tile as either x or o
     */
    function xOrO(element, boardClass) {
        var playerTurn = currentGame.getTurn();
        var tileStatus = currentGame.getTile(currentGame.getTileIndex(boardClass));
        if (currentGame.getGameStatus() === 1 && tileStatus === 0) { //check that tile hasn't been selected previously
            if (playerTurn === 1) {
              $(element).append('<i class="fa fa-times fa-3x" aria-hidden="true">');
              currentGame.setTile(currentGame.getTileIndex(boardClass));
            } else {
              $(element).append('<i class="fa fa-circle-o fa-3x" aria-hidden="true">');
              currentGame.setTile(currentGame.getTileIndex(boardClass));
            }
            //if there is a winner in vertical, diagonal, or horizontal
            if (currentGame.checkVertical() || currentGame.checkDiagonal() || currentGame.checkHorizontal()) {
                currentGame.endGame();
                
            }
            currentGame.setTurn();
        }
    }

});
/*
 * Used to reset the game back to its initial state
 */
function newGame() {
    var game = new Game();
    game.startingPlayer();
    game.startGame();
    return game;
}
/*
 * Used to keep track of the board
 */
function Game() {
    /*
     * Used to keep track of the state of the game
     * 0 = blank, 1 = x, 2 = o
     */
    this.board = [0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];
    this.turn = 0;
    this.gameStatus = 0;
    this.xWins = 0;
    this.yWIns = 0;
}
/*
* Function to set game status
*/
Game.prototype.startGame = function() {
    this.gameStatus = 1;
};
/*
* Function to get the game stus
*/
Game.prototype.getGameStatus = function() {
    return this.gameStatus;
};
/*
* Function to change the game status to end the game
*/
Game.prototype.endGame = function() {
    this.gameStatus = 0;
};
/*
 * Function to set a tile to either x or o based on whose turn it is
 */
Game.prototype.setTile = function(index) {
    this.board[index] = this.turn;
};
/*
 * Function to get a tiles value
 */
Game.prototype.getTile = function(index) {
    return this.board[index];
};
/*
* Function returns index of the associated board section
*/
Game.prototype.getTileIndex = function(tileName) {
    switch (tileName) {
        case 'boardTopLeft':
            return 0;
        case 'boardTopMiddle':
            return 1;
        case 'boardTopRight':
            return 2;
        case 'boardCenterLeft':
            return 3;
        case 'boardCenterMiddle':
            return 4;
        case 'boardCenterRight':
            return 5;
        case 'boardBottomLeft':
            return 6;
        case 'boardBottomMiddle':
            return 7;
        case 'boardBottomRight':
            return 8;
    }
};
/*
 * Function to find out which player goes first.
 * 1 = x, 2 = o
 */
Game.prototype.startingPlayer = function() {
    this.turn = parseInt(Math.random() * (2 - 1 + 1) + 1);
};
/*
 * Function to get which player plays first
 */
Game.prototype.getTurn = function() {
    return this.turn;
};
/*
 * Function to set the next players turn
 */
Game.prototype.setTurn = function() {
    if (this.turn == 1) {
        this.turn = 2;
    } else {
        this.turn = 1;
    }
};
/*
* Checks the vertical sections of the board to determine if there is a winner
*/
Game.prototype.checkVertical = function() {
    var check = 0;
    for (i = 0; i < 3; i += 1) {
        check = this.board[i] + this.board[i + 3] + this.board[i + 6];
        if (isWinner(check, this.board[i], this.board[i + 3], this.board[i + 6]))
            return 1;
    }
    return 0;
};
/*
* Checks the diagonal sections of the board to determine if there is a winner
*/
Game.prototype.checkDiagonal = function() {
    var check = 0,
        check2 = 0;
    check = this.board[0] + this.board[4] + this.board[8];
    check2 = this.board[2] + this.board[4] + this.board[6];
    if (isWinner(check, this.board[0], this.board[4], this.board[8]) || isWinner(check2, this.board[2], this.board[4], this.board[6]))
        return 1;
    else
        return 0;

};
/*
* Checks the horizontal sections of the board to determine if there is a winner
*/
Game.prototype.checkHorizontal = function() {
    var check = 0;
    for (i = 0; i < this.board.length; i += 3) {
        check = this.board[i] + this.board[i + 1] + this.board[i + 2];
        if (isWinner(check, this.board[i],  this.board[i + 1],  this.board[i + 2]))
            return 1;
    }
    return 0;
};
/*
 * Returns if there is a 1 if winner or 0 if not
 */
function isWinner(check, value1, value2, value3) {
    if (value1 === value2 && value2 === value3) { //ensures values are all the same item
        if (check === 3 || check === 6) {
            return 1;
        } else
            return 0;
    }
    return 0;
}
