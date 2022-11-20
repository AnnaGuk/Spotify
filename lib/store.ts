import { createStore, action, Action, createTypedHooks } from "easy-peasy";
import { SongWithArtist } from "./types";

type StoreModel = {
  activeSongs: SongWithArtist[];
  activeSong: SongWithArtist;
  changeActiveSongs: Action<StoreModel, SongWithArtist[]>;
  changeActiveSong: Action<StoreModel, SongWithArtist>;
};

export const store = createStore<StoreModel>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const { useStoreActions } = typedHooks;
export const { useStoreState } = typedHooks;
