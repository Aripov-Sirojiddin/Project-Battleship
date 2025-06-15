import boardBuilder from "./boardBuilderDOM";
import customAlertDOM from "./customAlertDOM";
import gameDOM from "./gameDOM";
import player from "./objects/player";
import "./styles.css";

const getBoardsForBothPlayers = (player1, player2) => {
  let acknowledge = false;
  customAlertDOM("We are ready for battle!", () => {
    startGame(player1, player2);
  });
  customAlertDOM(
    "Commander Player 2! Ensure opposing commander has no view of the screen!",
    () => {
      acknowledge = true;
      boardBuilder(player1).showDialog();
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

const startGame = (player1, player2) => {
  const player1View = gameDOM(player1, player2);

  player1View.createPlayerView();
};

(() => {
  const player1 = player();
  const player2 = player();

  getBoardsForBothPlayers(player1, player2);
  // const newBoard = boardBuilder(player1);

  // body.appendChild(
  //   newBoard.showDialog(() => {
  //     const game = gameDOM(player1, player1);
  //     game.createBothBoards();
  //   })
  // );
})();
