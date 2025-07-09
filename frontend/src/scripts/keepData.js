const packages = document.querySelectorAll(".packageCard");

const saveData = () => {
  let emptyStore = [];
  let store = localStorage.getItem("packages");

  for (const package of packages) {
    const btnAdd = package.querySelector(".add-to-cart");

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


// Información de los paquetes
const paquetes = {
  Buenos: {
    ubicacion: "Buenos Aires - ciudad de Buenos Aires",
    duracion: 6
  },
  Jujuy: {
    ubicacion: "Jujuy - Los 7 colores",
    duracion: 10
  },
  Tierra: {
    ubicacion: "Tierra del Fuego - Ushuaia",
    duracion: 5
  },
  Barcelona: {
    ubicacion: "España - Barcelona",
    duracion: 7
  },
  Paris: {
    ubicacion: "Francia - Paris",
    duracion: 5
  },
  baviera: {
    ubicacion: "Alemania - Baviera",
    duracion: 7
  },
};

function abrirModal(destino) {
  const paquete = paquetes[destino];
  if (!paquete) return;

  ubicacionDestino.value = paquete.ubicacion;
  fechaInicio.value = "";
  fechaFin.textContent = "-";

  // Actualiza el cálculo de fecha según el destino
  fechaInicio.onchange = () => {
    const inicio = new Date(fechaInicio.value);
    if (!isNaN(inicio)) {
      const fin = new Date(inicio);
      fin.setDate(fin.getDate() + paquete.duracion);
      fechaFin.textContent = fin.toLocaleDateString('es-AR');
    } else {
      fechaFin.textContent = "-";
    }
  };

  modal1.classList.remove("hidden");
}


if (cerrarModal) {
  cerrarModal.addEventListener("click", () => {
    modal1.classList.add("hidden");
  });
}

// Ejemplo: botones para abrir la modal
document.getElementById("add-to-cart").addEventListener("click", () => abrirModal("Tierra"));
document.getElementById("add-to-cart-Buenos").addEventListener("click", () => abrirModal("Buenos"));
document.getElementById("add-to-cart-Jujuy").addEventListener("click", () => abrirModal("Jujuy"));
document.getElementById("add-to-cart-Espana").addEventListener("click", () => abrirModal("Barcelona"));
document.getElementById("add-to-cart-Francia").addEventListener("click", () => abrirModal("Paris"));
document.getElementById("add-to-cart-Alemania").addEventListener("click", () => abrirModal("baviera"));
