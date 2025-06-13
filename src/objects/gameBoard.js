const gameBoard = () => {
  const board = {};

  const placeShip = (ship, coordinates) => {
    for (coordinate in coordinates) {
      board[coordinate] = ship;
    }
  };

  const checkCoords = (coordinate) => board[coordinate];

  return {
    placeShip,
    checkCoords,
  };
};

module.exports = gameBoard;
