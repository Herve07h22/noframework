import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useStore } from "../../state/StoreContext";
import { store } from "../../state/makeStore";

export function Toast() {
  const { notification } = useStore();

  const { type, message } = notification.toast;

  return (
    <div
      aria-live="assertive"
      className={`container-fluid ${notification.show ? "fade-in" : "fade-out"}`}
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: 9999,
        maxWidth: "24rem"
      }}
    >
      <article className={`${type === "success" ? "secondary" : "contrast"}`}>
        <strong>
          {type === "success" ? (
            <CheckCircleIcon
              aria-hidden="true"
              className="secondary"
              width={24}
              height={24}
            />
          ) : (
            <XMarkIcon
              aria-hidden="true"
              className="contrast"
              width={24}
              height={24}
            />
          )}
          &nbsp;
          {message}
        </strong>
        <footer style={{textAlign:"end"}}>
          <button
            type="button"
            className="outline"
            aria-label="Close"
            onClick={() => store.notification.hide()}
          >
            Got it
          </button>
        </footer>
      </article>
    </div>
  );
}
