const loadPackages = () => {
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
