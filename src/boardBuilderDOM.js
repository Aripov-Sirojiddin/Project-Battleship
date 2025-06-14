const ship = require("./objects/ship");

const boardBuilder = (player) => {
  const showDialog = () => {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("modal");

    const ships = showShipOptions();

    parentDiv.appendChild(createBoard());
    parentDiv.appendChild(ships);
    return parentDiv;
  };
  const createBoard = () => {
    const parentDiv = document.createElement("div");

    const playerLabel = document.createElement("h1");
    playerLabel.textContent = `${player.name}`;
    parentDiv.appendChild(playerLabel);

    const boardDiv = document.createElement("board");
    boardDiv.classList.add("board");

    for (let i = 0; i < 11; i++) {
      const coordLabel = document.createElement("p");
      coordLabel.textContent = i === 0 ? "" : i;
      boardDiv.appendChild(coordLabel);
    }

    for (let i = 0; i < 10; i++) {
      const coordLabel = document.createElement("p");
      coordLabel.style.marginInlineEnd = "1.5rem";
      const label = String.fromCharCode(65 + i);
      coordLabel.textContent = label;
      boardDiv.append(coordLabel);

      for (let i = 0; i < 10; i++) {
        const button = document.createElement("button");
        button.id = `${label}${i + 1}`;
        button.classList.add("clickable");
        boardDiv.appendChild(button);
      }
    }
    parentDiv.appendChild(boardDiv);
    return parentDiv;
  };

  const showShipOptions = () => {
    const parentDiv = document.createElement("div");

    const label = document.createElement("h1");
    label.textContent = "The Fleet!";
    parentDiv.appendChild(label);

    const shipSizes = [5, 4, 3, 3, 2, 2, 1, 1, 1, 1];

    shipSizes.forEach((size) => {
      const shipContainer = document.createElement("div");
      shipContainer.classList.add("ship_container");
      const split = document.createElement("hr");
      for (let i = 0; i < size; i++) {
        const button = document.createElement("button");
        shipContainer.appendChild(button);
      }
      parentDiv.appendChild(split)
      parentDiv.appendChild(shipContainer);
    });
    return parentDiv;
  };

  return {
    showDialog,
  };
};

module.exports = boardBuilder;
