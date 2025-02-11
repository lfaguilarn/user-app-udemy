import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usuarios: Usuario[]=[
    {
    id:1,
    name:'Andres',
    lastname: 'Guzman',
    email: 'andresg@gmail.com',
    nickname: 'andres',
    password: '12345',
    },
    {
    id:2,
    name:'Josefa',
    lastname: 'Ponce',
    email: 'josefap@gmail.com',
    nickname: 'josefa',
    password: '12345',
    },
    {
    id:3,
    name:'Maria',
    lastname: 'Rodriguez',
    email: 'mariar@gmail.com',
    nickname: 'maria',
    password: '12345',
    },
]
  constructor() { }
  finAll(): Observable<Usuario[]>{
    return of(this.usuarios);
  }
}
