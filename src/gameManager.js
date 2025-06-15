const boardBuilder = require("./boardBuilderDOM");
const customAlertDOM = require("./customAlertDOM");
const gameDOM = require("./gameDOM");
const player = require("./objects/player");

const gameManager = () => {
  let player1;
  let player2;

  const start = () => getBoards();

  const getBoards = () => {
    player1 = player();
    player2 = player();
    let acknowledge = false;
    customAlertDOM("We are ready for battle!", () => {
      makeBoards();
    });
    customAlertDOM(
      "Commander Player 2! Ensure opposing commander has no view of the screen!",
      () => {
        acknowledge = true;
        //player2.name passed to ensure the names don't match.
        boardBuilder(player1, player2.name).showDialog();
      },
      "Transmission for Player 2"
    );
    customAlertDOM(
      "Commander Player 1! Ensure opposing commander has no view of the screen!",
      () => {
        acknowledge = true;
        boardBuilder(player2).showDialog();
      },
      "Transmission for Player 1"
    );
  };

  const makeBoards = () => {
    const player1View = gameDOM(player1, player2, start);
    customAlertDOM(
      `Commander ${player1.name} goes first!`,
      () => {
        player1View.createPlayerView();
      },
      "Incoming transmission",
      "Ready?"
    );
  };

  return {
    start,
  };
};

module.exports = gameManager;
