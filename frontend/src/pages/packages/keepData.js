const packageData = (name, price, flightType, flightDuration, hotelName) => {
  return {
    name: name,
    price: price,
    flightType: flightType,
    flightDuration: flightDuration,
    hotel: hotelName,
  };
};

const packages = document.querySelectorAll("#turistic-packages .packageCard");
const packageDataStore = [];

packages.forEach((pkg) => {
  const addToCart = pkg.querySelector(".add-to-cart");

  addToCart.addEventListener("click", () => {
    const packageName = pkg.querySelector("#package-name").textContent;
    let packagePrice = pkg.querySelector("#package-price").textContent;
    packagePrice = parseInt(packagePrice.replace(/\./g, ""));

    const flightType = pkg.querySelector("#flight-type").textContent;
    const flightDuration = pkg.querySelector("#flight-duration").textContent;
    const hotelName = pkg.querySelector("#hotel-name").textContent;

    const firstData = packageData(
      packageName,
      packagePrice,
      flightType,
      flightDuration,
      hotelName
    );

    packageDataStore.push(firstData);
  });
});

const resguardarDatosDelPaquete = () => {
  const packageModal = document.getElementById("package-modal");
  const confirmPkgBtn = document.getElementById("confirm-package");

  let packagesStorage = JSON.parse(localStorage.getItem("packages") || "[]");

  confirmPkgBtn.addEventListener("click", () => {
    const fechaSalida = packageModal.querySelector("#fechaInicio").value;
    const fechaRegreso = packageModal.querySelector("#fechaFin").textContent;
    const cantPasajes = packageModal.querySelector("#cantidadPasajes").value;

    const modalData = {
      fechaSalida: fechaSalida,
      fechaRegreso: fechaRegreso,
      cantPasajes: cantPasajes,
    };

    let updateData = {};
    packageDataStore.forEach((data) => {
      updateData = { ...data, ...modalData };
    });

    packagesStorage.push(updateData);

    localStorage.setItem("packages", JSON.stringify(packagesStorage));
  });
};

resguardarDatosDelPaquete();
