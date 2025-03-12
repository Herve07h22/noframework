import { type ApiEndpoints, type ApiPayload, type ApiResult } from "./API";

import { ResultError } from "./utils/Result";

export function productionApi<T extends ApiEndpoints>(
  endpoint: T,
  payload: ApiPayload<T>
) {
  try {
    return fetch(`/api/${endpoint}`, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then(r => r.json()) as ApiResult<T>;
  } catch (e) {
    return ResultError(String(e)) as ApiResult<T>;
  }
}
