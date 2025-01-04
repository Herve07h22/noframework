export class Router {

  currentPage = "/login";

  navigate(to: string) {
    this.currentPage = to;
}
}
