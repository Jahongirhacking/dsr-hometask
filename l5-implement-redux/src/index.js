import { createDiv, createWrappedButton } from "./dom.js";
import { decrement, increment, store } from "./store.js";

const firstComponentRoot = document.getElementById("root1");
const secondComponentRoot = document.getElementById("root2");

function firstComponentRender(unsubscribe) {
  firstComponentRoot.appendChild(createDiv(store.getState()));
  firstComponentRoot.appendChild(createWrappedButton("increment", increment));
  firstComponentRoot.appendChild(createWrappedButton("decrement", decrement));
  firstComponentRoot.appendChild(
    createWrappedButton("unsubscribe", unsubscribe)
  );
}

function secondComponentRender(unsubscribe) {
  secondComponentRoot.appendChild(createDiv(store.getState()));
  secondComponentRoot.appendChild(
    createWrappedButton("unsubscribe", unsubscribe)
  );
}

const firstComponentUnsubscribe = store.subscribe(() => {
  document.querySelector("#root1").innerHTML = "";
  firstComponentRender(firstComponentUnsubscribe);
});
const secondComponentUnsubscribe = store.subscribe(() => {
  document.querySelector("#root2").innerHTML = "";
  secondComponentRender(secondComponentUnsubscribe);
});

firstComponentRender(firstComponentUnsubscribe);
secondComponentRender(secondComponentUnsubscribe);
