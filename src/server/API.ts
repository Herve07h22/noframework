import { login } from "./auth/login";

export type API = {
  auth: {
    login: typeof login;
  };
};
