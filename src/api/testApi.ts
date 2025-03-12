import { type ApiEndpoints, type ApiPayload, type ApiResult } from "./API";
import { api } from "./endpoints";
import { buildToken, User } from "./endpoints/auth/login";
import { ResultError } from "./utils/Result";
import get from "lodash.get";

export var testToken = "";

export function testApi<T extends ApiEndpoints>(
  endpoint: T,
  payload: ApiPayload<T>
): ApiResult<T> {
  try {
    const handler = get(api, endpoint.replace("/", ".")) as (
      params: ApiPayload<T>
    ) => ApiResult<T>;
    if (!handler) {
      return ResultError(`Unknown route ${endpoint}`) as ApiResult<T>;
    }

    return testToken
      ? handler({ ...payload, token: testToken })
      : handler({ ...payload });
  } catch (e) {
    return ResultError(String(e)) as ApiResult<T>;
  }
}

export function setTestToken(
  user: User,
  dateProvider = () => Date.now()
) {
  testToken = buildToken(user, dateProvider);
}
