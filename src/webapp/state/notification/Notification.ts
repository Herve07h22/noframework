export class Notification {
  toast: { message: string; type: "success" | "error" } | null = null;

  error(message: string) {
    this.toast = { message, type: "error" };
  }
  success(message: string) {
    this.toast = { message, type: "success" };
  }
}