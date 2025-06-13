const ship = require("../ship");

test("Should decrease health to 3 on hit() call", () => {
  const longShip = ship(5);
  longShip.hit();
  expect(longShip.getHealth()).toBe(4);
});

test("Should decrease health to 0 on hit() call 5 times", () => {
  const longShip = ship(5);
  const timesHit = 5;
  for (let i = 0; i < timesHit; i++) {
    longShip.hit();
  }
  expect(longShip.getHealth()).toBe(0);
});

test("Should decrease health down to 0 and stays at 0 on hit() call 10 times", () => {
  const longShip = ship(5);
  const timesHit = 10;
  for (let i = 0; i < timesHit; i++) {
    longShip.hit();
  }
  expect(longShip.getHealth()).toBe(0);
});

test("Should decrease health down to 0 and stays at 0 on hit() call 10 times", () => {
  const longShip = ship(5);
  for (let i = 0; i < 5; i++) {
    longShip.updateCoords(`A${i+1}`);
  }
  expect(longShip.getAllCoords()).toEqual(["A1", "A2", "A3", "A4", "A5"]);
});
