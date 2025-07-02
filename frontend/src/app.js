const modalWrapper = document.getElementById('inicioWrapper');
const modal = document.getElementById('inicio');
const openModal = document.getElementById('openInicio');
const closeModal = document.getElementById('closeInicio');
const volverI = document.getElementById('volver-I');
const volverR = document.getElementById('volver-R');

openModal.addEventListener('click', () => {
  modalWrapper.classList.remove('hidden');
  modal.showModal();
});

volverR.addEventListener('click', (e) => {
  e.preventDefault();
  modal.close();
  modalWrapper.classList.add('hidden');
  registroWrapper.classList.remove('hidden');
  registro.showModal();
});

closeModal.addEventListener('click', () => {
  modal.close();
  modalWrapper.classList.add('hidden');
});

modalWrapper.addEventListener('click', (e) => {
  if (e.target === modalWrapper) {
    modal.close();
  }
});

modal.addEventListener('click', (e) => {
  e.stopPropagation();
});

/* Modal Registro */
const registroWrapper = document.getElementById('registroWrapper');
const registro = document.getElementById('registro');
const openRegistro = document.getElementById('openRegistro');
const closeRegistro = document.getElementById('closeRegistro');

openRegistro.addEventListener('click', () => {
  registroWrapper.classList.remove('hidden');
  registro.showModal();
});

closeRegistro.addEventListener('click', () => {
  registro.close();
  registroWrapper.classList.add('hidden');
});

volverI.addEventListener('click', (e) => {
  e.preventDefault();
  registro.close();
  registroWrapper.classList.add('hidden');
  modalWrapper.classList.remove('hidden');
  modal.showModal();
});

registroWrapper.addEventListener('click', (e) => {
  if (e.target === registroWrapper) {
    registro.close();
  }
});

/* Mostrar/ocultar contraseña - Inicio de sesión */
const passwordLogin = document.getElementById("password-login");
const mostrarLogin = document.getElementById("mostrar-login");
const ocultarLogin = document.getElementById("ocultar-login");

mostrarLogin.addEventListener("click", () => {
  passwordLogin.type = "text";
  mostrarLogin.classList.add("hidden");
  ocultarLogin.classList.remove("hidden");
});

ocultarLogin.addEventListener("click", () => {
  passwordLogin.type = "password";
  ocultarLogin.classList.add("hidden");
  mostrarLogin.classList.remove("hidden");
});

/* Mostrar/ocultar contraseña - Registro */
const passwordRegister = document.getElementById("password-register");
const mostrarRegister = document.getElementById("mostrar-register");
const ocultarRegister = document.getElementById("ocultar-register");

mostrarRegister.addEventListener("click", () => {
  passwordRegister.type = "text";
  mostrarRegister.classList.add("hidden");
  ocultarRegister.classList.remove("hidden");
});

ocultarRegister.addEventListener("click", () => {
  passwordRegister.type = "password";
  ocultarRegister.classList.add("hidden");
  mostrarRegister.classList.remove("hidden");
});

const modal1 = document.getElementById("modalPaquete");
const cerrarModal = document.getElementById("cerrarModal");
const fechaInicio = document.getElementById("fechaInicio");
const fechaFin = document.getElementById("fechaFin");
const ubicacionDestino = document.getElementById("ubicacionDestino");

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

cerrarModal.addEventListener("click", () => {
  modal1.classList.add("hidden");
});

// Ejemplo: botones para abrir la modal
document.getElementById("add-to-cart").addEventListener("click", () => abrirModal("Tierra"));
document.getElementById("add-to-cart-Buenos").addEventListener("click", () => abrirModal("Buenos"));
document.getElementById("add-to-cart-Jujuy").addEventListener("click", () => abrirModal("Jujuy"));
document.getElementById("add-to-cart-Espana").addEventListener("click", () => abrirModal("Barcelona"));
document.getElementById("add-to-cart-Francia").addEventListener("click", () => abrirModal("Paris"));
document.getElementById("add-to-cart-Alemania").addEventListener("click", () => abrirModal("baviera"));