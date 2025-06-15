const customAlertDOM = require("./customAlertDOM");
const ship = require("./objects/ship");

const boardBuilder = (player) => {
  const showDialog = (onDoneAction = () => {}) => {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("modal");
    const boardAndShips = document.createElement("div");
    boardAndShips.classList.add("container");
    const ships = showShipOptions();

    boardAndShips.appendChild(createBoard());
    boardAndShips.appendChild(ships);

    parentDiv.appendChild(boardAndShips);

    const doneButton = document.createElement("button");
    doneButton.textContent = "Ready";
    doneButton.classList.add("ready_btn");
    doneButton.addEventListener("click", () => {
      if (player.name === "" || player.name === undefined) {
        customAlertDOM("Please enter your credentials (aka name) commander!");
        return;
      }

      const shipsLeftInOptions =
        document.querySelector(".ship_options").childElementCount;
      if (shipsLeftInOptions === 0) {
        parentDiv.remove();
        onDoneAction();
      } else {
        customAlertDOM(
          `You still have ${shipsLeftInOptions} more ship(s) to place Commander ${player.name}!`
        );
      }
    });
    parentDiv.appendChild(doneButton);
    document.body.appendChild(parentDiv);
  };
  const createBoard = () => {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("vertical_container");

    const playerName = document.createElement("input");
    playerName.placeholder = `Enter your name here!`;
    playerName.addEventListener("input", (e) => {
      if (e.target.value !== "") {
        player.name = e.target.value;
        e.target.style.borderStyle = "none";
      } else {
        e.target.style.borderStyle = "dashed";
      }
    });

    parentDiv.appendChild(playerName);

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
        button.classList.add("blue_btn");

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
    const shipSizes = [5, 4];

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
        button.classList.add("ship");
        shipContainer.appendChild(button);
      }
      shipsParent.appendChild(shipContainer);
    }

    parentDiv.appendChild(shipsParent);
    return parentDiv;
  };

  const dragstartHandler = (event) => {
    event.dataTransfer.setData("ship-id", event.target.id);
    const shipContainer = document.getElementById(
      event.dataTransfer.getData("ship-id")
    );
  };
  const dragoverHandler = (event) => {
    event.preventDefault();
  };

  const dropHandler = (event) => {
    event.preventDefault();
    const shipContainer = document.getElementById(
      event.dataTransfer.getData("ship-id")
    );

    const coords = event.target.id;

    placeshipOnBoard(shipContainer, coords);
  };

  const removeShipFromBoard = (coords) => {
    for (let i in coords) {
      const coordinate = coords[i];
      const button = document.getElementById(coordinate);
      button.classList.remove("ship");
      button.style.background = "rgb(0, 191, 255)";
    }
    player.gameBoard.removeCoords(coords);
  };

  const placeshipOnBoard = (shipContainer, coords) => {
    const size = shipContainer.getAttribute("size");
    const isVertical = shipContainer.classList.contains("rotate");
    const shipCoords = isVertical
      ? placeVertical(size, coords)
      : placeHorizontal(size, coords);

    if (
      shipCoords &&
      player.gameBoard.placeShip(ship(size), shipCoords) === "Success!"
    ) {
      colorButtons(shipCoords);
      shipContainer.remove();
    }
  };

  const placeVertical = (size, coords) => {
    let start = coords.charCodeAt(0);

    let row;
    const column = coords.substring(1);

    const shipCoords = [];
    for (let i = start; i < start + Number(size); i++) {
      row = String.fromCharCode(i);
      const boardCoords = `${row}${column}`;
      shipCoords.push(boardCoords);
    }
    return shipCoords;
  };

  const placeHorizontal = (size, coords) => {
    const row = coords.charAt(0);
    const start = Number(coords.substring(1));
    const shipCoords = [];
    for (let i = start; i < start + Number(size); i++) {
      const boardCoords = `${row}${i}`;
      shipCoords.push(boardCoords);
    }
    return shipCoords;
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
