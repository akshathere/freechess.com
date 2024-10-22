"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const gamemanager_1 = require("./gamemanager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gamemanager = new gamemanager_1.GameManager();
const auth_1 = require("./auth");
// Function to parse cookies from the request header
function parseCookies(cookieHeader) {
    const cookies = {};
    if (!cookieHeader)
        return cookies;
    cookieHeader.split(';').forEach((cookie) => {
        const [name, value] = cookie.split('=');
        //@ts-ignore
        cookies[name.trim()] = decodeURIComponent(value);
    });
    return cookies;
}
wss.on('connection', function connection(ws, req) {
    //@ts-ignore
    console.log(req.body);
    const cookieHeader = req.headers.cookie;
    const cookies = parseCookies(cookieHeader);
    // Extract the token cookie
    //@ts-ignore
    const token = cookies.token;
    // Extract authenticated user from the token
    const user = (0, auth_1.extractAuthUser)(token); // Use the token as before
    console.log(user);
    gamemanager.addUser(ws);
    ws.on("disconnect", () => gamemanager.removeUser(ws));
});
