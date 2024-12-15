import { Song } from '../models/song.model.js';
export const getAllSongs = async (req, res, next) => {
  try {
    const songs = Song.find().sort({ createdAt: -1 });
    res.status(200).json({ songs });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 6,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.json({ songs });
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 4,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.json({ songs });
  } catch (error) {
    next(error);
  }

  /*
        for algorithmic usage we can try something like this

        maintain an listened array of songs for each user

        listenedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]

        then we can filter the songs based on listened songs

       const userId = req.user._id; // Get the authenticated user's ID

        const user = await User.findById(userId).populate('listenedSongs');

        // Extract the IDs of the songs the user has listened to
        const listenedSongIds = user.listenedSongs.map(song => song._id);
        
        // Extract genres or artists from listened songs for recommendations

        const genres = user.listenedSongs.map(song => song.genre); // Assuming each song has a genre field

        const artists = user.listenedSongs.map(song => song.artist); // Assuming each song has an artist field


        // Find recommended songs based on genres or artists
        const recommendedSongs = await Song.aggregate([
            {
                $match: {
                    _id: { $nin: listenedSongIds }, // Exclude songs already listened to
                    $or: [
                        { genre: { $in: genres } }, // Match by genre
                        { artist: { $in: artists } } // Match by artist
                    ]
                },
            },
            {
                $sample: { size: 4 }, // Randomly sample 4 songs from the filtered results
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                },
            },
        ]);
   */
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 4,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.json({ songs });
  } catch (error) {
    next(error);
  }
};
