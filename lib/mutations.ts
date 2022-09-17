import fetcher from "./fetcher";
import type { MutationProps } from "./types";

export const auth = ({ mode, body }: MutationProps) => {
  return fetcher(`/${mode}`, body);
};
