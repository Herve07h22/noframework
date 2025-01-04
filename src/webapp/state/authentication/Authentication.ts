import { API } from "../../../server/API";
import { Router } from "../router/Router";
import { Notification } from "../notification/Notification";

export class Authentication {
  constructor(
    private api: API,
    private dependencies: { router: Router; notification: Notification }
  ) {}

  async login(params: { email: string; password: string }) {
    const result = await this.api.auth.login(params); // This will fire a RPC to the server
    const { router, notification } = this.dependencies;
    if (result.status === "ok") {
      router.navigate("/dashboard");
      notification.success("Welcome " + result.value.name + " !");
    } else {
      notification.error(result.error);
    }
  }
}
