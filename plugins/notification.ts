import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";

export default defineNuxtPlugin((nuxtApp) => {
  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7099/hubs/notification", {
      withCredentials: true,
      skipNegotiation: false,
      transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling
    })
    .configureLogging(LogLevel.Debug)
    .withAutomaticReconnect()
    .build();

  connection
    .start()
    .then(() => console.log("SignalR connected"))
    .catch((err) => console.error("SignalR error:", err));

  return { provide: { signalR: connection } };
});
