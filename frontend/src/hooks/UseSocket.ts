import { useEffect, useState } from "react";

// Update the WebSocket URL with the new IP address and port
const WS_URL = "ws://13.201.30.89";

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


//const WS_URL="ws://localhost:8080"