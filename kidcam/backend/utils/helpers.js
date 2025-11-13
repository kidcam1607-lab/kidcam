import QRCode from 'qrcode';
import nodemailer from 'nodemailer';

export const generateSlug = (clientName) => {
  const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${clientName.toLowerCase().replace(/\s+/g, '-')}-${randomId}`;
};

export const generateQRCode = async (url) => {
  try {
    return await QRCode.toDataURL(url);
  } catch (error) {
    throw new Error('QR Code generation failed');
  }
};

export const sendAlbumLink = async (email, albumLink, clientName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Your ${clientName} Photo Album is Ready!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hello ${clientName}! 📸</h2>
        <p>Your photos are ready to view!</p>
        <p><a href="${albumLink}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">View Album</a></p>
        <p>Or copy this link: <strong>${albumLink}</strong></p>
        <p>Thank you for choosing us!</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendWhatsAppLink = async (phone, albumLink, clientName) => {
  const message = `Hi ${clientName}! Your photos are ready! View them here: ${albumLink}`;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return whatsappUrl;
};
