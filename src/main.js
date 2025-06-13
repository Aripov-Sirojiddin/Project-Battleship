import domManager from "./domManager";
import player from "./objects/player";
import ship from "./objects/ship";
import "./styles.css";

(() => {
  const player1 = player("Smasnug");
  const player2 = player("Jojo");

  const longShip = ship(5);
  const longShipCoords = ["A1", "A2", "A3", "A4", "A5"];

  const mediumShip = ship(3);
  const mediumShipCoords = ["B8", "C8", "D8"];

  player1.gameBoard.placeShip(longShip, longShipCoords);
  player1.gameBoard.placeShip(mediumShip, mediumShipCoords);

  player2.gameBoard.placeShip(longShip, longShipCoords);
  player2.gameBoard.placeShip(mediumShip, mediumShipCoords);

  const dom = domManager(player1, player2);
  dom.createBothBoards();
})();
