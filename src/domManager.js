const domManager = (player, opponent) => {
  const createBoard = (board, showShips) => {
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
        if (showShips && board[button.id] !== undefined) {
          button.style.background = "black";
        }
        button.addEventListener("click", () => {});
        boardDiv.appendChild(button);
      }
    }
    parentDiv.appendChild(boardDiv);
    return parentDiv;
  };

  const onSquareClick = () => {
    console.log("");
  };

  return {
    createBoard,
  };
};

module.exports = domManager;
