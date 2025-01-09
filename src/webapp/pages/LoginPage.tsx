import { store } from "../state/makeStore";
import { useStore } from "../state/StoreContext";
import styles from "./Login.module.css";

export function LoginPage() {
  const { notification } = useStore(); // useStore return an immutable object

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await store.auth.login({ // And not auth.login(), because we want to use the proxy
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        {notification.toast?.type === "error" && (
          <div className={styles.error}>{notification.toast.message}</div>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              className={styles.input}
              required
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

