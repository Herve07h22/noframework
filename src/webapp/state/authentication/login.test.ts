import { testApi } from "../../../api/testApi";
import { makeStore } from "../makeStore";

it("A registered user can log in", async () => {
  const { auth, router, notification } = makeStore(testApi);
  expect(router.currentPage).toBe("/login");
  await auth.login({ email: "john.doe@acme.com", password: "pwd" });
  expect(notification.toast).toEqual({
    message: "Welcome John !",
    type: "success",
  });
  expect(router.currentPage).toBe("/dashboard");
});
