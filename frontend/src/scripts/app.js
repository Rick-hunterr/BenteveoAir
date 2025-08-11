const API_URL = "http://localhost:3000";

//=========================================================================
//======================== Mostrar inicio de sesion =======================
//=========================================================================

const modalWrapper = document.getElementById("inicioWrapper");
const modalRegistro = document.getElementById("registroWrapper");
const modal = document.getElementById("inicio");
const openModal = document.getElementById("openInicio");
const closeModal = document.getElementById("closeInicio");
const volverI = document.getElementById("volver-I");
const volverR = document.getElementById("volver-R");

const cerrarModal = document.getElementById("cerrarModal");
const confirmarPaquete = document.getElementById("confirmarPaquete");
const modal1 = document.getElementById("modalPaquete");

openModal.addEventListener("click", () => {
  modalWrapper.classList.remove("hidden");
  modal.showModal();
});

volverR.addEventListener("click", (e) => {
  e.preventDefault();
  modal.close();
  modalWrapper.classList.add("hidden");
  registroWrapper.classList.remove("hidden");
  registro.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
  modalWrapper.classList.add("hidden");
});

modalWrapper.addEventListener("click", (e) => {
  if (e.target === modalWrapper) {
    modal.close();
  }
});

modal.addEventListener("click", (e) => {
  e.stopPropagation();
});

//=========================================================================
//======================== Mostrar registro ===============================
//=========================================================================

const registroWrapper = document.getElementById("registroWrapper");
const registro = document.getElementById("registro");
const openRegistro = document.getElementById("openRegistro");
const closeRegistro = document.getElementById("closeRegistro");

openRegistro.addEventListener("click", () => {
  registroWrapper.classList.remove("hidden");
  registro.showModal();
});

closeRegistro.addEventListener("click", () => {
  registro.close();
  registroWrapper.classList.add("hidden");
});

volverI.addEventListener("click", (e) => {
  e.preventDefault();
  registro.close();
  registroWrapper.classList.add("hidden");
  modalWrapper.classList.remove("hidden");
  modal.showModal();
});

registroWrapper.addEventListener("click", (e) => {
  if (e.target === registroWrapper) {
    registro.close();
  }
});

//=========================================================================
//======================== Mostrar/ocultar contraseña =====================
//=========================================================================

/* Inicio de sesión */
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

/* Registro */
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

//=========================================================================
//=============== modal de confirmación cargar paquete ====================
//=========================================================================

if (confirmarPaquete) {
  confirmarPaquete.addEventListener("click", () => {
    modal1.classList.add("hidden");
  });
}

//=========================================================================
//=============GUARDAR DATOS DEL FORMULARIO EN LA BASE DE DATOS===========
//=========================================================================

//=========================================================================
//============================== LOGIN ====================================
//=========================================================================

// Asegúrate de seleccionar el formulario de inicio de sesión correctamente
const inicioForm = document.getElementById("inicio");

inicioForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const email = document.querySelector("#email-login").value.trim();
    const contraseña = document.querySelector("#password-login").value;

    if (!email || !contraseña) {
      alert("Email y contraseña son obligatorios");
      return;
    }

    const resp = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, contraseña }),
    });

    let data;
    try {
      data = await resp.json();
    } catch (jsonError) {
      alert("Error al procesar la respuesta del servidor.");
      return;
    }

    if (resp.ok && data.token) {
      // aca guardo el token y iria la logica para redirigir si es usuario o admin
      localStorage.setItem("token", data.token);
      console.log("Token guardado:", data.token);

      const rol = await verificarRol();
      if (rol === "admin") {
        alert("Login exitoso");
        window.location.href = "/src/pages/admin/admin.html"
      } else if (rol === "cliente") {
        alert("Login exitoso");
        window.location.reload(); // modifique esto porque generaba un error en la url y la conexion con las demas paginas
      } else {
        alert("Rol no reconocido");
        return;
      }
    } else {
      alert(data?.error || "Error al iniciar sesión");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Error al iniciar sesión");
  }
});

//Funcion para verificar si el que esta iniciando es administrador o usuario
async function verificarRol() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    console.log("Verificando rol del usuario, con token:", token);
    const resp = await fetch(`${API_URL}/usuarios/rol`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!resp.ok) throw new Error("Error al verificar rol");

    const data = await resp.json();
    return data.rol;
  } catch (error) {
    console.error("Error al verificar rol:", error);
    return null;
  }
}

//=========================================================================
//============================== CERRAR SESIÓN ==========================
//=========================================================================
const userMenuBtn = document.getElementById("userMenuBtn");
const userDropdown = document.getElementById("userDropdown");
const logoutBtn = document.getElementById("logoutBtn");

if (userMenuBtn && userDropdown) {
  userMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("hidden");
  });

  window.addEventListener("click", (e) => {
    if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.add("hidden");
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("Sesión cerrada");
    location.reload();
  });
}

//=========================================================================
//============================== REGISTRO =================================
//=========================================================================

registro.addEventListener("submit", async (e) => {
  console.log("Formulario de registro enviado");
  e.preventDefault();

  const nombre = document.getElementById("user-register").value.trim();
  const email = document.getElementById("email-register").value.trim();
  const contraseña = document.getElementById("password-register").value;

  if (!nombre || !email || !contraseña) {
    alert("Todos los campos son obligatorios");
    return;
  }
  if (contraseña.length < 4) {
    alert("La contraseña debe tener al menos 4 caracteres");
    return;
  }

  try {
    const resp = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, contraseña, rol: "cliente" }),
    });
    const data = await resp.json();

    if (!resp.ok) {
      alert(data.error || "Error al registrar");
      return;
    }

    alert("Registro exitoso. Por favor inicia sesión.");
    registro.close();
    registroWrapper.classList.add("hidden");
    modalWrapper.classList.remove("hidden");
    modal.showModal();
  } catch (err) {
    console.error("Fetch registro:", err);
    alert("No se pudo conectar al servidor");
  }
});
