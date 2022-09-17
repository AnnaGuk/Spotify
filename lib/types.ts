// type UserCredentials = {
//   email: string;
//   password: string;
// };

export type MutationProps = {
  mode: "signin" | "signup";
  body: {
    email: string;
    password: string;
  };
};
