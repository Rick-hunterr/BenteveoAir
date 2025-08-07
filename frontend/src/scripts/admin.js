//============================================================================
//============================== MODALES ===================================
//============================================================================
const modalsContainer = document.getElementById("modalsContainer");

//============================================================================
//========================= MODAL DE USUARIO ===============================
//============================================================================
const userMenu_Btn = document.getElementById("userMenu_Btn");
const perfilModal = document.getElementById("perfilModal");
const closePerfil = document.getElementById("closePerfil");

if (userMenu_Btn && modalsContainer) {
  userMenu_Btn.addEventListener("click", (e) => {
    e.stopPropagation();
    modalsContainer.classList.remove("hidden");
    perfilModal.classList.remove("hidden");
    perfilModal.showModal();
  });

  window.addEventListener("click", (e) => {
    if (!userMenu_Btn.contains(e.target) && !modalsContainer.contains(e.target)){
      perfilModal.close();
      perfilModal.classList.add("hidden");
      modalsContainer.classList.add("hidden");
    }
  });
}

closePerfil.addEventListener("click", () => {
  perfilModal.close();
  perfilModal.classList.add("hidden");
  modalsContainer.classList.add("hidden");
});

// //============================================================================
// //========================= CAMBIAR DATOS MODAL ============================
// //============================================================================
const cambiarDatosAdmin_Btn = document.getElementById("cambiarDatosAdmin_Btn");
const datosAdmin_Modal = document.getElementById("datosAdmin_Modal");
const guardarDatosAdmin_Btn = document.getElementById("guardarDatosAdmin_Btn");
const cerrarDatosAdmin = document.getElementById("cerrarDatosAdmin");

cambiarDatosAdmin_Btn.addEventListener("click", (e) => {
  e.preventDefault();
  perfilModal.close();
  perfilModal.classList.add("hidden");

  datosAdmin_Modal.classList.remove("hidden");
  datosAdmin_Modal.showModal();
});

cerrarDatosAdmin.addEventListener("click", () => {
  datosAdmin_Modal.close();
  datosAdmin_Modal.classList.add("hidden");
  modalsContainer.classList.add("hidden");
});

guardarDatosAdmin_Btn.addEventListener("click", () => {
  datosAdmin_Modal.close();
  datosAdmin_Modal.classList.add("hidden");
  modalsContainer.classList.add("hidden");
});

//=========================================================================
//============================== CERRAR SESIÓN ==========================
//=========================================================================
const logout_Btn = document.getElementById("logout_Btn");

if (logout_Btn) {
  logout_Btn.addEventListener("click", () => {
    perfilModal.close();
    perfilModal.classList.add("hidden");
    modalsContainer.classList.add("hidden");
    
    localStorage.removeItem("token");
    alert("Sesión cerrada");
    location.reload();
  });
}



