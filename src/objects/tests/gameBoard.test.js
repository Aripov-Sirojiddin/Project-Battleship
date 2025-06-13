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

test("Attack the ship at the coords and recive hit msg.", () => {
  const board = gameBoard();

  //Place ship
  const longShip = ship(5);
  const coords = ["A1", "A2", "A3", "A4", "A5"];

  board.placeShip(longShip, coords);

  //Attack ship
  expect(board.receiveAttack("A1")).toBe("hit!");

  //Check ship health
  expect(longShip.getHealth()).toBe(4);
});

test('Should report "destroyed!!!" after attack to "Single square boat".', () => {
  const board = gameBoard();

  const longShip = ship(1);
  const coords = ["A1"];

  board.placeShip(longShip, coords);
  //Make sure the ship is there
  expect(board.checkCoords("A1")).toBe(longShip);

  //Attack the ship and recive "destroyed!!!" msg
  expect(board.receiveAttack("A1")).toBe("destroyed!!!");
});

test('If we attack the same coords of "destroyed!!!" ship msg should not change.', () => {
  const board = gameBoard();

  const longShip = ship(1);
  const coords = ["A1"];

  board.placeShip(longShip, coords);
  //Make sure the ship is there
  expect(board.checkCoords("A1")).toBe(longShip);

  //Attack the ship and recive "destroyed!!!" msg
  expect(board.receiveAttack("A1")).toBe("destroyed!!!");
  expect(board.receiveAttack("A1")).toBe("destroyed!!!");
});

test("Check if all ships have been sunk should return true.", () => {
  const board = gameBoard();

  const smolShip = ship(1);
  const coords = ["A1"];

  board.placeShip(smolShip, coords);
  board.receiveAttack("A1");

  expect(board.isFleetDestroyed()).toBe(true);
});

test("Check if all ships have been sunk should return true.", () => {
  const board = gameBoard();

  const mediumShip = ship(4);
  const coordsMedium = ["A1", "A2", "A3", "A4"];

  const smolShip = ship(1);
  const coordsSmol = ["B1"];

  board.placeShip(mediumShip, coordsMedium);
  board.placeShip(smolShip, coordsSmol);

  board.receiveAttack("B1");

  expect(board.isFleetDestroyed()).toBe(false);
});


test("Place a ship in a coordinate that is already taken.", () => {
  const board = gameBoard();

  const mediumShip = ship(4);
  const coordsMedium = ["A1", "A2", "A3", "A4"];

  const smolShip = ship(1);
  const coordsSmol = ["A1"];

  //Place ship successfully
  board.placeShip(mediumShip, coordsMedium);

  //Place ship un-successfully
  expect(board.placeShip(smolShip, coordsSmol)).toBe("Can't place ship here.");

  //Ensure the original ship isn't overwriten.
  expect(board.checkCoords("A1")).toBe(mediumShip);
});

test("Place a ship in a coordinate that is already taken.", () => {
  const board = gameBoard();

  const mediumShip = ship(4);
  const coordsMedium = ["A1", "A2", "A3", "A4"];

  //Place ship successfully
  board.placeShip(mediumShip, coordsMedium);

  //Ensure the ship recieved all the coords
  expect(mediumShip.getAllCoords()).toEqual(coordsMedium);
});