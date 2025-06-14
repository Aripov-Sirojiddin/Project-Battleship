const gameBoard = () => {
  const board = {};
  const fleetOfShips = [];

  const placeShip = (ship, coordinates) => {
    fleetOfShips.push(ship);

    for (const i in coordinates) {
      const coordinate = coordinates[i];
      if (coordsWithinBounds(coordinates) && board[coordinate] === undefined) {
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
  const removeCoords = (coordinates) => {
    console.log(coordinates)
    for (let i in coordinates) {
      markSurroundingsForOne(coordinates[i], true);
      delete board[coordinates[i]];
    }
  };
  const coordsWithinBounds = (coordinates) => {
    for (let i in coordinates) {
      const coordinate = coordinates[i];
      const row = Number(coordinate.charCodeAt(0));
      const column = Number(coordinate.substring(1));

      if (row > 74 || row < 65 || column > 10 || column < 1) {
        return false;
      }
    }
    return true;
  };

  const markSurroundingsForOne = (coordinate, unmark = false) => {
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
      if (unmark == false && board[coords] === undefined) {
        board[coords] = "taken";
      } else {
        delete board[coords];
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
    removeCoords,
    placeShip,
    coordsWithinBounds,
    checkCoords,
    receiveAttack,
    isFleetDestroyed,
  };
};

module.exports = gameBoard;
