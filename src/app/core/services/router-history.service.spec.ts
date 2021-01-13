import { TestBed } from '@angular/core/testing';

import { RouterHistoryService } from './router-history.service';

describe('RouterHistoryService', () => {
  function setup() {
    const routerSpy = jasmine.createSpyObj("routerSpy", [
      "hasVisited",
    ]);
    const routerHistoryService = new RouterHistoryService(routerSpy);
    return { routerSpy, RouterHistoryService}
  }
});
