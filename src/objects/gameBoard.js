const gameBoard = () => {
  const board = {};
  const fleetOfShips = [];

  const placeShip = (ship, coordinates) => {
    fleetOfShips.push(ship);
    for(const i in coordinates) {
      const coordinate = coordinates[i];
      
      if(board[coordinate] === undefined) {
        board[coordinate] = ship;
      }else{ 
        return "Can't place ship here."
      }
    };
  };

  const checkCoords = (coordinate) => board[coordinate];

  const receiveAttack = (coordinate) => {
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
    board,
    placeShip,
    checkCoords,
    receiveAttack,
    isFleetDestroyed,
  };
};

module.exports = gameBoard;
