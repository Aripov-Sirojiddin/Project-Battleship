const gameBoard = require("../gameBoard");
const ship = require("../ship");

test('Should place "Long ship" to correct coordinates.', () => {
  const board = gameBoard();

  const longShip = ship(5);
  const coords = ["A1", "A2", "A3", "A4", "A5"];

  board.placeShip(longShip, coords);

  for (let coordinate in coords) {
    expect(board.checkCoords(coordinate)).toBe(longShip);
  }
});
