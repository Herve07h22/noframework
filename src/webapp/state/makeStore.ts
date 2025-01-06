import { type API } from "../../server/API";
import { Router } from "./router/Router";
import { Notification } from "./notification/Notification";
import { Authentication } from "./authentication/Authentication";
import { proxy } from "valtio";

var store: Store;

export function makeStore(api: API) {
  if (store) return store;
  store = proxy({
    router: new Router(),
    notification: new Notification(),
    auth: new Authentication(api, () => makeStore(api)),
  });
  return store;
}

export type Store = {
  router: Router;
  notification: Notification;
  auth: Authentication;
};
