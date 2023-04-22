const state = {
  path: "home",
  products: getProducts(),
  cart: [],
};

const linkList = document.querySelectorAll(".nav ul li a");
const root = document.querySelector("#root");

navigate();
linksHandler();

function linksHandler() {
  linkList.forEach(function (el) {
    el.onclick = function (e) {
      e.preventDefault();
      state.path = e.target.getAttribute("href");
      navigate();
    };
  });
}

function setActive() {
  linkList.forEach(function (el) {
    if (el.getAttribute("href") === state.path) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

function navigate() {
  root.innerHTML = "";
  switch (state.path) {
    case "home":
      state.products.forEach(function (p) {
        root.append(card(p));
      });
      root.className = "products";
      break;
    case "cart":
      root.append(cart());
      root.append(totalView());
      root.className = "cart";
      break;
  }
  setActive();
}

function card(product) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.url}" alt="">
            <h3>$${product.price}</h3>
            <button>Add to cart</button>
    `;

  div.onclick = function (e) {
    if (e.target.localName === "button") {
      let tmp = state.cart.find(function (p) {
        return p.id === product.id;
      });
      if (tmp) {
        tmp.count++;
      } else {
        state.cart.push({
          id: product.id,
          title: product.name,
          price: product.price,
          count: 1,
        });
      }
    }
  };
  return div;
}

function cart() {
  const table = document.createElement("table");
  table.innerHTML = `
            thead>
            <th class="title">title</th>
            <th class="price">price</th>
            <th class="count">count</th>
            <th class="total">total</th>
            </thead>
            <tbody>
            ${state.cart
              .map(function (item) {
                return cartRow(item);
              })
              .join("")}
            </tbody>
    `;
  return table;
}

function cartRow(item) {
  return `
            <tr>
                <td>${item.title}</td>
                <td>$${item.price}</td>
                <td>${item.count}</td>
                <td>$${item.price * item.count}</td>
            </tr>
    `;
}

function totalView() {
  const div = document.createElement("div");
  div.className = "totalPrice";
  div.innerHTML = `Total: $${getTotal()}`;
  return div;
}

function getTotal() {
  let total = 0;
  for (let item of state.cart) {
    total += item.price * item.count;
  }
  return total;
}

function getProducts() {
  return [
    {
      id: 123,
      name: "Ericsson T20",
      url: "./img/ericsson-t20s-1000x1000.jpg",
      price: 70,
    },
    {
      id: 124,
      name: "Ericsson T65",
      url: "./img/ericsson-t65-1000x1000.jpg",
      price: 300,
    },
    {
      id: 125,
      name: "Nokia 5210",
      url: "./img/nokia-5210-1000x1000.jpg",
      price: 100,
    },
    {
      id: 126,
      name: "Nokia 6300",
      url: "./img/nokia-6300-1000x1000.jpg",
      price: 110,
    },
    {
      id: 127,
      name: "Nokia 6310i",
      url: "./img/nokia-6310i-1000x1000.jpg",
      price: 110,
    },
    {
      id: 128,
      name: "Nokia E5",
      url: "./img/nokia-e5-1000x1000.jpg",
      price: 100,
    },
    {
      id: 129,
      name: "Nokia E63",
      url: "./img/nokia-e63-1000x1000.jpg",
      price: 300,
    },
    {
      id: 130,
      name: "Siemens A50",
      url: "./img/siemens-a50-1000x1000.jpg",
      price: 80,
    },
  ];
}
