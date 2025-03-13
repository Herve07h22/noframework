export class Notification {
  toast: { message: string; type: "success" | "error" } = { message: "", type: "success" };
  show = false;

  error(message: string) {
    this.toast = { message, type: "error" };
    this.show = true;
  }
  success(message: string) {
    this.toast = { message, type: "success" };
    this.show = true;
  }

  hide() {
    this.show = false;
    setTimeout(() => {
      this.show = false;
    }, 300); // Wait for animation to complete
  }
}
