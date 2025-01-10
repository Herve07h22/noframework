# You might not need a framework

## What is this?

**I've been building management tools for businesses for 6 years.  
But no full-stack framework has truly convinced me.  
So I'm going to try something different.**

Building a back-office web application is unique:  

- A single public page (login), with all others requiring authentication  
- Complex logic, both on the frontend and backend  
- Authentication often uses SSO systems  
- Strict restrictions, e.g., no access allowed outside the company network (no npm, no GitHub)  
- Strict requirements, like: "Edge browser only, nothing else on the user's PC"  
- The app is loaded in the morning and cached for the rest of the day/week  
- A few hundred to a few thousand users max  
- Interactions with office tools (e.g., Excel import/export) or older lecacy apps  
- Reliability, integrity, security are critical — but great UX is also a must.  

I've deployed enterprise apps using various stacks:  
Django, NestJS, Express, Rails, Next, Remix, GraphQL, react-router, tRPC.  

**But the conclusion is clear:**  
When I need to build a backoffice web app, no framework stands out as the "obvious" choice.  

What I want is simple:  

- A single Page App (SPA) and its backend
- Same language for frontend and backend to obfustate the network  
- Minimal dependencies  
- Use React to make it easy to build a great UI
- Everything must be *very* easy to test  
- Strong typing with cohesion between frontend and backend
- Simplicity and speed  
- Deliver the app as a single zipped package, executable on a Linux or Windows server with Node and Postgres installed 
- Fully usable with tools like Copilot/Cursor/etc. (leveraging a massive pre-installed codebase)  

So, I'll explore a more minimalist stack.  
Leaning on core building blocks (Node, Vite, React, and even plain HTML/CSS), whose progress sometimes makes extra libraries unnecessary.

## Let's build a backoffice web app

Let's start with the frontend.

The app will have a login page, and a dashboard page.
The dashboard page is protected by authentication.
The login page will be a simple form, and the dashboard page will display a list of users.

The very first test should be as simple as possible:

```ts
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
```

To make it passed, we just need 3 classes and a factory to instantiate them.

```ts
export function makeStore(api: API) {
  const router = new Router();
  const notification = new Notification();
  const auth = new Authentication(api, { router, notification });
  return { auth, router, notification };
}
```

The `api` inject the way to communicate with the server.
- When we are testing, the API makes direct calls to the server functions.
- When we are running the app, the API provides a type-safe RPC to the server.

## Observe the state

Our store is a collection of JS objects.
How can we track their state changes to update a React component?

Why is it such a tricky question?

👀 Because we want to observe them WITHOUT them knowing.
(Spying might be a more accurate term than observing!)

⚡️ And because we also want to optimize.
We want to limit updates to only those React components affected by the state changes.

What’s the simplest way to achieve this?

I’ve gone through all the phases:
- Using custom hooks instead of objects
- Using elegant objects (= a new instance on mutation) in a useState
- `useSyncExternalStore()`
- Redux, MobX, Zustand (in production), and a few other state managers (just to try them out)
- Various observable libraries

I dug into the code of renowned libraries like TanStack Query.
The same pattern emerges:
A hook instantiates an "observer" that monitors a part of the store and notifies React of changes using the `useSyncExternalStore` API.

Valtio seems to be the easiest way to "proxify" the store.

Valtio = Proxy + WeakMap + useSyncExternalStore.

The coupling to the library is minimal, affecting only two places in my code.

Observation :
```
export var store: Store;

export function makeStore(api: API): Store {
  if (store) return store;
  store = proxy(new Store(api)); // <-- Valtio
  return store;
}
```

Re-rendering :
```
export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  const snap = useSnapshot(store) // <-- Valtio
  return snap;
};
```


Simple, optimized, non-intrusive, and no impact on tests: that’s my choice.

