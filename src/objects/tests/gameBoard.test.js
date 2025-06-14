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

  expect(board.checkCoords("B1")).toBe("taken");
  expect(board.checkCoords("C1")).toBe(undefined);
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

  expect(board.placeShip(longShip, coords)).toBe("Success!");
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
  expect(board.placeShip(mediumShip, coordsMedium)).toBe("Success!");

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

test("Should mark surroundings as unusable space.", () => {
  const board = gameBoard();

  const mediumShip = ship(1);
  const coordsMedium = ["B2"];

  board.placeShip(mediumShip, coordsMedium);
  //top
  expect(board.checkCoords("A1")).toBe("taken");
  expect(board.checkCoords("A2")).toBe("taken");
  expect(board.checkCoords("A3")).toBe("taken");

  //sides
  expect(board.checkCoords("B1")).toBe("taken");
  expect(board.checkCoords("B3")).toBe("taken");

  //bottom
  expect(board.checkCoords("C1")).toBe("taken");
  expect(board.checkCoords("C2")).toBe("taken");
  expect(board.checkCoords("C3")).toBe("taken");
});

test("Should mark surroundings as unusable space but it shouldn't erase the ship.", () => {
  const board = gameBoard();

  const mediumShip = ship(3);
  const coordsMedium = ["B2", "B3", "B4"];

  board.placeShip(mediumShip, coordsMedium);
  //top
  expect(board.checkCoords("A1")).toBe("taken");
  expect(board.checkCoords("A2")).toBe("taken");
  expect(board.checkCoords("A3")).toBe("taken");
  expect(board.checkCoords("A4")).toBe("taken");
  expect(board.checkCoords("A5")).toBe("taken");

  //sides
  expect(board.checkCoords("B1")).toBe("taken");
  expect(board.checkCoords("B5")).toBe("taken");

  //bottom
  expect(board.checkCoords("C1")).toBe("taken");
  expect(board.checkCoords("C2")).toBe("taken");
  expect(board.checkCoords("C3")).toBe("taken");
  expect(board.checkCoords("C4")).toBe("taken");
  expect(board.checkCoords("C5")).toBe("taken");

  //Check the ship
  expect(board.checkCoords("B2")).toBe(mediumShip);
  expect(board.checkCoords("B3")).toBe(mediumShip);
  expect(board.checkCoords("B4")).toBe(mediumShip);
});

test("Should not place a ship in a taken slot.", () => {
  const board = gameBoard();

  const mediumShip = ship(3);
  const coordsMedium = ["B2", "B3", "B4"];

  board.placeShip(mediumShip, coordsMedium);
  //top
  expect(board.checkCoords("A1")).toBe("taken");
  expect(board.checkCoords("A2")).toBe("taken");
  expect(board.checkCoords("A3")).toBe("taken");
  expect(board.checkCoords("A4")).toBe("taken");
  expect(board.checkCoords("A5")).toBe("taken");

  //sides
  expect(board.checkCoords("B1")).toBe("taken");
  expect(board.checkCoords("B5")).toBe("taken");

  //bottom
  expect(board.checkCoords("C1")).toBe("taken");
  expect(board.checkCoords("C2")).toBe("taken");
  expect(board.checkCoords("C3")).toBe("taken");
  expect(board.checkCoords("C4")).toBe("taken");
  expect(board.checkCoords("C5")).toBe("taken");

  //Check the ship
  expect(board.checkCoords("B2")).toBe(mediumShip);
  expect(board.checkCoords("B3")).toBe(mediumShip);
  expect(board.checkCoords("B4")).toBe(mediumShip);

  const newShip = ship(1);
  const newCoords = ["C1"]; //Is a coord that should be labeled "taken"
  expect(board.placeShip(newShip, newCoords)).toBe("Can't place ship here.");
  expect(board.checkCoords("C1")).toBe("taken");
});

test("Should mark surroundings as unusable space.", () => {
  const board = gameBoard();

  const mediumShip = ship(1);
  const coordsMedium = ["D10"];

  board.placeShip(mediumShip, coordsMedium);
  //top
  expect(board.checkCoords("C9")).toBe("taken");
  expect(board.checkCoords("C10")).toBe("taken");
  expect(board.checkCoords("C11")).toBe("taken");

  //sides
  expect(board.checkCoords("D9")).toBe("taken");
  expect(board.checkCoords("D11")).toBe("taken");

  //bottom
  expect(board.checkCoords("E9")).toBe("taken");
  expect(board.checkCoords("E10")).toBe("taken");
  expect(board.checkCoords("E11")).toBe("taken");
});

test("Check coords to be within bounds of the board. Should be true.", () => {
  const board = gameBoard();

  const coords = ["A1", "A2", "A3", "A4", "A5"];

  expect(board.coordsWithinBounds(coords)).toBe(true);
});

test("Check coords to be within bounds of the board. Should be true.", () => {
  const board = gameBoard();

  const coords = ["A8", "A9", "A10", "A11", "A12"];

  expect(board.coordsWithinBounds(coords)).toBe(false);
});
test("Check coords to be within bounds of the board. Should be true.", () => {
  const board = gameBoard();

  const coords = ["H10", "I10", "J10", "K10", "L10"];

  expect(board.coordsWithinBounds(coords)).toBe(false);
});