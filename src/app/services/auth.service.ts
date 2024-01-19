import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SignUpData, LoginData } from '../data-type';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;//'http://localhost:5285';
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  private currentUserSubject: BehaviorSubject<any | null>;
  private currentSellerSubject: BehaviorSubject<any | null>;
  public currentUser: Observable<any | null>;
  public currentSeller: Observable<any | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any | null>(this.getUserFromLocalStorage('user'));
    this.currentSellerSubject = new BehaviorSubject<any | null>(this.getUserFromLocalStorage('seller'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentSeller = this.currentSellerSubject.asObservable();
  }

  public get currentUserValue(): any | null {
    return this.currentUserSubject.value;
  }

  public get currentSellerValue(): any | null {
    return this.currentSellerSubject.value;
  }

  private getUserFromLocalStorage(key: string): any | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  private updateUserInLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  signup(data: SignUpData, userType: string) {
    return this.http.post<any>(`${this.baseUrl}/Authentication`, data).pipe(
      map(user => {
        // Store user details and JWT token in local storage
        const key = userType === 'seller' ? 'seller' : 'user';
        const userData = { token: user.token, name: user.name, id: user.id };
        this.updateUserInLocalStorage(key, userData);

        if (userType === 'seller') {
          this.currentSellerSubject.next(userData);
        } else {
          this.currentUserSubject.next(userData);
        }

        return user;
      })
    );
  }

  login(data: LoginData, userType: string) {
    return this.http.post<any>(`${this.baseUrl}/Authentication/login`, data).pipe(
      map(user => {
        // Store user details and JWT token in local storage
        const key = userType === 'seller' ? 'seller' : 'user';
        const userData = { token: user.token, name: user.name, id: user.id };
        this.updateUserInLocalStorage(key, userData);

        if (userType === 'seller') {
          this.currentSellerSubject.next(userData);
        } else {
          this.currentUserSubject.next(userData);
        }

        return user;
      })
    );
  }

  logout(userType: string) {
    // Remove user details and JWT token from local storage
    const key = userType === 'seller' ? 'seller' : 'user';
    localStorage.removeItem(key);

    if (userType === 'seller') {
      this.currentSellerSubject.next(null);
    } else {
      this.currentUserSubject.next(null);
    }

    this.router.navigate(['/auth']);
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
}// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Router } from '@angular/router';
// import {JwtHelperService} from '@auth0/angular-jwt';
// //import { StorageService } from 'ngx-webstorage-service';
// //import {LocalStrora}
// import { TokenApiModel } from '../models/token-api.model';
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private baseUrl: string = 'https://localhost:7058/api/User/';
//   private User:[]|undefined;
//   private userPayload:any;
//   private Id:number|undefined;
//   constructor(private http: HttpClient, private router: Router) {
//     this.userPayload = this.decodedToken();
//    }

//   signUp(userObj: any) {
//     return this.http.post<any>(`${this.baseUrl}register`, userObj)
//   }

//   signIn(loginObj : any){
//     //let user=localStorage.getItem
//     // const User=this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
//     // this.localStorage.setItem(this.User);
//     return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);


//   }
//   userData(){
//     //this.signIn();
//   }
//   signOut(){
//     localStorage.clear();
//     this.router.navigate(['app-login'])
//   }

//   storeToken(tokenValue: string){
//     localStorage.setItem('token', tokenValue)
//   }
//   storeRefreshToken(tokenValue: string){
//     localStorage.setItem('refreshToken', tokenValue)
//   }

//   getToken(){
//     return localStorage.getItem('token')
//   }
//   getRefreshToken(){
//     return localStorage.getItem('refreshToken')
//   }
//   logout() {
//     // Clear the token from local storage or perform any necessary logout actions
//     localStorage.removeItem('token'); // Example: Remove the token from local storage
//   }
//   isLoggedIn(): boolean{
//     return !!localStorage.getItem('token')
//   }
//   // getIdFromToken(): number | null {
//   //   const id = localStorage.getItem('Id');
//   //   return id ? parseInt(id, 10) : null;
//   // }
//   getIdFromToken(): number | null {
//     const userPayload = this.decodedToken();
//     const id = this.userPayload?.Id;
//     return id ? parseInt(id, 10) : null;
//   }
//   // decodedToken(){
//   //   const jwtHelper = new JwtHelperService();
//   //   const token = this.getToken()!;
//   //   console.log(jwtHelper.decodeToken(token))
//   //   return jwtHelper.decodeToken(token)
//   // }
//   decodedToken() {
//     const jwtHelper = new JwtHelperService();
//     const token = this.getToken();
//     if (token) {
//       return jwtHelper.decodeToken(token);
//     }
//     return null;
//   }

//   getfullNameFromToken(){
//     if(this.userPayload)
//     return this.userPayload.name;
//   }

//   getRoleFromToken(){
//     if(this.userPayload)
//     return this.userPayload.role;
//   }

//   renewToken(tokenApi : TokenApiModel){
//     return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
//   }
//   private getAuthHeaders(): HttpHeaders {
//     const token = this.getToken();
//     if (token) {
//       return new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     }
//     return new HttpHeaders();
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from "@angular/common/http";
// import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { TokenApiModel } from '../models/token-api.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseUrl: string = 'https://localhost:7058/api/User/';
//   private userPayload: any;

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private jwtHelper: JwtHelperService
//   ) {
//     this.userPayload = this.decodedToken();
//   }

//   signUp(userObj: any) {
//     return this.http.post<any>(`${this.baseUrl}register`, userObj);
//   }

//   signIn(loginObj: any) {
//     return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
//   }

//   signOut() {
//     localStorage.clear();
//     this.router.navigate(['login']);
//   }

//   storeToken(tokenValue: string) {
//     localStorage.setItem('token', tokenValue);
//   }

//   storeRefreshToken(tokenValue: string) {
//     localStorage.setItem('refreshToken', tokenValue);
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }

//   getRefreshToken() {
//     return localStorage.getItem('refreshToken');
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   getIdFromToken(): any {
//     return localStorage.getItem('Id');
//   }

//   decodedToken(): any {
//     const token = this.getToken();
//     if (token) {
//       return this.jwtHelper.decodeToken(token);
//     }
//     return null;
//   }

//   getFullNameFromToken(): string | null {
//     if (this.userPayload) {
//       return this.userPayload.name;
//     }
//     return null;
//   }

//   getRoleFromToken(): string | null {
//     if (this.userPayload) {
//       return this.userPayload.role;
//     }
//     return null;
//   }

//   renewToken(tokenApi: TokenApiModel) {
//     return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi);
//   }
// }
