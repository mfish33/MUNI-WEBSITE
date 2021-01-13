import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
  /*let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });*/

  function setup() {
    const afAuthSpy = jasmine.createSpyObj("afAuthSpy", ["authState"]);
    const afsSpy = jasmine.createSpyObj("afsSpy", ["collection"]);
    const historySpy = jasmine.createSpyObj("historySpy", ["getHistory"]);
    const routerSpy = jasmine.createSpyObj("routerSpy", ["navigateByURL"]);
    const httpSpy = jasmine.createSpyObj("httpSpy", ["post"]);
    const stubObservable = new Observable<firebase.User>();
    const authService = new AuthService(
      afAuthSpy,
      afsSpy,
      historySpy,
      routerSpy,
      httpSpy
    );

    afAuthSpy.authState(stubObservable);
    return {
      authService,
      stubObservable,
      afAuthSpy,
      afsSpy,
      historySpy,
      routerSpy,
      httpSpy,
    };
  }

  it("should ask for user once", () => {
    const {
      authService,
      stubObservable,
      afAuthSpy,
      afsSpy,
      historySpy,
      routerSpy,
      httpSpy,
    } = setup();

    expect(afAuthSpy.authState.calls.count()).toBe(
      1,
      "spy method was called once"
    );
  });
});
