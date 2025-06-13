import domManager from "./domManager";
import player from "./objects/player";
import "./styles.css"

(()=> {
  const player1 = player("Smasnug");
  const dom = domManager(player1);
  dom.createBoard();
})();