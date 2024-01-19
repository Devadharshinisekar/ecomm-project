import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
invalidUserAuth=new EventEmitter<boolean>(false)
private apiUrl = environment.apiUrl;//'http://localhost:5039/api/Users';
  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(user:signUp){
    this.http.post('http://localhost:3000/users',user,{observe:'response'}).subscribe((result)=>{

      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    })

  }
  userLogin(data:login){
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false)
      }else{
          this.invalidUserAuth.emit(true)
      }
    })
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
  // login(email: string, password: string): Observable<any> {
  //   return this.http.post<any>(`this.http://localhost:5039/api/Users/login`, { email, password });
  // }
  // saveToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }
  // login(email: string, password: string): Observable&lt;any&gt; {
  //   const body = { email, password };
  //   return this.http.post(`${this.apiUrl}/login`, body);
  // }


}
