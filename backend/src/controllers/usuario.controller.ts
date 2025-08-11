import { Request, Response } from "express"
import { AppDataSource } from "../config/db"
import { Usuario } from "../models/Usuario"
import { Ubicacion } from "../models/Ubicacion"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { generateVerificationToken, sendVerificationEmail } from '../services/email.service';

const repo = AppDataSource.getRepository(Usuario)
const repoUbicacion = AppDataSource.getRepository(Ubicacion)

export async function obtenerUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await repo.find({ relations: ["ubicacion"] })
    res.status(200).json(usuarios)
  } catch (error) {
    console.error("ERROR al obtener usuarios:", error)
    res.status(500).json({ error: "Error al obtener usuarios" })
  }
}

export async function crearUsuario(req: Request, res: Response) {
  const nombre = req.body.nombre
  const email = req.body.email
  const contraseña = req.body.contraseña
  const rol = req.body.rol
  const ubicacion = req.body.ubicacion

  if (!nombre || !email || !contraseña || !rol) {
    res.status(400).json({ 
      error: "Nombre, email, contraseña y rol son requeridos" 
    })
    return
  }

  if (contraseña.length < 4) {
    res.status(400).json({ 
      error: "La contraseña debe tener al menos 4 caracteres" 
    })
    return
  }

  try {
    const usuarioExistente = await repo.findOne({ where: { email } })
    if (usuarioExistente) {
      res.status(400).json({ error: "El email ya está en uso" })
      return
    }

    const hashedContraseña = await bcrypt.hash(contraseña, 10)

    let ubicacionEntity = null
    if (ubicacion) {
      ubicacionEntity = await repoUbicacion.findOneBy({ id: ubicacion.id })
      if (!ubicacionEntity) {
        res.status(400).json({ error: "Ubicación no encontrada" })
        return
      }
    }

    const verificationToken = generateVerificationToken()

    const nuevoUsuario = repo.create({
      nombre: nombre,
      email: email,
      contraseña: hashedContraseña,
      rol: rol,
      ubicacion: ubicacionEntity,
      emailVerificado: false, 
      verificationToken: verificationToken
    })

    const resultado = await repo.save(nuevoUsuario)

     sendVerificationEmail(email, verificationToken)
      .catch(error => console.error('Error al enviar email de verificación:', error))

     res.status(201).json({
      id: resultado.id,
      nombre: resultado.nombre,
      email: resultado.email,
      rol: resultado.rol,
      ubicacion: resultado.ubicacion,
      message: "Usuario registrado. Por favor verifica tu email."
    })
  } catch (error) {
    console.error("ERROR al crear usuario:", error)
    res.status(500).json({ 
      error: "Error al crear usuario", 
      details: (error as any).message 
    })
  }
}


export async function loginUsuario(req: Request, res: Response) {
  const { email, contraseña } = req.body

  if (!email || !contraseña) {
    res.status(400).json({ error: "Email y contraseña son requeridos" })
    return
  }

  try {
    const usuario = await repo.findOne({ where: { email } })

    if (!usuario) {
      res.status(401).json({ error: "Credenciales inválidas" })
      return
    }

    if (!usuario.contraseña) {
      res.status(500).json({ error: "El usuario no tiene contraseña registrada" })
      return
    }

    if (!usuario.emailVerificado) {
    res.status(401).json({ 
      error: "Por favor verifica tu email antes de iniciar sesión",
      emailNotVerified: true 
    });
    return;
  }

    const esValido = await bcrypt.compare(contraseña, usuario.contraseña)

    if (!esValido) {
      res.status(401).json({ error: "Credenciales inválidas" })
      return
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
    )

    res.json({ token })


    const rol = usuario.rol

    if (!rol) {
      verificarRol(req, res)
    }    

  } catch (error) {
    console.error("ERROR en loginUsuario:", error)
    res.status(500).json({ error: "Error en el servidor" })
  }
}

export async function verifyEmail(req: Request, res: Response) {
  const { token } = req.query;

  if (!token) {
    res.status(400).json({ error: "Token de verificación requerido" });
    return;
  }

  try {
    const usuario = await repo.findOne({ 
      where: { verificationToken: token as string } 
    });

    if (!usuario) {
      res.status(404).json({ error: "Token de verificación inválido" });
      return;
    }

    usuario.emailVerificado = true;
    usuario.verificationToken = null;
    await repo.save(usuario);

    res.redirect(`http://localhost:5173/email-verificado.html?success=true`);
  } catch (error) {
    console.error("ERROR al verificar email:", error);
    res.status(500).json({ error: "Error al verificar email" });
  }
}


export async function verificarRol(req: Request, res: Response) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token no proporcionado" })
    return
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey") as { rol: string }
    res.status(200).json({ rol: decoded.rol })
  } catch (error) {
    res.status(401).json({ error: "Token inválido" })
  }
}
export async function eliminarUsuario(req: Request, res: Response) {
  const { id } = req.params

  if (isNaN(Number(id))) {
    res.status(400).send("ID inválido")
    return
  }

  try {
    const usuario = await repo.findOneBy({ id: Number(id) })

    if (!usuario) {
      res.status(404).send("Usuario no encontrado")
      return
    }

    await repo.remove(usuario)
    res.status(204).send()
  } catch (error) {
    console.error("ERROR al eliminar usuario:", error)
    res.status(500).send("Error al eliminar usuario")
  }
}

export async function actualizarUsuario(req: Request, res: Response) {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    res.status(400).send("ID inválido")
    return
  }

  try {
    const usuario = await repo.findOneBy({ id })

    if (!usuario) {
      res.status(404).send("Usuario no encontrado")
      return
    }

    const updatedData = req.body

    if (updatedData.ubicacion) {
      const ubicacion = await repoUbicacion.findOneBy({ id: updatedData.ubicacion.id })
      if (!ubicacion) {
        res.status(400).send("Ubicación no encontrada")
        return
      }
      updatedData.ubicacion = ubicacion
    }

    if (updatedData.contraseña) {
      if (updatedData.contraseña.length < 4) {
        res.status(400).json({ error: "La contraseña debe tener al menos 4 caracteres" })
        return
      }
      updatedData.contraseña = await bcrypt.hash(updatedData.contraseña, 10)
    }

    Object.assign(usuario, updatedData)

    const resultado = await repo.save(usuario)
    res.status(200).json(resultado)

  } catch (error) {
    console.error("ERROR al actualizar usuario:", error)
    res.status(500).send("Error al actualizar usuario")
  }
}

