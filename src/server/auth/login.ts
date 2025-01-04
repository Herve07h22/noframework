import { ResultOk } from "../utils/Result";

export type User = {
  name: string;
  email: string;
};

export async function login(params: { email: string; password: string }) {
  // This code should be executed on the server
  return ResultOk({ name: "John", email: "john.doe@acme.com" });
}
