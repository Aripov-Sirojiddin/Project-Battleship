const gameBoard = require("./gameBoard");

const player = (name) => {
  const board = gameBoard();
  return { name, board };
};

module.exports = player;
