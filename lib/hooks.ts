import { Playlist, User } from "@prisma/client";
import useSWR from "swr";
import fetcher from "./fetcher";

type UserWithPlaylistsCount = User & {
  playlistsCount: number;
};

type UserData = {
  user: UserWithPlaylistsCount;
  isLoading: boolean;
  isError: Error;
};

type PlaylistData = {
  playlists: Playlist[];
  isLoading: boolean;
  isError: Error;
};

export const useMe = (): UserData => {
  const { data, error } = useSWR("/me", fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = (): PlaylistData => {
  const { data, error } = useSWR("/playlist", fetcher);

  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};
