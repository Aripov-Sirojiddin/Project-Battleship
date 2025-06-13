const gameBoard = () => {
  const board = {};
  const fleetOfShips = [];

  const placeShip = (ship, coordinates) => {
    fleetOfShips.push(ship);
    coordinates.forEach((coordinate) => {
      board[coordinate] = ship;
    });
  };

  const checkCoords = (coordinate) => board[coordinate];

  const attack = (coordinate) => {
    const slotAtCoords = checkCoords(coordinate);
    if (slotAtCoords != undefined) {
      const health = slotAtCoords.hit();
      return health === 0 ? "destroyed!!!" : "hit!";
    } else {
      return "miss...";
    }
  };

  const isFleetDestroyed = () => {
    for(const i in fleetOfShips) {
      const ship = fleetOfShips[i];
      
      if(ship.getHealth() > 0) {
        return false;
      }
    }
    //All ships have health == 0;
    return true;
  };

  return {
    placeShip,
    checkCoords,
    attack,
    isFleetDestroyed,
  };
};

module.exports = gameBoard;
