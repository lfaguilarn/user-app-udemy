import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {
  @Input() usuarios: Usuario[] = [];
  @Output() idEvent: EventEmitter<number> = new EventEmitter();
  @Output() userEventEmitter: EventEmitter<Usuario> = new EventEmitter();
  
  eliminar(id: number){
    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "Si lo borras, despues no la peles",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminalo sin miedo",
      cancelButtonText: "No, no lo elimines",
    }).then((result) => {
      if (result.isConfirmed) {
        this.idEvent.emit(id);
        Swal.fire({
          title: "Eliminado",
          text: "Usario eliminado con exito",
          icon: "success"
        });
      }
    });
    // const confir = confirm('Esta seguro de eliminar?');
    // if(confir){
    //   this.idEvent.emit(id);
    // }
  }
  modificar(u: Usuario){
    this.userEventEmitter.emit(u);
  }
}
