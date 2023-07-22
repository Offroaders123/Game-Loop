import Server from "./server.js?worker";

declare var canvas: HTMLCanvasElement;

const ctx = canvas.getContext("2d")!;
document.body.append(ctx.toString());

main();

const server = new Server();
console.log(server);

console.log("send gg");
server.postMessage("gg");
server.onmessage = event => {
  console.log(event);
};

async function main(): Promise<void> {
  ctx.font = "20px monospace";
  ctx.fillStyle = "red";
  ctx.fillText("gg",0,10);
  requestAnimationFrame(main);
}

// https://www.thecodeship.com/web-development/alternative-to-javascript-evil-setinterval/
// https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
// https://stackoverflow.com/questions/30442896/server-side-implementation-of-requestanimationframe-in-nodejs