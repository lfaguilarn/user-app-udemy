import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { state } from '@angular/animations';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterModule],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {
  title:string='Listado de usuarios';
  usuarios: Usuario[]=[];
  constructor(
    private service:UserService,
    private sharingData: SharingDataService,
    private router:Router
  ){
  }
  ngOnInit(): void {
    this.service.finAll().subscribe(usuarios => this.usuarios = usuarios);
    this.addUsuario();
    this.eliminar();
    this.buscarUsuarioPorId();
  }
  addUsuario(){
    this.sharingData.usuarioEmit.subscribe(usuario=>{
      if(usuario.id > 0){
        this.service.update(usuario).subscribe(
          {
            next: (userUpdated) =>{
              this.usuarios = this.usuarios.map(u => (u.id == userUpdated.id)? {... userUpdated}: u);
              this.router.navigate(['/user'], {state: {usuarios: this.usuarios}}  );
              Swal.fire({
                title: "Notificación",
                text: "Usuario modificado con éxito",
                icon: "success"
              });
            },
            error: (err)=>{
              // console.log(err.error);
              if(err.status==400){
                this.sharingData.errorsUserFormEmitter.emit(err.error);
              }
            }
          }
        );
          
          // this.router.navigate(['/user']  );
      }else{
        // usuario.id = this.usuarios.length+1;
        this.service.create(usuario).subscribe({
          next: userNew => {
          this.usuarios = [...this.usuarios, { ...userNew }];
          this.router.navigate(['/user'], {state: {usuarios: this.usuarios}}  );
          Swal.fire({
            title: "Notificación",
            text: "Usuario agregado con éxito",
            icon: "success"
          });
        },
        error:(err)=>{
          // console.log(err.error);
          if(err.status == 400){
            this.sharingData.errorsUserFormEmitter.emit(err.error);
          }
        }
        });
      }
      // this.router.navigate(['/user'], {state: {usuarios: this.usuarios}});
      // this.router.navigate(['/user']  );
    }); 
  }
  eliminar(){
    this.sharingData.idEvent.subscribe(id =>{
      this.service.delete(id).subscribe(() =>{
        this.usuarios = this.usuarios.filter(usuario => usuario.id!=id);
        this.router.navigate(['user/create'],{skipLocationChange:true}).then(()=>{
          this.router.navigate(['/user'], {state:{usuarios: this.usuarios}})
        });
      });
    })
  }
  buscarUsuarioPorId(){
    this.sharingData.buscarUsuarioPorId.subscribe(id =>{
      const usuario = this.usuarios.find(usuario => usuario.id == id);
      this.sharingData.usuarioSeleccionadoEditar.emit(usuario);
    })
  }
}
