import Server from "./server.js?worker";

import type { Message, MessageSender } from "./server.js";

declare var canvas: HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

new ResizeObserver(() => {
  const { offsetWidth, offsetHeight } = canvas;
  canvas.width = offsetWidth;
  canvas.height = offsetHeight;
  ctx.imageSmoothingEnabled = false;
  render();
}).observe(canvas);

const server: Worker & { postMessage: (message: Message) => void; onmessage: MessageSender; } = new Server();
console.log(server);

server.postMessage("start" satisfies Message);
server.onmessage = (event: MessageEvent<Message>) => {
  if (event.data === "start") console.log(event);
  switch (event.data){
    case "render": render(); break;
  }
};

function render() {
  const { width, height } = canvas;
  // Reset for next frame
  ctx.clearRect(0,0,width,height);

  ctx.font = "40px monospace";
  ctx.textBaseline = "top";
  ctx.fillStyle = "red";
  ctx.fillText(`${Math.random()}`,0,0);
}

// https://www.thecodeship.com/web-development/alternative-to-javascript-evil-setinterval/
// https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
// https://stackoverflow.com/questions/30442896/server-side-implementation-of-requestanimationframe-in-nodejs