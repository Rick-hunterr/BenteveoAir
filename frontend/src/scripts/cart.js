const loadPackages = () => {
  const API_URL = "http://localhost:3000";

  const packagesRecord = document.getElementById("packages-record");
  const emptyCartBtn = document.getElementById("empty-cart");
  const buyCartBtn = document.getElementById("buy-cart");
  const history = document.getElementById("history");
  const productCounter = document.getElementById("product-counter");
  const totalEl = document.getElementById("total-price");

  const store = localStorage.getItem("packages");
  let packagesStore = JSON.parse(store);

  let counter = 0;
  let precio_total = 0;

  emptyCartBtn.addEventListener("click", () => {
    localStorage.removeItem("packages");
    packagesRecord.innerHTML = "";
    history.innerHTML = "";
    totalEl.textContent = 0;
    productCounter.textContent = 0;
  });

  buyCartBtn.addEventListener("click", () => {
    if (precio_total > 0) {
      alert(`Felicidades por su compra. El total es de ${precio_total}`);
      localStorage.removeItem("packages");

      packagesRecord.innerHTML = "";
      history.innerHTML = "";
      totalEl.textContent = 0;
      productCounter.textContent = 0;
      precio_total = 0;
    }
  });

  const createDeleteButton = () => {
    const button = document.createElement("button");
    button.classList.add("delete");
    button.innerText = "Eliminar";

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path>
        <path d="M9 10h2v8H9zM13 10h2v8h-2z"></path>
      </svg>;
    `;
    const temp = document.createElement("div");
    temp.innerHTML = svg.trim();
    button.prepend(temp.firstChild);

    return button;
  };

  const createTags = (tags) => {
    const container = document.createElement("div");
    container.classList.add("tags");

    tags.forEach((tagText) => {
      const tag = document.createElement("span");
      tag.classList.add("tag");
      tag.textContent = tagText;
      container.appendChild(tag);
    });

    return container;
  };

  const updateHistory = (name, price, btn, count, precioTotal) => {
    const li = document.createElement("li");
    li.textContent = `${name}: $${price}`;

    btn.addEventListener("click", () => {
      li.remove();
      return;
    });

    totalEl.textContent = precioTotal;
    productCounter.textContent = count;
    history.appendChild(li);
  };

  const createPackageCard = ({
    name,
    price,
    flightType,
    flightDuration,
    hotel,
  }) => {
    const packageCard = document.createElement("div");
    packageCard.id = "package";
    packageCard.classList.add("package");

    const info = document.createElement("div");
    info.classList.add("info");

    const tags = createTags([flightDuration, flightType, hotel]);

    const title = document.createElement("h2");
    title.classList.add("title");
    title.textContent = name;

    const priceEl = document.createElement("p");
    priceEl.classList.add("font-semibold");
    priceEl.textContent = `$${price} ARS`;

    info.append(tags, title, priceEl);

    const deleteBtn = createDeleteButton();

    counter++;
    precio_total += price;
    updateHistory(name, price, deleteBtn, counter, precio_total);

    deleteBtn.addEventListener("click", () => {
      const productCounter = document.getElementById("product-counter");
      const totalEl = document.getElementById("total-price");

      precio_total -= price;
      totalEl.textContent = precio_total;
      productCounter.textContent = --counter;
      packageCard.remove();

      const stored = localStorage.getItem("packages");
      if (!stored) return;

      const packages = JSON.parse(stored);

      const index = packages.findIndex(
        (pkg) =>
          pkg.name === name &&
          pkg.price === price &&
          pkg.flightType === flightType &&
          pkg.flightDuration === flightDuration &&
          pkg.hotel === hotel
      );

      if (index !== -1) {
        packages.splice(index, 1);
        localStorage.setItem("packages", JSON.stringify(packages));
      }
    });

    packageCard.append(info, deleteBtn);
    return packageCard;
  };

  if (packagesStore) {
    packagesStore.forEach((pkg) => {
      packagesRecord.append(createPackageCard(pkg));
    });
  }
};

loadPackages();

//=========================================================================
//==================Funcion Carrito conectada a la bd======================
//=========================================================================

const buyCartBtn = document.getElementById("buy-cart");
const packagesRecord = document.getElementById("packages-record");
const history = document.getElementById("history");
const totalEl = document.getElementById("total-price");
const productCounter = document.getElementById("product-counter");

let packagesStore = JSON.parse(localStorage.getItem("packages")) || [];

let precio_total = packagesStore.reduce((total, packageItem) => {
  return total + (packageItem.precio || packageItem.price || 0);
}, 0);

buyCartBtn.addEventListener("click", async (e) => {
  // if (totalEl) totalEl.textContent = precio_total.toFixed(2);
  if (productCounter) productCounter.textContent = packagesStore.length;

  if (precio_total > 0 && packagesStore.length > 0) {
    e.target.style.display = "none";

    console.log(packagesStore);
    
    
    // packagesStorage = JSON.parse(packagesStorage);
    // const currentPrice = totalEl.textContent;

    const product = {
      id: "1",
      titulo: "carrito",
      precio: 100000000,
      cantidad: 1,
    };

    try {
      const token = localStorage.getItem("token");

      const resp = await fetch(`${API_URL}/ordenes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          fecha: new Date().toISOString().split("T")[0],
          estado: "pendiente",
          usuario: 10,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        alert(data.error || "Error al realizar la compra");
        return;
      }

      const response = await fetch("http://localhost:3000/create_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packagesStore),
      });

      // console.log(response);

      const datamp = await response.json();
      // console.log(data);

      const publicKey = "APP_USR-49d5eceb-fc89-4349-80c6-3cc2dba46f23";
      const preferenceId = datamp.id;

      const mp = new MercadoPago(publicKey);

      const bricksBuilder = mp.bricks();

      const renderWalletBrick = async (bricksBuilder) => {
        await bricksBuilder.create("wallet", "walletBrick_container", {
          initialization: {
            preferenceId: preferenceId,
          },
        });
      };

      renderWalletBrick(bricksBuilder);

      alert("¡Compra realizada con éxito!");
      localStorage.removeItem("packages");
      packagesRecord.innerHTML = "";
      history.innerHTML = "";
      totalEl.textContent = 0;
      productCounter.textContent = 0;
      precio_total = 0;
      packagesStore = [];
    } catch (err) {
      console.error("Error al comprar:", err);
      alert("No se pudo conectar al servidor");
    }
  }
});
