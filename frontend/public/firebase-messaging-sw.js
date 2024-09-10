self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,

    icon: "/icons/512140.png",
    tag: "140pay",
    data: e.data.json().data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  event.notification.close();

  const page = event.notification.data.page;
  let url;

  switch (page) {
    case "메인":
      url = "/main";
      break;
    case "결제":
      url = "/payment";
      break;
    case "자산":
      url = "/asset";
      break;
    case "전체":
      url = "/allmenu";
      break;
    default:
      url = "/main";
  }

  event.waitUntil(clients.openWindow(url));
});

self.addEventListener("message", function (event) {
  console.log("Received message from client:", event.data);
});
