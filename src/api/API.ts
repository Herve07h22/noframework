import { api } from "./endpoints";

export type ApiFnArgs<T = {}> = T & { token?: string };

type APITree = typeof api;

export type APIPath<K extends string> = K extends `${infer L1}/${infer L2}`
  ? L1 extends keyof APITree
    ? L2 extends keyof APITree[L1]
      ? APITree[L1][L2]
      : never
    : never
  : never;

type Endpoint<K extends keyof APITree = keyof APITree> = K extends string
  ? `${K}/${keyof APITree[K] & string}`
  : never;

export type ApiPayload<T extends string> = Parameters<
  APIPath<T>
>[0] extends ApiFnArgs<infer U>
  ? ApiFnArgs<U>
  : never;
export type ApiResult<T extends string> = ReturnType<APIPath<T>>;

export type API = <T extends Endpoint = Endpoint>(endpoint: T, payload: ApiPayload<T>) => ApiResult<T>;

export type ApiEndpoints = Endpoint;
