import { SongWithArtist } from "../../lib/types";

export type PlayerProps = {
  activeSong: SongWithArtist;
  songs: SongWithArtist[];
};
