import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, loginSuccess, logout } from '../store/auth/auth.action';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private url: string = 'http://localhost:8080/login';
  private url: string = `${BACKEND_URL}/login`;
  
  // private _token: string | undefined;

  private _user: any
  //  = {
  //   isAuth: false,
  //   isAdmin: false,
  //   user: undefined
  // }
  
  constructor(
    private store: Store<{auth: any}>,
    private http: HttpClient) { 
      this.store.select('auth').subscribe(state=>{
        this._user = state;
      })
    }

  loginUser({username, password}: any): Observable<any>{
    return this.http.post<any>(this.url, {username, password})
  }

  set user(user:any){
    // this._user = user;
    // this.store.dispatch(loginSuccess({login:this._user}));
    sessionStorage.setItem('login', JSON.stringify(user));
  }
  
  get user(){
    /* if(this._user.isAuth){
      return this._user;
    }else if(sessionStorage.getItem('login')!=null){
      this._user = JSON.parse(sessionStorage.getItem('login')|| '{}');
      return this._user;
    } */
    return this._user;
  }
  
  set token(token:any){
    // this._token = token;
    sessionStorage.setItem('token', token);
  }

  get token(){
    /* if(this._token!=undefined){
      return this._token;
    }else if(sessionStorage.getItem('token')!=null){
      this._token  = sessionStorage.getItem('token')||'';
      return this._token;
    }
    return this._token; */
    return sessionStorage.getItem('token');
  }

  getPayload(token: string){
    if(token!=null){
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }

  isAdmin(){
    return this.user.isAdmin;
  }

  isAuthentication(){
    return this.user.isAuth;
  }
  
  logout(){
    /* this._token = undefined;
    this._user = {
      isAuth: false,
      isAdmin: false,
      user: undefined
    }; */
    this.store.dispatch(logout());
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
  }
}
