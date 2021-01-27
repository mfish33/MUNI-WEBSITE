import { TestBed } from "@angular/core/testing";
import { userInfo } from "os";
import { Observable, Subscriber } from "rxjs";

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
    const stubObservable = new Observable<firebase.User>((subscriber) =>
      subscriber.next(stubUser)
    );
    const afAuthSpy = jasmine.createSpyObj("afAuthSpy", [
      "authState",
      "signInWithPopup",
      "signOut",
      "signInWithEmailAndPassword"
    ]);
    const afsSpy = jasmine.createSpyObj("afsSpy", ["collection"]);
    const historySpy = jasmine.createSpyObj("historySpy", ["getHistory"]);
    const routerSpy = jasmine.createSpyObj("routerSpy", ["navigateByURL"]);
    const httpSpy = jasmine.createSpyObj("httpSpy", ["post"]);
    const stubUser: firebase.User = JSON.parse(
      `{"uid":"copmb8MWsEVA0NWhb6ncLigvTSn2","displayName":"Kyle McRae","photoURL":"https://lh3.googleusercontent.com/a-/AOh14GiuM5pFEPES-lekTGZ5-MxCaW5udBDrPt-ttUCvGw=s96-c","email":"kyle.mcrae1@gmail.com","emailVerified":true,"phoneNumber":null,"isAnonymous":false,"tenantId":null,"providerData":[{"uid":"102883099651157402642","displayName":"Kyle McRae","photoURL":"https://lh3.googleusercontent.com/a-/AOh14Giqo84lWXuaSviRMJFeI4Fn83CDnJ6etX9kLIZMdg=s96-c","email":"kyle.mcrae1@gmail.com","phoneNumber":null,"providerId":"google.com"}],"apiKey":"AIzaSyBnyiMSx5HHB5o9r30_3xKCmqp4H0A8RCM","appName":"[DEFAULT]","authDomain":"ripe-website-40a9a.firebaseapp.com","stsTokenManager":{"apiKey":"AIzaSyBnyiMSx5HHB5o9r30_3xKCmqp4H0A8RCM","refreshToken":"AOvuKvQxpPXoNephHk01ikl27icfMrglXDsXG4SL-nOYfKWVf2h3NF8Q0H6KRyttqabqY2yUDG6yhIHxMrb-ok1QWax8if2hlqZnipU5AaYdQQ5cUabGTAECcZbs3yr6qSTWkqiM7u6ohfw8Ag-7d-rZwBDTXmExopOqT6M5_6_LLpq1Iq-1Y3QkkYEzD8_8X6svn6roFaQIp7y-HJzlGVgs9dURltTK_IUV0ysz_Md-Dq67H9f94Tttj5Qy1aTK2MJiMOD95CwUH9wNNFQ9-UXTIehP5skXybW80t9jlQ18jG1-cqzF9l61RzzqLsNBO5QsPsWOPJUXdC-LYLODLLm3zEW-J_7EzkV32MJgYMbeCdWqyGmpVGB7H-SovVyIevnGHoUj5pLAn2yECNlOX_geg4RCsQXABSnygYkncCGg1ql-eq9S16E","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmOTcxMmEwODczMTcyMGQ2NmZkNGEyYTU5MmU0ZGZjMmI1ZGU1OTUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiS3lsZSBNY1JhZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaXVNNXBGRVBFUy1sZWtUR1o1LU14Q2FXNXVkQkRyUHQtdHRVQ3ZHdz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9yaXBlLXdlYnNpdGUtNDBhOWEiLCJhdWQiOiJyaXBlLXdlYnNpdGUtNDBhOWEiLCJhdXRoX3RpbWUiOjE2MTA2NTI2NzAsInVzZXJfaWQiOiJjb3BtYjhNV3NFVkEwTldoYjZuY0xpZ3ZUU24yIiwic3ViIjoiY29wbWI4TVdzRVZBME5XaGI2bmNMaWd2VFNuMiIsImlhdCI6MTYxMDY1MjY3MCwiZXhwIjoxNjEwNjU2MjcwLCJlbWFpbCI6Imt5bGUubWNyYWUxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyODgzMDk5NjUxMTU3NDAyNjQyIl0sImVtYWlsIjpbImt5bGUubWNyYWUxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.L_Br63dGuSh2gsL2uklgVvvWhBzzZ92uDhAgaWOULUVz8z_HT8hDTkk_8xajxCfo_Oc0z6CIUNMxRW9ykgBQ3-TQQgr8zNXH101cWYsXhn6iMPnbntzNbcBy1PsBcE6WPGssX0mowF6wmSMa41VkG_vS45HkToMFDcbG_28v9GLdryLXf9XXFrf2dIn0ANOmrXOYZcTZYmY-_f722rTdj_KPZBAJQOKTM6G8z0QukzwwQ8B-a15d2vBS3aqPT0RuDV-0jii5sEC9HOIbw3-PZsX_mMoclVYprbMTpE6BK5URTwDoogb66cnr1JBSyrUoTMoUhyn2NSh3WD9BlkAo9g","expirationTime":1610656270000},"redirectEventId":null,"lastLoginAt":"1610652670330","createdAt":"1604098457893","multiFactor":{"enrolledFactors":[]}}`
    );
    const stubUserCred: firebase.auth.UserCredential = JSON.parse(
      `{"credential":{"providerId":"google.com","signInMethod":"google.com","oauthIdToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYTFiMWY0MjgwN2E4Y2MxMzZhMDNhM2MxNmQyOWRiODI5NmRhZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjE1MDEzMDUyNzEzLTZuODduYWQwM2dtZjZsZjIxMmFlcHJsanVzaGhybXR0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjE1MDEzMDUyNzEzLTZuODduYWQwM2dtZjZsZjIxMmFlcHJsanVzaGhybXR0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyODgzMDk5NjUxMTU3NDAyNjQyIiwiZW1haWwiOiJreWxlLm1jcmFlMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjI3RE5mZTFaNXdaTzhEbnpnMVR5VWciLCJpYXQiOjE2MTE2MTE5MjcsImV4cCI6MTYxMTYxNTUyN30.yxZArI6TERvD2w_waYYwZnbdezoYDPWnoHF_9dIAHTBX3mqVXxAzoxcwnXJtv7qUyj3OAD60DRwRqyRo_FHYHY7WxCFFFvxidv7TCRzPaWFOnGBAWH8XGN6PAilI_3i_J-zW5G76BLUCn0gjrVXm4ElHRL_4DCzPD0AFbB1qXztSGsJYWRn0LI6DS2PGHUkmyFAlxx086HzSm3YS1PBEd-n3wbzcL3jIYHRv3SZRiCbdYCQT6UY693n1spGj0mpmteplfbkKaPhODpJUZg_cJH72Pyl3WO9IhHKS_qHOJ5uXqBb1w6e4RmGW7OLrLYLhF4qwcnQCxEE4w8nzI1taTA","oauthAccessToken":"ya29.a0AfH6SMCsv5xZLo5bD16GaafZF61huWgynoSaYeTqpnHNhK1p8Xxqsn1LCPCi_TS6dapujh2IDAebwP_aZPmwhC7PBA9UIy8jMfBhVSKoIitP2qFF7ziG6wEeInn4-5Oa7c4-sTHfDqhq1AS0lnpOY6fVCRKL8VPyy8q95pJLbE-bmw"},"additionalUserInfo":{"providerId":"google.com","isNewUser":false,"profile":{"name":"Kyle McRae","granted_scopes":"openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email","id":"102883099651157402642","verified_email":true,"given_name":"Kyle","locale":"en","family_name":"McRae","email":"kyle.mcrae1@gmail.com","picture":"https://lh3.googleusercontent.com/a-/AOh14Giqo84lWXuaSviRMJFeI4Fn83CDnJ6etX9kLIZMdg=s96-c"}},"operationType":"signIn"}`
    );
    stubUserCred["user"] = stubUser;
    const authService = new AuthService(
      afAuthSpy,
      afsSpy,
      historySpy,
      routerSpy,
      httpSpy
    );
    afAuthSpy.authState.and.returnValue(stubObservable);
    return {
      authService,
      stubObservable,
      stubUser,
      stubUserCred,
      afAuthSpy,
      afsSpy,
      historySpy,
      routerSpy,
      httpSpy,
    };
  }

  /*it("should get the user", () => {
    const {
      authService,
      stubObservable,
      stubUser,
      afAuthSpy,
      afsSpy,
      historySpy,
      routerSpy,
      httpSpy,
    } = setup();
    console.log(authService.user$)
    expect(authService.user$).toEqual(stubObservable, 'auth service returns observable')
    authService.user$.subscribe(user => {
      expect(user).toBe(stubUser, 'observable returned user')
    })
    expect(stubObservable).toBeTruthy()
  });*/

  it("should sign in with google properly", async () => {
    const {
      authService,
      stubObservable,
      stubUser,
      stubUserCred,
      afAuthSpy,
      afsSpy,
      historySpy,
      routerSpy,
      httpSpy,
    } = setup();
    const stubPromise = new Promise<firebase.auth.UserCredential>(
      (resolve, reject) => {
        resolve(stubUserCred);
      }
    );
    afAuthSpy.signInWithPopup.and.returnValue(stubPromise);
    let userCred = await authService.signInGoogle();
    expect(userCred).toBe(stubUserCred);
    expect(afAuthSpy.signInWithPopup.calls.count()).toBe(1);
    expect(afAuthSpy.signInWithPopup.calls.mostRecent().returnValue).toBe(stubPromise);
  });

  it("should sign in with facebook properly", async () => {
    const {
      authService,
      stubObservable,
      stubUser,
      stubUserCred,
      afAuthSpy,
      afsSpy,
      historySpy,
      routerSpy,
      httpSpy,
    } = setup();
    const stubPromise = new Promise<firebase.auth.UserCredential>(
      (resolve, reject) => {
        resolve(stubUserCred);
      }
    );
    afAuthSpy.signInWithPopup.and.returnValue(stubPromise);
    let userCred = await authService.signInFacebook();
    expect(userCred).toBe(stubUserCred);
    expect(afAuthSpy.signInWithPopup.calls.count()).toBe(1);
    expect(afAuthSpy.signInWithPopup.calls.mostRecent().returnValue).toBe(stubPromise);
  });

  
  it("should sign out properly", () => {
    const {
      authService,
      stubObservable,
      stubUser,
      stubUserCred,
      afAuthSpy,
      afsSpy,
      historySpy,
      routerSpy,
      httpSpy,
    } = setup();
    authService.signOut()
    expect(afAuthSpy.signOut.calls.count()).toBe(1);
  });
  
  it("should sign in with email properly", async () => {
    const {
      authService,
      stubObservable,
      stubUser,
      stubUserCred,
      afAuthSpy,
      afsSpy,
      historySpy,
      routerSpy,
      httpSpy,
    } = setup();
    const stubPromise = new Promise<firebase.auth.UserCredential>(
      (resolve, reject) => {
        resolve(stubUserCred);
      }
    );
    afAuthSpy.signInWithEmailAndPassword.and.returnValue(stubPromise);

    let userCred = await authService.signInEmail('', '');
    expect(userCred).toBe(stubUserCred);
    expect(afAuthSpy.signInWithEmailAndPassword.calls.count()).toBe(1);
    expect(afAuthSpy.signInWithEmailAndPassword.calls.mostRecent().returnValue).toBe(stubPromise);
    expect(afAuthSpy.signOut.calls.count()).toBe(0);  
  });

  it("should sign out with unverified email properly", async () => {
    const {
      authService,
      stubObservable,
      stubUser,
      stubUserCred,
      afAuthSpy,
      afsSpy,
      historySpy,
      routerSpy,
      httpSpy,
    } = setup();
    stubUser["emailVerified"] = false;
    const stubPromise = new Promise<firebase.auth.UserCredential>(
      (resolve, reject) => {
        resolve(stubUserCred);
      }
    );
    afAuthSpy.signInWithEmailAndPassword.and.returnValue(stubPromise);
    try{
      let userCred = await authService.signInEmail('', '');
    }catch(e){
      expect(e).toEqual('Please verify your email')
    }
    expect(afAuthSpy.signInWithEmailAndPassword.calls.count()).toBe(1);
    expect(afAuthSpy.signOut.calls.count()).toBe(1);  
  });


});
