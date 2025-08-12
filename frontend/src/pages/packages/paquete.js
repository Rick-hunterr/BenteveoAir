//=========================================================================
//======================== MODAL DE INFOPAQUETES ==============================
//=========================================================================

const packageModal = document.getElementById("package-modal");
const confirmPkgBtn = document.getElementById("confirm-package");
const closePackageModal = document.getElementById("close-package-modal");

const infoPaquetes = {
  Buenos: {
    ubicacion: "Buenos Aires - ciudad de Buenos Aires",
    duracion: 6,
  },
  Jujuy: {
    ubicacion: "Jujuy - Los 7 colores",
    duracion: 10,
  },
  Tierra: {
    ubicacion: "Tierra del Fuego - Ushuaia",
    duracion: 5,
  },
  Barcelona: {
    ubicacion: "España - Barcelona",
    duracion: 7,
  },
  Paris: {
    ubicacion: "Francia - Paris",
    duracion: 5,
  },
  baviera: {
    ubicacion: "Alemania - Baviera",
    duracion: 7,
  },
};

function abrirModal(destino) {
  const paquete = infoPaquetes[destino];
  if (!paquete) return;

  ubicacionDestino.value = paquete.ubicacion;
  fechaInicio.value = "";
  fechaFin.textContent = "-";

  fechaInicio.onchange = () => {
    const inicio = new Date(fechaInicio.value);
    if (!isNaN(inicio)) {
      const fin = new Date(inicio);
      fin.setDate(fin.getDate() + paquete.duracion);
      fechaFin.textContent = fin.toLocaleDateString("es-AR");
    } else {
      fechaFin.textContent = "-";
    }
  };

  packageModal.classList.remove("hidden");

  closePackageModal.addEventListener("click", () => {
    packageModal.classList.add("hidden");
  });

  confirmPkgBtn.addEventListener("click", () => {
    packageModal.classList.add("hidden");
  });
}

document
  .getElementById("add-to-cart")
  .addEventListener("click", () => abrirModal("Tierra"));
document
  .getElementById("add-to-cart-Buenos")
  .addEventListener("click", () => abrirModal("Buenos"));
document
  .getElementById("add-to-cart-Jujuy")
  .addEventListener("click", () => abrirModal("Jujuy"));
document
  .getElementById("add-to-cart-Espana")
  .addEventListener("click", () => abrirModal("Barcelona"));
document
  .getElementById("add-to-cart-Francia")
  .addEventListener("click", () => abrirModal("Paris"));
document
  .getElementById("add-to-cart-Alemania")
  .addEventListener("click", () => abrirModal("baviera"));
