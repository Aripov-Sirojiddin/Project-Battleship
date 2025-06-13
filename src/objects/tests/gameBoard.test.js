const gameBoard = require("../gameBoard");
const ship = require("../ship");

test('Should place "Single square ship" to correct coordinates.', () => {
  const board = gameBoard();

  const longShip = ship(1);
  const coords = ["A1"];

  board.placeShip(longShip, coords);

  expect(board.checkCoords("A1")).toBe(longShip);
});

test('Should place "Long ship" to correct coordinates.', () => {
  const board = gameBoard();

  const longShip = ship(5);
  const coords = ["A1", "A2", "A3", "A4", "A5"];

  board.placeShip(longShip, coords);

  coords.forEach((coord) => {
    expect(board.checkCoords(coord)).toBe(longShip);
  });
});

test("Check empty coords should not hit a ship but recive undefined.", () => {
  const board = gameBoard();

  const longShip = ship(5);
  const coords = ["A1", "A2", "A3", "A4", "A5"];

  board.placeShip(longShip, coords);

  expect(board.checkCoords("B1")).toBe(undefined);
});

test("Check empty coords should not hit a ship but recive undefined.", () => {
  const board = gameBoard();

  //Place ship
  const longShip = ship(5);
  const coords = ["A1", "A2", "A3", "A4", "A5"];

  board.placeShip(longShip, coords);

  //Attack ship
  expect(board.attack("A1")).toBe("hit!");

  //Check ship health
  expect(longShip.getHealth()).toBe(4);
});
