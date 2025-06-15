const customAlertDOM = require("./customAlertDOM");

const gameDOM = (player, opponent, restartFunction) => {
  let player1Turn = true;
  let madeMove = false;
  const switchView = () => {
    if (player1Turn) {
      customAlertDOM(`Switching view! Are ye Commander ${player.name}?`, () => {
        createPlayerView(player, opponent);
      });
    } else {
      customAlertDOM(
        `Switching view! Are ye Commander ${opponent.name}?`,
        () => {
          createPlayerView(opponent, player);
        }
      );
    }
  };

  const createPlayerView = (player1 = player, player2 = opponent) => {
    const boards = document.createElement("div");
    boards.classList.add("container");
    boards.id = "boards";
    const playerBoard = createBoard(player1, true);
    playerBoard.id = "player";
    const opponentBoard = createBoard(player2, false);
    opponentBoard.id = "opponent";

    boards.appendChild(playerBoard);
    boards.appendChild(opponentBoard);

    const button = document.createElement("button");
    button.textContent = `End turn Commander ${player1.name}?`;
    button.classList.add("ready_btn");
    madeMove = false;
    button.addEventListener("click", () => {
      if (madeMove) {
        boards.remove();
        switchView();
      } else {
        customAlertDOM(
          `Commander ${player1.name}! We have not striked the enemy yet! No time to retreat!`
        );
      }
    });

    document.getElementById("main").replaceChildren(boards, button);
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
        const coordinates = `${label}${i + 1}`;
        button.id = coordinates;
        button.classList.add("blue_btn");
        if (
          showShips &&
          board[coordinates] !== undefined &&
          board[coordinates] !== "taken"
        ) {
          button.style.background = "rgb(0, 163, 22)";
        }
        if (showShips) {
          if (playerMoves[player.name][coordinates] !== undefined) {
            updateButtonFromMemory(
              button,
              playerMoves[player.name][coordinates]
            );
          }
          button.disabled = true;
        } else {
          if (playerMoves[player.name][coordinates] !== undefined) {
            updateButtonFromMemory(
              button,
              playerMoves[player.name][coordinates]
            );
          }
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
    madeMove = true;
    const opponentBoard = document.querySelector("#opponent");
    updateButton(opponentBoard, coord);
    player1Turn = !player1Turn;
    opponentBoard.style.zIndex = "-10";

    const currOpponent = player1Turn ? player : opponent;
    const currPlayer = player1Turn ? opponent : player;

    console.log(currOpponent);
    if (currOpponent.gameBoard.isFleetDestroyed()) {
      customAlertDOM(
        "An honorable battle commander!",
        () => {
          document.getElementById("boards").remove();
          restartFunction();
        },
        `Commander ${currPlayer.name} wins the duel!`,
        "Restart?"
      );
    }
  };

  const receiveAttack = (coord) => {
    if (!player1Turn) {
      const playerBoard = document.querySelector("#player");
      updateButton(player, playerBoard, coord);
      player1Turn = !player1Turn;
    }
  };
  const playerMoves = {
    [player.name]: {},
    [opponent.name]: {},
  };
  const updateButton = (boardDiv, coord) => {
    const currPlayer = player1Turn ? opponent : player;
    const button = boardDiv.querySelector(`#${coord}`);
    switch (currPlayer.gameBoard.receiveAttack(coord)) {
      case "destroyed!!!":
        button.textContent = "⦿";
        const destroyedShipCoords =
          currPlayer.gameBoard.board[coord].getAllCoords();
        for (let i in destroyedShipCoords) {
          const coords = destroyedShipCoords[i];
          playerMoves[currPlayer.name][coords] = "destroyed!!!";
          const button = boardDiv.querySelector(`#${coords}`);
          button.style.background = "red";
          button.style.color = "rgb(249, 173, 173)";
        }
        break;
      case "hit!":
        playerMoves[currPlayer.name][coord] = "hit!";
        button.textContent = "⦿";
        break;
      case "miss...":
        playerMoves[currPlayer.name][coord] = "miss...";
        button.style.color = "grey";
        button.textContent = "×";
        break;
    }
    button.disabled = true;
  };

  const updateButtonFromMemory = (button, state) => {
    switch (state) {
      case "destroyed!!!":
        button.textContent = "⦿";
        button.style.background = "red";
        button.style.color = "rgb(249, 173, 173)";
        break;
      case "hit!":
        button.textContent = "⦿";
        break;
      case "miss...":
        button.style.color = "grey";
        button.textContent = "×";
        break;
    }
    button.disabled = true;
  };
  return {
    createPlayerView,
    receiveAttack,
  };
};

module.exports = gameDOM;
