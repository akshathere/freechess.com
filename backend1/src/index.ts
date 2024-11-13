import { WebSocketServer } from 'ws'
import { GameManager } from './gamemanager';

const wss = new WebSocketServer({ port: 8080 });
const gamemanager=new GameManager();
import { extractAuthUser } from './auth';

// Function to parse cookies from the request header
function parseCookies(cookieHeader :any) {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(';').forEach((cookie :any) => {
      const [name, value] = cookie.split('=');
      //@ts-ignore
      cookies[name.trim()] = decodeURIComponent(value);
  });
  return cookies;
}
wss.on('connection', function connection(ws,req) {
  //@ts-ignore
  console.log(req.body);
  const url = req.url ?? '';
  const token = new URLSearchParams(url.split('?')[1]).get('token') ?? '';
        // Extract authenticated user from the token
  const user = extractAuthUser(token); // Use the token as before
  console.log(user)
  gamemanager.addUser(ws)
  ws.on("disconnect",()=>gamemanager.removeUser(ws))
});