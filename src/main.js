import domManager from "./domManager";
import player from "./objects/player";
import ship from "./objects/ship";
import "./styles.css";

(() => {
  const player1 = player("Smasnug");

  const longShip = ship(5);
  const coords = ["A1", "A2", "A3", "A4", "A5"];

  player1.gameBoard.placeShip(longShip, coords);
  const dom = domManager(player1);

  const boardContainer = document.getElementById("boards");

  boardContainer.appendChild(dom.createBoard(player1.gameBoard.board, true));
  boardContainer.appendChild(dom.createBoard());
})();
