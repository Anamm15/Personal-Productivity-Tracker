import api from "@/lib/api";

const SUBSCRIPTION_KEY = process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY!;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export async function subscribePush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const isSynced = localStorage.getItem(SUBSCRIPTION_KEY);
  if (isSynced) {
    return;
  }

  // Setup Service Worker & Subscription
  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
  }

  try {
    await api.post("/subscribe", subscription);
    localStorage.setItem(SUBSCRIPTION_KEY, "true");

    console.log("Push notification subscribed successfully.");
  } catch (error) {
    console.error("Failed to sync push subscription:", error);
  }
}
