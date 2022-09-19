const data = await (await fetch("./data.json")).text();

const elements = new Map(
  ["inputConfirm", "list", "input", "input-category"]
    .map(
      id => [id, document.getElementById(id)]
    )
);

const items = [];

function renderList() {
  const list = elements.get("list");
  list.innerHTML = "";

  for (const [i, {description, category, complete}] of items.entries()) {
    list.innerHTML += `
<div class="list-item${complete ? "complete" : ""}">
  <div class="item-category">
    <div>
      ${category}
    </div>
  </div>
  <div class="item-title">
    ${description}
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

elements.get("input-category").innerHTML = data
  .categories
  .map((category, i) => `
<option value="${i}">
${category}
</option>
`)
  .join();

elements.get("inputConfirm").addEventListener("click", () => {
  const description = elements.get("input").value;
  const category = elements.get("input-category").value;
  items.push({description, category, complete: false});
  renderList();
});

