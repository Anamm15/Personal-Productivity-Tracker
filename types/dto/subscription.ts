export type subscribeRequest = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};
