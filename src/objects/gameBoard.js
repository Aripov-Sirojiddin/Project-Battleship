const gameBoard = () => {
  const board = {};
  const fleetOfShips = [];

  const placeShip = (ship, coordinates) => {
    fleetOfShips.push(ship);

    for (const i in coordinates) {
      const coordinate = coordinates[i];
      if (board[coordinate] === undefined) {
        board[coordinate] = ship;
        ship.updateCoords(coordinate);
      } else {
        return "Can't place ship here.";
      }
    }
    markSurroundings(coordinates);
    return "Success!";
  };
  const markSurroundings = (coordinates) => {
    for (let i in coordinates) {
      markSurroundingsForOne(coordinates[i]);
    }
  };

  const markSurroundingsForOne = (coordinate) => {
    const row = Number(coordinate.charCodeAt(0));
    const column = Number(coordinate.substring(1));

    const surroundings = [
      //Top
      `${String.fromCharCode(row - 1)}${column - 1}`,
      `${String.fromCharCode(row - 1)}${column}`,
      `${String.fromCharCode(row - 1)}${column + 1}`,

      //Sides
      `${String.fromCharCode(row)}${column - 1}`,
      `${String.fromCharCode(row)}${column + 1}`,

      //Bottom
      `${String.fromCharCode(row + 1)}${column - 1}`,
      `${String.fromCharCode(row + 1)}${column}`,
      `${String.fromCharCode(row + 1)}${column + 1}`,
    ];

    surroundings.forEach((coords) => {
      if (board[coords] === undefined) {
        board[coords] = "taken";
      }
    });
  };

  const checkCoords = (coordinate) => board[coordinate];

  const receiveAttack = (coordinate) => {
    const slotAtCoords = checkCoords(coordinate);
    if (typeof slotAtCoords === "object") {
      const health = slotAtCoords.hit();
      return health === 0 ? "destroyed!!!" : "hit!";
    } else {
      return "miss...";
    }
  };

  const isFleetDestroyed = () => {
    for (const i in fleetOfShips) {
      const ship = fleetOfShips[i];

      if (ship.getHealth() > 0) {
        return false;
      }
    }
    //All ships have health == 0;
    return true;
  };

  return {
    board,
    placeShip,
    checkCoords,
    receiveAttack,
    isFleetDestroyed,
  };
};

module.exports = gameBoard;
