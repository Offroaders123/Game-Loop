/// <reference lib="WebWorker"/>

declare var self: DedicatedWorkerGlobalScope;

self.onmessage = event => {
  console.log(event);
  self.postMessage("received!");
};

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