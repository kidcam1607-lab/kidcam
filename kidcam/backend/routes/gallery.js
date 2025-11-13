import express from 'express';
import Album from '../models/Album.js';

const router = express.Router();

router.get('/:slug', async (req, res) => {
  try {
    const album = await Album.findOne({ albumSlug: req.params.slug });
    if (!album) return res.status(404).json({ error: 'Album not found' });
    
    album.views += 1;
    await album.save();

    res.json({
      clientName: album.clientName,
      albumTitle: album.albumTitle,
      coverImage: album.coverImage,
      isPasswordProtected: !!album.password,
      photos: album.photos,
      albumSlug: album.albumSlug,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:slug/verify', async (req, res) => {
  try {
    const { password } = req.body;
    const album = await Album.findOne({ albumSlug: req.params.slug });
    if (!album) return res.status(404).json({ error: 'Album not found' });
    if (album.password && album.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    res.json({ verified: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:slug/track-download/:photoIndex', async (req, res) => {
  try {
    const album = await Album.findOne({ albumSlug: req.params.slug });
    if (!album) return res.status(404).json({ error: 'Album not found' });
    
    album.downloads.push({
      photoIndex: parseInt(req.params.photoIndex),
      downloadedAt: new Date(),
    });
    await album.save();
    res.json({ message: 'Download tracked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
