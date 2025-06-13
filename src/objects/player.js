const gameBoard = require("./gameBoard");

const player = (name) => {
  return { name, gameBoard: gameBoard() };
};

module.exports = player;
