//============================================================================
//========================= Modal user default ===============================
//============================================================================
const openPerfil = document.getElementById("openPerfil");
const closePerfil = document.getElementById("closePerfil");
const perfilWrapper = document.getElementById("perfilWrapper");
const perfilModal = document.getElementById("perfilModal");

openPerfil.addEventListener("click", () => {
  perfilWrapper.classList.remove("hidden");
  perfilModal.showModal();
});

closePerfil.addEventListener("click", () => {
  perfilModal.close();
  perfilWrapper.classList.add("hidden");
});

perfilWrapper.addEventListener("click", (e) => {
  if (e.target === perfilWrapper) {
    perfilModal.close();
    perfilWrapper.classList.add("hidden");
  }
});


//============================================================================
//========================= Cambiar Usuario Modal ============================
//============================================================================
const openCambiarUsuario = document.getElementById("openCambiarUsuario");
const closeCambiarUsuario = document.getElementById("closeCambiarUsuario");
const cambiarUsuarioWrapper = document.getElementById("cambiarUsuarioWrapper");
const cambiarUsuarioModal = document.getElementById("cambiarUsuarioModal");

openCambiarUsuario.addEventListener("click", (e) => {
  e.preventDefault();
  perfilModal.close();
  perfilWrapper.classList.add("hidden");

  cambiarUsuarioWrapper.classList.remove("hidden");
  cambiarUsuarioModal.showModal();
});

closeCambiarUsuario.addEventListener("click", () => {
  cambiarUsuarioModal.close();
  cambiarUsuarioWrapper.classList.add("hidden");
});

cambiarUsuarioWrapper.addEventListener("click", (e) => {
  if (e.target === cambiarUsuarioWrapper) {
    cambiarUsuarioModal.close();
    cambiarUsuarioWrapper.classList.add("hidden");
  }
});