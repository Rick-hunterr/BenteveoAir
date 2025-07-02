const packages = document.querySelectorAll("#package");

const saveData = () => {
  let emptyStore = [];
  let store = localStorage.getItem("packages");

  for (const package of packages) {
    const btnAdd = package.querySelector("#add-to-cart");

    btnAdd.addEventListener("click", () => {
      if (store) {
        emptyStore = JSON.parse(localStorage.getItem("packages"));

        const flightType = package.querySelector("#flight-type").textContent;
        const flightDuration =
          package.querySelector("#flight-duration").textContent;
        const hotelName = package.querySelector("#hotel-name").textContent;
        const packageName = package.querySelector("#package-name").textContent;
        let packagePrice = package.querySelector("#package-price").textContent;
        packagePrice = parseInt(packagePrice.replace(/\./g, ""));

        const packageData = {
          name: packageName,
          price: packagePrice,
          flightType: flightType,
          flightDuration: flightDuration,
          hotel: hotelName,
        };

        emptyStore.push(packageData);
        localStorage.setItem("packages", JSON.stringify(emptyStore));
      } else {
        const flightType = package.querySelector("#flight-type").textContent;
        const flightDuration =
          package.querySelector("#flight-duration").textContent;
        const hotelName = package.querySelector("#hotel-name").textContent;
        const packageName = package.querySelector("#package-name").textContent;
        let packagePrice = package.querySelector("#package-price").textContent;
        packagePrice = parseInt(packagePrice.replace(/\./g, ""));

        const packageData = {
          name: packageName,
          price: packagePrice,
          flightType: flightType,
          flightDuration: flightDuration,
          hotel: hotelName,
        };

        emptyStore.push(packageData);
        localStorage.setItem("packages", JSON.stringify(emptyStore));
      }
    });
  }
};

saveData();