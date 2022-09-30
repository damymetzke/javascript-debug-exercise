const messages = [];

function displayMessages() {
  const chatContent = document.getElementById("chat-content");
  chatContent.innerHTML = "";

  for (const { name, message, background, foreground } of messages) {
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

const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", _ => socket.send(JSON.stringify({ value: "Hello World!" })));
socket.addEventListener("message", event => {
  messages.push(JSON.parse(event.data));
  displayMessages();
})

const name = document.getElementById("name");
const nameInput = document.getElementById("name-input");

name.addEventListener("submit", () => {
  const userName = nameInput.value;
  name.classList.add("hidden");

  const chat = document.getElementById("chat");
  const chatInput = document.getElementById("chat-input");

  chat.classList.remove("hidden");

  chat.addEventListener("submit", () => {
    const payload = {
      name: userName,
      message: chatInput.value,
    };

    fetch("/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    })

    chatInput.value = "";
  })
})

