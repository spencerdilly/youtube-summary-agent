import type { ReactElement } from "react";

export const Toaster = (): ReactElement => (
  <div
    role="status"
    aria-live="assertive"
    style={{
      position: "fixed",
      bottom: "1rem",
      left: "1rem",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      background: "rgba(59, 130, 246, 0.85)",
      color: "white",
      fontSize: "0.875rem",
    }}
  >
    Sonner notifications active
  </div>
);

export default Toaster;
