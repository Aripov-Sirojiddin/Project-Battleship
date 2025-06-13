const gameBoard = () => {
  const board = {};

  const placeShip = (ship, coordinates) => {
    coordinates.forEach((coordinate) => {
      board[coordinate] = ship;
    });
  };

  const checkCoords = (coordinate) => board[coordinate];

  const attack = (coordinate) => {
    const slotAtCoords = checkCoords(coordinate);
    if (slotAtCoords != undefined) {
      slotAtCoords.hit();
      return "hit!";
    } else {
      return "miss...";
    }
  };

  return {
    placeShip,
    checkCoords,
    attack,
  };
};

module.exports = gameBoard;
