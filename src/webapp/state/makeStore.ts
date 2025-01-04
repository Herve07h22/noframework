import { type API } from "../../server/API";
import { Router } from "./router/Router";
import { Notification } from "./notification/Notification";
import { Authentication } from "./authentication/Authentication";

export function makeStore(api: API) {
  const router = new Router();
  const notification = new Notification();
  const auth = new Authentication(api, { router, notification });
  return { auth, router, notification };
}
