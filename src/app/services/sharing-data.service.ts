import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  private _usuarioEmit:EventEmitter<Usuario>= new EventEmitter();
  private _idEvent: EventEmitter<number> = new EventEmitter();
  private _buscarUsuarioPorId = new EventEmitter();
  private _usuarioSeleccionadoEditar = new EventEmitter();
  private _errorsUserFormEmitter = new EventEmitter();
  private _pageUserEmitter = new EventEmitter();
  constructor() { }

  get usuarioEmit(): EventEmitter<Usuario>{
    return this._usuarioEmit;
  }
  get pageUserEmitter(){
    return this._pageUserEmitter;
  }
  get idEvent(): EventEmitter<number>{
    return this._idEvent;
  }
  get buscarUsuarioPorId(){
    return this._buscarUsuarioPorId;
  } 
  get usuarioSeleccionadoEditar(){
    return this._usuarioSeleccionadoEditar;
  }
  get errorsUserFormEmitter(){
      return this._errorsUserFormEmitter;
  }
}
