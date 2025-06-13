const domManager = (player, opponent) => {
  const createBoard = (board, type) => {
    document.getElementById("player").textContent = `${player.name}`;

    const boardDiv = document.createElement("board");

    for (let i = 0; i < 11; i++) {
      const coordLabel = document.createElement("p");
      coordLabel.textContent = i === 0 ? "" : i;
      boardDiv.appendChild(coordLabel);
    }


    for (let i = 0; i < 10; i++) {
      const coordLabel = document.createElement("p");
      const label = String.fromCharCode(65 + i);
      coordLabel.textContent = label;
      boardDiv.append(coordLabel);

      for (let i = 0; i < 10; i++) {
        const button = document.createElement("button");
        button.id = `${label}${i+1}`
        button.addEventListener("click", () => {
          console.log(button.id)
        });
        boardDiv.appendChild(button);
      }
    }
  };

  const onSquareClick = () => {
    console.log("");
  };

  return {
    createBoard,
  };
};

module.exports = domManager;
