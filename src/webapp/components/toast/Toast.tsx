import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import styles from "./Toast.module.css";
import { useStore } from "../../state/StoreContext";

export function Toast() {
  const { notification } = useStore();

  console.log("re-render : ", notification.toast);

  if (!notification.toast) return null;

  const { type, message } = notification.toast;

  return (
    <div
      aria-live="assertive"
      className={`${styles.container} ${notification.show ? styles.toastShow : styles.toastHide}`}
    >
      <div className={styles.notificationPanel}>
        <div className={styles.contentWrapper}>
          <div className={styles.iconWrapper}>
            {type === "success" ? (
              <CheckCircleIcon
                aria-hidden="true"
                className={styles.successIcon}
              />
            ) : (
              <XMarkIcon
                aria-hidden="true"
                className={styles.errorIcon}
              />
            )}
          </div>

          <div className={styles.textWrapper}>
           {message}
          </div>

          <div className={styles.buttonWrapper}>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close"
            >
              <XMarkIcon aria-hidden="true" className={styles.closeIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
