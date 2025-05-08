export function createWrappedButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);

  return createDivWithChild(button);
}

function createDivWithChild(child) {
  const div = createDiv();
  div.appendChild(child);
  return div;
}

export function createDiv(text) {
  const div = document.createElement("div");
  if (text !== undefined) {
    div.textContent = text;
  }

  return div;
}
