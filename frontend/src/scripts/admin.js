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
    perfilModal.showModal();
  });

  window.addEventListener("click", (e) => {
    if (!userMenu_Btn.contains(e.target) && !modalsContainer.contains(e.target)){
      perfilModal.close();
      modalsContainer.classList.add("hidden");
    }
  });
}

closePerfil.addEventListener("click", () => {
  perfilModal.close();
  modalsContainer.classList.add("hidden");
});



//=========================================================================
//============================== CERRAR SESIÓN ==========================
//=========================================================================


// if (logoutBtn) {
//   logoutBtn.addEventListener("click", () => {
//     localStorage.removeItem("token");
//     alert("Sesión cerrada");
//     location.reload();
//   });
// }



// //============================================================================
// //========================= CAMBIAR DATOS MODAL ============================
// //============================================================================
const cambiarDatosAdmin_Btn = document.getElementById("cambiarDatosAdmin_Btn");
const datosAdmin_Modal = document.getElementById("datosAdmin_Modal");
const cerrarDatosAdmin = document.getElementById("cerrarDatosAdmin");

cambiarDatosAdmin_Btn.addEventListener("click", (e) => {
  e.preventDefault();
  // perfilModal.close();

  datosAdmin_Modal.showModal();
});

cerrarDatosAdmin.addEventListener("click", () => {
  datosAdmin_Modal.close();
  modalsContainer.classList.add("hidden");
});

// modalsContainer.addEventListener("click", (e) => {
//   if (e.target === modalsContainer) {
//     datosAdmin_Modal.close();
//     modalsContainer.classList.add("hidden");
//   }
// });