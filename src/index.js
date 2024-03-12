let addToy = false;

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
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p class="likes">${toy.likes} Likes</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>
        `;
        card.querySelector("button").addEventListener("click", (e) => {
          let id = e.target.id;
          toy.likes++;
          card.querySelector("p").textContent = `${toy.likes} Likes !`;
          fetch(`http://localhost:3000/toys/${id}`, {
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
