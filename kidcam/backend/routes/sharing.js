import express from 'express';
import Album from '../models/Album.js';
import { verifyAdmin } from '../middleware/auth.js';
import { generateQRCode, sendAlbumLink, sendWhatsAppLink } from '../utils/helpers.js';

const router = express.Router();

router.get('/:id/qrcode', verifyAdmin, async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    
    const albumUrl = `${process.env.FRONTEND_URL}/album/${album.albumSlug}`;
    const qrCode = await generateQRCode(albumUrl);
    res.json({ qrCode, albumUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/send-email', verifyAdmin, async (req, res) => {
  try {
    const { email } = req.body;
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      { clientEmail: email },
      { new: true }
    );
    
    const albumUrl = `${process.env.FRONTEND_URL}/album/${album.albumSlug}`;
    await sendAlbumLink(email, albumUrl, album.clientName);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/whatsapp-link', verifyAdmin, async (req, res) => {
  try {
    const { phone } = req.query;
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      { clientPhone: phone },
      { new: true }
    );
    
    const albumUrl = `${process.env.FRONTEND_URL}/album/${album.albumSlug}`;
    const whatsappLink = await sendWhatsAppLink(phone, albumUrl, album.clientName);
    res.json({ whatsappLink });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
