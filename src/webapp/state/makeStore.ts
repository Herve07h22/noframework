import { type API } from "../../api/API";
import { Router } from "./router/Router";
import { Notification } from "./notification/Notification";
import { Authentication } from "./authentication/Authentication";
import { proxy } from "valtio";

export var store: Store;

export function makeStore(api: API): Store {
  if (store) return store;
  store = proxy(new Store(api));
  return store;
}

export class Store {
  router: Router;
  notification: Notification;
  auth: Authentication;
  constructor(api: API) {
    this.router = new Router();
    this.notification = new Notification();
    this.auth = new Authentication(api);
  }
};
