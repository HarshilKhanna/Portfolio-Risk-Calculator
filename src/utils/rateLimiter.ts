class RateLimiter {
    private queue: Array<() => Promise<any>> = [];
    private processing = false;
    private lastCallTime = 0;
    private callsThisMinute = 0;
    private readonly MAX_CALLS_PER_MINUTE = 5;
    private readonly MINUTE = 60000; // 60000 milliseconds = 1 minute
  
    async enqueue<T>(apiCall: () => Promise<T>): Promise<T> {
      return new Promise((resolve, reject) => {
        this.queue.push(async () => {
          try {
            const result = await apiCall();
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
  
        if (!this.processing) {
          this.processQueue();
        }
      });
    }
  
    private async processQueue() {
      if (this.queue.length === 0) {
        this.processing = false;
        return;
      }
  
      this.processing = true;
  
      const now = Date.now();
      if (now - this.lastCallTime >= this.MINUTE) {
        // Reset counter after a minute
        this.callsThisMinute = 0;
        this.lastCallTime = now;
      }
  
      if (this.callsThisMinute >= this.MAX_CALLS_PER_MINUTE) {
        // Wait until next minute
        const waitTime = this.MINUTE - (now - this.lastCallTime);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        this.callsThisMinute = 0;
        this.lastCallTime = Date.now();
      }
  
      const nextCall = this.queue.shift();
      if (nextCall) {
        this.callsThisMinute++;
        await nextCall();
      }
  
      // Process next item in queue
      this.processQueue();
    }
  }
  
  export const rateLimiter = new RateLimiter();