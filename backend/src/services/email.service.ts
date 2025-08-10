import nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const verificationUrl = `http://localhost:${3000}/usuarios/verify-email?token=${token}`;
  
  const mailOptions = {
  from: `"Benteveo Air" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: 'Verifica tu cuenta en Benteveo Air',
  html: `
  <div style="background-color:#9C9C9C; padding: 40px 0; font-family: Arial, sans-serif; color: #333;">
    
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

      <div style="background-color: #212121; padding: 20px; text-align: center;">
        <img src="cid:logoBenteveo" alt="Benteveo Air" style="max-height: 60px;">
      </div>

      <div style="padding: 30px; text-align: center;">
        <h1 style="color: #000; font-size: 24px; margin-bottom: 15px;">Bienvenido a Benteveo Air</h1>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
          ¡Gracias por registrarte! Para activar tu cuenta, por favor verifica tu correo electrónico haciendo clic en el siguiente botón:
        </p>

        <a href="${verificationUrl}" 
           style="display: inline-block; background-color: #666666; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px;">
           Verificar cuenta
        </a>

        <p style="font-size: 14px; color: #888; margin-top: 30px;">
          Si no solicitaste este registro, puedes ignorar este mensaje.
        </p>
      </div>
    </div>
    
  </div>
  `,
  attachments: [
    {
      filename: 'BenteveoAirLogotipo.png',
      path: path.resolve(__dirname, '../../../frontend/src/assets/BenteveoAirLogotipo.png'),
      cid: 'logoBenteveo'
    }
  ]
};

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de verificación enviado a ${email}`);
  } catch (error) {
    console.error('Error al enviar email de verificación:', error);
    throw new Error('Error al enviar email de verificación');
  }
}