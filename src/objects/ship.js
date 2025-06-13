const ship = (ship_length) => {
  let health = ship_length;

  const getHealth = () => health;
  const hit = () => (isSunk() ? 0 : --health);
  const isSunk = () => health === 0;

  return {
    getHealth,
    isSunk,
    hit,
  };
};

module.exports = ship;
