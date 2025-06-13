import domManager from "./domManager";
import player from "./objects/player";
import ship from "./objects/ship";
import "./styles.css";

const moves = new Set();
const randomCoords = () => {
  let result = undefined;
  do {
    const letter = String.fromCharCode(Math.round(Math.random() * 9) + 65);
    const number = Math.round(Math.random() * 9) + 1;
    result = `${letter}${number}`;
  } while (moves.has(result));
  moves.add(result);

  return result;
};

(() => {
  const player1 = player("Smasnug");
  const player2 = player("Jojo");

  const longShip1 = ship(5);
  const longShip2 = ship(5);
  const longShipCoords = ["A1", "A2", "A3", "A4", "A5"];

  const mediumShip1 = ship(3);
  const mediumShip2 = ship(3);
  const mediumShipCoords = ["B8", "C8", "D8"];

  player1.gameBoard.placeShip(longShip1, longShipCoords);
  player1.gameBoard.placeShip(mediumShip1, mediumShipCoords);

  player2.gameBoard.placeShip(longShip2, longShipCoords);
  player2.gameBoard.placeShip(mediumShip2, mediumShipCoords);

  const dom = domManager(player1, player2);
  dom.createBothBoards();

  setInterval(() => {
    dom.receiveAttack(randomCoords());
  }, 1000);
})();
