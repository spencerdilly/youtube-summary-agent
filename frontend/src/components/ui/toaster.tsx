import type { ReactElement } from "react";

export const Toaster = (): ReactElement => (
  <div
    role="status"
    aria-live="polite"
    style={{
      position: "fixed",
      bottom: "1rem",
      right: "1rem",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      background: "rgba(0, 0, 0, 0.65)",
      color: "white",
      fontSize: "0.875rem",
    }}
  >
    Ready to toast messages
  </div>
);
