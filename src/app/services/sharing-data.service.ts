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
  constructor() { }

  get usuarioEmit(): EventEmitter<Usuario>{
    return this._usuarioEmit;
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
}
