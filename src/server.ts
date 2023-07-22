/// <reference lib="WebWorker"/>

export interface ServerGlobalScope extends DedicatedWorkerGlobalScope {
  onmessage<K extends keyof ServerEventMap>(): void;
}

export interface ServerEventMap {
  "render": RenderEvent;
}

export default class Server extends EventTarget {
  #worker = new Worker(`data:text/javascript,loop();${loop.toString()}`);

  constructor() {
    super();
    this.#worker.onmessage();
  }

  override addEventListener<K extends keyof ServerEventMap>(type: K, listener: (this: Server, event: ServerEventMap[K]) => void, options?: boolean | AddEventListenerOptions | undefined): void {
    super.addEventListener(type,listener,options);
  }

  onTick() {}
}

export class RenderEvent extends Event {}

function loop(this: ServerGlobalScope){
  this.onmessage
}

function interval(func: () => void, wait: number, times: number): void {
  const interv = function(w: number, t: number){
    return function(){
      if (typeof t === "undefined" || t-- > 0){
        setTimeout(interv,w);
        try {
          func.call(null);
        } catch(error: any){
          t = 0;
          throw error.toString();
        }
      }
    };
  }(wait,times);

  setTimeout(interv,wait);
}