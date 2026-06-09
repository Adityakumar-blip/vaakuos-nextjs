/* ----------------------------------------------------------------
   Google Identity Services (GSI) loader — ported from the original
   VaakuOS landing app. Loads the SDK once, initializes the One Tap /
   button flow with a credential callback, and renders the button.
----------------------------------------------------------------- */

export const loadGoogleSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Google SDK can only load in the browser"));
      return;
    }
    if (window.google) {
      resolve();
      return;
    }

    const existing = document.getElementById("google-gsi-client") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", (err) => reject(err));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-gsi-client";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
};

export const initializeGoogleLogin = (
  clientId: string,
  callback: (response: { credential: string }) => void,
) => {
  if (!window.google) {
    console.error("Google SDK not loaded");
    return;
  }

  window.google.accounts.id.initialize({
    client_id: clientId,
    callback,
  });
};

export const renderGoogleButton = (
  container: HTMLElement,
  options: Record<string, unknown> = { theme: "outline", size: "large", text: "continue_with" },
) => {
  if (!window.google) {
    console.error("Google SDK not loaded");
    return;
  }
  window.google.accounts.id.renderButton(container, options);
};

declare global {
  interface Window {
    google: any;
  }
}
