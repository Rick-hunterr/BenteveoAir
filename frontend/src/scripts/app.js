const API_URL = "http://localhost:3000";

const loginModal = document.getElementById("login-wrapper");
const registerModal = document.getElementById("register-wrapper");
const openLoginBtn = document.getElementById("open-login");
const closeLoginBtn = document.getElementById("close-login");
const backToLogin = document.getElementById("back-to-login");
const backToRegister = document.getElementById("back-to-register");

const packageModal = document.getElementById("package-modal");
const confirmPkgBtn = document.getElementById("confirm-package");
const closePackageModal = document.getElementById("close-package-modal");

//=========================================================================
//======================== Mostrar inicio de sesion =======================
//=========================================================================

openLoginBtn.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
});

closeLoginBtn.addEventListener("click", () => {
  loginModal.classList.add("hidden");
});

backToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.add("hidden");
  registerModal.classList.remove("hidden");
});

//=========================================================================
//======================== Mostrar registro ===============================
//=========================================================================

const openRegisterBtn = document.getElementById("open-register");
const closeRegisterBtn = document.getElementById("close-register");

openRegisterBtn.addEventListener("click", () => {
  registerModal.classList.remove("hidden");
});

closeRegisterBtn.addEventListener("click", () => {
  registerModal.classList.add("hidden");
});

backToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerModal.classList.add("hidden");
  loginModal.classList.remove("hidden");
});

//=========================================================================
//======================== Mostrar/ocultar contraseña =====================
//=========================================================================

/* Inicio de sesión */
const passwordLogin = document.getElementById("password-login");
const showPswLogin = document.getElementById("show-psw-login");
const hidePswLogin = document.getElementById("hide-psw-login");

showPswLogin.addEventListener("click", () => {
  passwordLogin.type = "text";
  showPswLogin.classList.add("hidden");
  hidePswLogin.classList.remove("hidden");
});

hidePswLogin.addEventListener("click", () => {
  passwordLogin.type = "password";
  hidePswLogin.classList.add("hidden");
  showPswLogin.classList.remove("hidden");
});

/* Registro */
const passwordRegister = document.getElementById("password-register");
const showPswRegister = document.getElementById("show-psw-register");
const hidePswRegister = document.getElementById("hide-psw-register");

showPswRegister.addEventListener("click", () => {
  passwordRegister.type = "text";
  showPswRegister.classList.add("hidden");
  hidePswRegister.classList.remove("hidden");
});

hidePswRegister.addEventListener("click", () => {
  passwordRegister.type = "password";
  hidePswRegister.classList.add("hidden");
  showPswRegister.classList.remove("hidden");
});

//=========================================================================
//=============== modal de confirmación cargar paquete ====================
//=========================================================================

if (confirmPkgBtn) {
  confirmPkgBtn.addEventListener("click", () => {
    packageModal.classList.add("hidden");
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
        window.location.href = "/src/pages/admin/admin.html";
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
    registerModal.classList.add("hidden");
    loginModal.classList.remove("hidden");
  } catch (err) {
    console.error("Fetch registro:", err);
    alert("No se pudo conectar al servidor");
  }
});
