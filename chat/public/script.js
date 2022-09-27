const fakeMessages = [
  {
    name: "One",
    message: "This is a chat message",
    background: "#40dd64",
    foreground: "#000",
  },
  {
    name: "Two",
    message: "This is another chat message",
    background: "#604512",
    foreground: "#fff",
  },
];

function displayMessages() {
  const chatContent = document.getElementById("chat-content");

  for (const { name, message, background, foreground } of fakeMessages) {
    const messageName = document.createElement("div");
    const messageContent = document.createElement("div");

    messageName.style.backgroundColor = background;
    messageName.style.color = foreground;
    messageName.classList.add("message-name");
    messageContent.classList.add("message");

    messageName.innerText = name;
    messageContent.innerText = message;

    const item = document.createElement("li");
    item.appendChild(messageName);
    item.appendChild(messageContent);

    chatContent.appendChild(item);
  }
}

displayMessages();
