const elements = new Map(
  ["inputConfirm", "list", "input"]
    .map(
      id => [id, document.getElementById(id)]
    )
);

const items = [];

function renderList() {
  const list = elements.get("list");
  list.innerHTML = "";

  for (const [i, {text, complete}] of items.entries()) {
    list.innerHTML += `
<div class="list-item${complete ? "complete" : ""}">
  <div class="item-title">
    ${text}
  </div>
  <div class="item-complete">
      <button onclick="complete(i, complete)" class="item-complete-submit">
        ${complete ? "uncomplete" : "complete"}
      </button>
  </div>
</div>
`;
  }

  elements["length"].innerHTML = items.length;
}

function complete(i, current) {
  items[i].complete = !current;
  renderList();
}


elements.get("inputConfirm").addEventListener("click", () => {
  const text = elements.get("input").value;
  items.push({text, complete: false});
  renderList();
});


