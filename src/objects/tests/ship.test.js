const ship = require("../ship");

test("Should decrease health to 3 on hit() call", () => {
  const longShip = ship(4);
  longShip.hit();
  expect(longShip.getHealth()).toBe(3);
});

test("Should decrease health to 0 on hit() call 4 times", () => {
  const longShip = ship(4);
  const timesHit = 4;
  for (let i = 0; i < timesHit; i++) {
    longShip.hit();
  }
  expect(longShip.getHealth()).toBe(0);
});

test("Should decrease health down to 0 and stays at 0 on hit() call 10 times", () => {
  const longShip = ship(4);
  const timesHit = 10;
  for (let i = 0; i < timesHit; i++) {
    longShip.hit()
  }
  expect(longShip.getHealth()).toBe(0);
});
