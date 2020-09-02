import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class RouterHistoryService {

  private readonly HISTORY_SIZE = 5
  private writeHead = 0;
  private history:(string | undefined)[] = new Array(this.HISTORY_SIZE)

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.history[this.writeHead] = event.url
        this.writeHead = (this.writeHead + 1) % this.HISTORY_SIZE        
      };
    });
  }

  /**
   * @returns array of string urls from most recent to oldest
   */
  public getHistory(): string[] {
    let histFiltered = this.history.filter(s => s)
    if(histFiltered.length < this.HISTORY_SIZE) {
      return histFiltered.reverse()
    }
    let out:string[] = []
    let iter = this.writeHead
    while(out[0] != this.history[iter]) {
      out.push(this.history[iter])
      iter = (iter + 1) % this.HISTORY_SIZE  
    }
    return out.reverse()
  }    
}