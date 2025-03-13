import { store } from "../state/makeStore";
import styles from "./Login.module.css";

export function LoginPage() {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await store.auth.login({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <main className={styles["login-container"]}>
      <article >
        <h2>Welcome !</h2>
        <form onSubmit={handleSubmit}>
         
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
              />
            </label>
          
          <button type="submit">Login</button>
        </form>
      </article>
    </main>
  );
}

