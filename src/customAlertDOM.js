const customAlertDOM = (msg, action = () => {}, titleMsg="Incoming transmission!",) => {
  const parentDiv = document.createElement("div");
  parentDiv.classList.add("modal");

  const title = document.createElement("h1");
  title.textContent = titleMsg;

  const message = document.createElement("p");
  message.classList.add("message");
  message.textContent = msg;

  const doneButton = document.createElement("button");
  doneButton.textContent = "Aye captain!";
  doneButton.classList.add("ready_btn");

  doneButton.addEventListener("click", () => {
    parentDiv.remove();
    action();
  });

  parentDiv.appendChild(title);
  parentDiv.appendChild(message);
  parentDiv.appendChild(doneButton);
  document.body.appendChild(parentDiv);
};

module.exports = customAlertDOM;
