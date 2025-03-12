import { API } from "../../../api/API";
import { store } from "../makeStore";

export class Authentication {
  constructor(
    private api: API,
  ) {}

  // States
  user: {
    name: string;
    email: string;
  } | null = null;

  isLoading = false;

  async login(params: { email: string; password: string }) {
    const { router, notification } = store;

    this.isLoading = true;
    const result = await this.api("auth/login", params); // This will fire a RPC to the server
    if (result.status === "ok") {
      this.user = result.value;
      router.navigate("/dashboard");
      notification.success("Welcome " + result.value.name + " !");
    } else {
      notification.error(result.error);
    }
    this.isLoading = false;
  }

  check() {
    if (!this.user) {
      store.router.navigate("login");
      return false;
    }
    return true;
  }
}
