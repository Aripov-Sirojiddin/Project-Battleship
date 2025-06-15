
const gameDOM = (player, opponent) => {
  let player1Turn = true;

  const switchView = () => {
    if(player1Turn) {
      createPlayerView(player, opponent);
    } else {
      createPlayerView(opponent, player);
    }
  }

  const createPlayerView = (player1 = player, player2 = opponent) => {
    const playerBoard = createBoard(player1, true);
    playerBoard.id = "player";
    const opponentBoard = createBoard(player2, false);
    opponentBoard.id = "opponent";
    const newChildren = [playerBoard, opponentBoard];

    document.getElementById("boards").replaceChildren(...newChildren);
  };

  const createBoard = (player, showShips) => {
    const board = player.gameBoard.board;
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
        button.classList.add("blue_btn");
        if (showShips && board[button.id] !== undefined && board[button.id] !== "taken") {
          button.style.background = "rgb(0, 163, 22)";
        }
        if (showShips) {
          button.disabled = true;
        } else {
          button.classList.add("clickable");
          button.addEventListener("click", () => sendAttack(button.id));
        }
        boardDiv.appendChild(button);
      }
    }
    parentDiv.appendChild(boardDiv);
    return parentDiv;
  };

  const sendAttack = (coord) => {
    if (player1Turn) {
      const opponentBoard = document.querySelector("#opponent");
      updateButton(opponent, opponentBoard, coord);
      player1Turn = !player1Turn;
    }
  };

  const receiveAttack = (coord) => {
    if (!player1Turn) {
      const playerBoard = document.querySelector("#player");
      updateButton(player, playerBoard, coord);
      player1Turn = !player1Turn;
    }
  };

  const updateButton = (player, boardDiv, coord) => {
    const button = boardDiv.querySelector(`#${coord}`);
    switch (player.gameBoard.receiveAttack(coord)) {
      case "destroyed!!!":
        button.textContent = "⦿";
        button.disabled = true;
        const destroyedShipCoords =
          player.gameBoard.board[coord].getAllCoords();
        for (let i in destroyedShipCoords) {
          const coords = destroyedShipCoords[i];
          const button = boardDiv.querySelector(`#${coords}`);
          button.style.background = "red";
          button.style.color = "rgb(249, 173, 173)";
        }
        break;
      case "hit!":
        button.textContent = "⦿";
        button.disabled = true;
        break;
      case "miss...":
        button.style.color = "grey";
        button.textContent = "×";
        button.disabled = true;
        break;
    }
  };
  return {
    createPlayerView,
    receiveAttack,
  };
};

module.exports = gameDOM;
