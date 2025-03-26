import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usuarios: Usuario[]=[];
  private url: string = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { }

  finAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }
  finAllPageable(page: number): Observable<any>{
    return this.http.get<any>(`${this.url}/page/${page}`);
  }
  findById(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }
  update(user: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.url}/${user.id}`, user);
  }
  create(user: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url, user);
  }
  delete(id: number):Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
