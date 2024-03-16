let addToy = false;
let toyid;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  // ======================================================

  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((toyData) => {
      toyData.forEach((toy) => {
        toyid = toy.id;
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p class="likes">${toy.likes} Likes</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>
        <button class="dltBtn">x</button>
        `;
        card.querySelector(".dltBtn").addEventListener("click", () => {
          handleDelete(toyid);
          card.remove();
        });
        card.querySelector("button").addEventListener("click", (e) => {
          toy.likes++;
          card.querySelector(".likes").textContent = `${toy.likes} Likes !`;
          fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(toy),
          });
        });

        document.querySelector("#toy-collection").appendChild(card);
      });
    });
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    }),
  });
});

function handleDelete() {
  fetch(`http://localhost:3000/toys/${toyid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
