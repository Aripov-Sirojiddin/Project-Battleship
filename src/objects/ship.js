const ship = (ship_length) => {
  let health = ship_length;
  const shipCoords = [];

  const getHealth = () => health;
  const hit = () => (isSunk() ? 0 : --health);
  const isSunk = () => health === 0;

  const getAllCoords = () => shipCoords;
  const updateCoords = (coords) => {
    shipCoords.push(coords);
  };

  return {
    getHealth,
    isSunk,
    hit,
    getAllCoords,
    updateCoords,
  };
};

module.exports = ship;
