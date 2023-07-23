/// <reference lib="WebWorker"/>

export type Message = "start" | "render";
export type MessageSender = ((this: Worker, ev: MessageEvent<Message>) => void) | null;

declare var self: DedicatedWorkerGlobalScope;

class GameLoop extends EventTarget {
  #running: boolean = false;

  constructor() {
    super();
    this.addEventListener("game-tick",(event: GameTickEvent) => this.ontick?.(event));
  }

  declare ontick: ((event: GameTickEvent) => void) | null;

  start(): void {
    this.#running = true;
    this.#loop();
  }

  #loop(): void {
    this.dispatchEvent(new GameTickEvent());
    console.log("tick");
    if (this.#running === false) return;
    setTimeout(() => this.#loop(),1000 / 60);
  }

  stop(): void {
    this.#running = false;
  }
}

class GameTickEvent extends Event {
  constructor() {
    super("game-tick");
  }
}

const gameLoop = new GameLoop();

self.onmessage = (event: { data: Message }) => {
  console.log(event.data);
  self.postMessage("start" satisfies Message);
  switch (event.data){
    case "start": {
      gameLoop.ontick = (event) => {
        self.postMessage("render" satisfies Message);
      };
      gameLoop.start();
      break;
    }
  }
};
