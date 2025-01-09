import { proxy } from "valtio";

class Counter {
  count = 0;
  name = "foo";
  inc() {
    ++this.count;
  }
  async setName(name: string) {
    this.name = name;
  }
}

class Router {
  currentPage = "/login";

  navigate(to: string) {
    this.currentPage = to;
  }
}

class State {
  counter = new Counter();
  router = new Router();
}

const state = proxy(new State());

it("should increment count", () => {
  const { counter } = state;
  counter.inc();
  expect(counter.count).toBe(1);
});

it("should set name", async () => {
  const { counter } = state;
  await counter.setName("bar");
  expect(counter.name).toBe("bar");
});
