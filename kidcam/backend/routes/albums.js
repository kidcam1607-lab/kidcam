import express from 'express';
import Album from '../models/Album.js';
import { verifyAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { generateSlug } from '../utils/helpers.js';

const router = express.Router();

router.post('/create', verifyAdmin, async (req, res) => {
  try {
    const { clientName, albumTitle, password } = req.body;
    if (!clientName) {
      return res.status(400).json({ error: 'Client name is required' });
    }
    const albumSlug = generateSlug(clientName);
    const album = new Album({
      clientName,
      albumSlug,
      albumTitle: albumTitle || `${clientName}'s Album`,
      password: password || null,
    });
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/upload', verifyAdmin, upload.array('photos', 50), async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    
    const uploadedPhotos = req.files.map((file) => ({
      url: file.path,
      uploadedAt: new Date(),
    }));
    
    album.photos.push(...uploadedPhotos);
    if (!album.coverImage && uploadedPhotos.length > 0) {
      album.coverImage = uploadedPhotos[0].url;
    }
    await album.save();
    res.json({ message: 'Photos uploaded successfully', album });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', verifyAdmin, async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.json({ message: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id/photo/:photoIndex', verifyAdmin, async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    album.photos.splice(req.params.photoIndex, 1);
    await album.save();
    res.json({ message: 'Photo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/reorder', verifyAdmin, async (req, res) => {
  try {
    const { photoOrder } = req.body;
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    
    const reorderedPhotos = photoOrder.map((index) => album.photos[index]);
    album.photos = reorderedPhotos;
    await album.save();
    res.json({ message: 'Photos reordered', album });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/update-contact', verifyAdmin, async (req, res) => {
  try {
    const { clientEmail, clientPhone } = req.body;
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      { clientEmail, clientPhone },
      { new: true }
    );
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/analytics', verifyAdmin, async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    
    const downloadsByPhoto = {};
    album.downloads.forEach((download) => {
      downloadsByPhoto[download.photoIndex] =
        (downloadsByPhoto[download.photoIndex] || 0) + 1;
    });

    res.json({
      totalViews: album.views,
      totalDownloads: album.downloads.length,
      downloadsByPhoto,
      createdAt: album.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
