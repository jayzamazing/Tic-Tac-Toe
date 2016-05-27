$(document).ready(function() {

});
/*
* Used to reset the game back to its initial state
*/
function newGame() {
  var game = new Game();
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
                0, 0, 0];
}
/*
* Function to set a tile to either x or o based on whose turn it is
*/
Game.prototype.setTile = function(index, turn) {
  this.board[index] = turn;
};
