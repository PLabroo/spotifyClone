import { Song } from '../models/song.model.js';
import { Album } from '../models/album.model.js';
import cloudinary from '../lib/cloudinary.js';

// helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
    });

    return result.secure_url;
  } catch (error) {
    console.log('Error uploading file to Cloudinary', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
};
export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ error: 'Missing audioFile or imageFile' });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    // cloudinary upload
    const imageUrl = uploadToCloudinary(imageFile);
    const audioUrl = uploadToCloudinary(audioFile);

    const song = await Song.create({
      title,
      artist,
      imageUrl,
      audioUrl,
      duration,
      albumId: albumId || null,
    });
    await song.save();

    // if song belongs to any album add to songs array list
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
    }
    res.status(201).json({ song });
  } catch (error) {
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndDelete(id);

    // if song belongs to any album remove from songs array list
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.log('Error in deleting song');
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = uploadToCloudinary(imageFile);
    const album = await Album.create({
      title,
      artist,
      releaseYear,
      imageUrl,
    });
    await album.save();
    res.status(201).json({ album });
  } catch (error) {
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    // delete songs as well for this album
    await Song.deleteMany({ albumId: id });

    const album = await Album.findByIdAndDelete(id);

    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    res.status(200).json({ isAdmin: true });
  } catch (error) {
    next(error);
  }
};
