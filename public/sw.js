// Definisi tipe TypeScript (untuk referensi, browser membaca ini sebagai JS)
// self: ServiceWorkerGlobalScope

self.addEventListener("push", function (event) {
   let data = {};

   try {
      data = event.data ? event.data.json() : {};
   } catch (e) {
      console.error("Invalid push payload", e);
   }

   const title = data.title || "Notifikasi";

   const options = {
      // 1. Konten Dasar
      body: data.body || "",
      icon: data.icon || "/icons/icon-192x192.png", // Icon kotak di samping

      // 2. Hiasan Visual (Payload Baru)
      image: data.image || null,  // Hero Image (Gambar Besar)
      badge: data.badge || null,  // Icon kecil Monochrome (Status bar)

      // 3. Tombol Aksi
      actions: data.actions || [], // Array tombol [{action, title}, ...]

      // 4. Perilaku & Data
      data: data.data || {},
      vibrate: [200, 100, 200], // Getaran lebih kerasa: Bzzzt-diam-Bzzzt
      tag: 'reminder-task',     // Grouping agar tidak menumpuk banyak notif
      renotify: true,           // Getar lagi walaupun tag sama sudah tampil
      requireInteraction: true, // Notif tidak hilang otomatis (Desktop)
      dir: 'ltr'                // Arah teks
   };

   event.waitUntil(
      self.registration.showNotification(title, options)
   );
});

self.addEventListener("notificationclick", function (event) {
   event.notification.close();

   // Ambil URL dari payload data
   // Default ke root '/' jika tidak ada URL
   const urlToOpen = event.notification.data?.url || "/";

   // --- LOGIKA HANDLING TOMBOL AKSI ---
   if (event.action === 'mark-done') {
      console.log('User menekan tombol Selesai');
   }
   else if (event.action === 'view-task') {
      console.log('User menekan tombol Lihat Detail');
   }

   // --- LOGIKA NAVIGASI (Focus or Open) ---
   event.waitUntil(
      clients
         .matchAll({ type: "window", includeUncontrolled: true })
         .then((clientList) => {
            // 1. Cek apakah tab sudah terbuka dengan URL yang sama
            for (const client of clientList) {
               const clientUrl = new URL(client.url);
               const targetUrl = new URL(urlToOpen, self.location.origin);

               if (clientUrl.pathname === targetUrl.pathname && "focus" in client) {
                  return client.focus();
               }
            }

            // 2. Jika tidak ada tab terbuka, buka window baru
            if (clients.openWindow) {
               return clients.openWindow(urlToOpen);
            }
         })
   );
});