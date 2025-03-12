import { ApiFnArgs } from "../../API";
import { Result, ResultError, ResultOk } from "../../utils/Result";

export type User = {
  id: string;
  name: string;
  email: string;
};

export async function login(
  params: ApiFnArgs<{
    email: string;
    password: string;
  }>
): Promise<
  Result<User & {
    token?: string;
  }>
> {
  // Do stuff there with your backend
  // Generate a secure token

  if (params.email === "john.doe@acme.com" && params.password === "pwd") {
    const fakeUser = {
      id: "this-is-a-fake-id",
      name: "John",
      email: "john.doe@acme.com",
    };
    const token = buildToken(fakeUser);

    return ResultOk({
      ...fakeUser,
      token,
    });
  } else {
    return ResultError("Invalid username or password");
  }
}

export function buildToken(user: User, dateProvider = () => Date.now()): string {
  return "this-is-a-fake-token";
}
