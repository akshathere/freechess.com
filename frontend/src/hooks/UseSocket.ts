import { useEffect, useState } from "react";
// Connect to WebSocket server
const token = localStorage.getItem("token");
// const ws_local="ws://localhost:8080"
const ws_prod="wss://superficial-kindhearted-sense.glitch.me"
const WS_URL = (`${ws_prod}/?token=${token}`);

export default function useSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    // Cleanup when the component is unmounted
    return () => {
      ws.close();
    };
  }, []);

  return socket;
}