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
