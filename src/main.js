import boardBuilder from "./boardBuilderDOM";
import domManager from "./gameDOM";
import player from "./objects/player";
import ship from "./objects/ship";
import "./styles.css";

(() => {
  const body = document.body;

  const player1 = player("Sam");
  const newBoard = boardBuilder(player1);

  body.appendChild(newBoard.showDialog());

  
})();
