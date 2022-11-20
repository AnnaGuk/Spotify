import { Prisma } from "@prisma/client";

export type UserCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type MutationProps = {
  mode: "signin" | "signup";
  body: {
    email: string;
    password: string;
  };
};

const songWithArtist = Prisma.validator<Prisma.SongArgs>()({
  include: { artist: true },
});

export type SongWithArtist = Prisma.SongGetPayload<typeof songWithArtist>;
