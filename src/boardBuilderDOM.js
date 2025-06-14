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

        button.addEventListener("drop", (e) => dropHandler(e));
        button.addEventListener("dragover", (e) => dragoverHandler(e));

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

    const shipsParent = document.createElement("div");
    shipsParent.classList.add("ship_options");
    const shipSizes = [5, 4, 3, 2, 2, 1, 1, 1, 1];

    for (let i in shipSizes) {
      const size = shipSizes[i];

      const shipContainer = document.createElement("div");
      shipContainer.classList.add("ship_container");
      shipContainer.setAttribute("size", size);
      shipContainer.id = `ship-${i}`;
      shipContainer.draggable = true;

      shipContainer.addEventListener("dragstart", (e) => dragstartHandler(e));
      shipContainer.addEventListener("click", () => {
        if (shipContainer.classList.contains("rotate")) {
          shipContainer.classList.remove("rotate");
        } else {
          shipContainer.classList.add("rotate");
        }
      });

      for (let i = 0; i < size; i++) {
        const button = document.createElement("button");
        shipContainer.appendChild(button);
      }
      shipsParent.appendChild(shipContainer);
    }

    parentDiv.appendChild(shipsParent);
    return parentDiv;
  };

  const dragstartHandler = (event) => {
    event.dataTransfer.setData("ship-id", event.target.id);
  };
  const dragoverHandler = (event) => {
    event.preventDefault();
  };

  const dropHandler = (event) => {
    event.preventDefault();
    const shipContainer = document.getElementById(
      event.dataTransfer.getData("ship-id")
    );
    const size = shipContainer.getAttribute("size");
    const isVertical = shipContainer.classList.contains("rotate");
    const coords = event.target.id;

    placeshipOnBoard(size, isVertical, coords) ? shipContainer.remove() : undefined;
  };

  const placeshipOnBoard = (size, isVertical, coords) => {
    return isVertical
      ? placeVertical(size, coords)
      : placeHorizontal(size, coords);
  };
  const placeVertical = (size, coords) => {
    let start = coords.charCodeAt(0);

    let row;
    const column = coords.charAt(1);

    const shipCoords = [];
    for (let i = start; i < start + Number(size); i++) {
      row = String.fromCharCode(i);
      const boardCoords = `${row}${column}`;
      shipCoords.push(boardCoords);
    }
    if (player.gameBoard.placeShip(ship(size), shipCoords) === "Success!") {
      colorButtons(shipCoords);
      return true;
    }

    return false;
  };

  const placeHorizontal = (size, coords) => {
    const row = coords.charAt(0);
    const start = Number(coords.charAt(1));
    const shipCoords = [];
    for (let i = start; i < start + Number(size); i++) {
      const boardCoords = `${row}${i}`;
      shipCoords.push(boardCoords);
    }

    if (player.gameBoard.placeShip(ship(size), shipCoords) === "Success!") {
      colorButtons(shipCoords);
      return true;
    }
    return false;
  };

  const colorButtons = (coordinates) => {
    for (let i in coordinates) {
      const boardCoords = coordinates[i];
      const button = document.getElementById(boardCoords);
      button.classList.add("ship");
      button.style.background = "rgb(0, 163, 22)";
    }
  };
  return {
    showDialog,
  };
};

module.exports = boardBuilder;
