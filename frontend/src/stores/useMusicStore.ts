import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

export interface Album {
  _id: string;
  title: string;
  artist: string;
  releaseYear: number;
  imageUrl: string;
  songs: Song[];
  createdAt: string;
  updatedAt: string;
}

export interface Song {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MusicStore {
  albums: Array<Album>;
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: {} as Album,
  fetchAlbums: async () => {
    // data fetching logic goes here
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/albums');
      set({ albums: response.data.albums });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data.album });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
