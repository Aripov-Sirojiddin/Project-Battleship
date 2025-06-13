const player = require("../player");

test("The board's of individual players should not be the same.", () => {
  const player1 = player("1");
  const player2 = player("2");

  expect(player1.gameBoard !== player2.gameBoard).toBe(true);
});
