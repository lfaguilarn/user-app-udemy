import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent {
  usuarios: Usuario[] = [];
  title:string='Listado de usuarios';
  constructor(private service: UserService,
    private router:Router,
    private sharingData: SharingDataService
  ){
    if(this.router.getCurrentNavigation()?.extras.state){
      this.usuarios=this.router.getCurrentNavigation()?.extras.state!['usuarios'];
    }else{
      this.service.finAll().subscribe(usuarios=>this.usuarios = usuarios);
    }
  }
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
        this.sharingData.idEvent.emit(id);
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
    // this.sharingData.userEventEmitter.emit(u);
    this.router.navigate(['/user/edit', u.id],{state:{u}});
  }
}
