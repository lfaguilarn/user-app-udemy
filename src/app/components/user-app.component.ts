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
  }
  addUsuario(){
    this.sharingData.usuarioEmit.subscribe(usuario=>{
      if(usuario.id > 0){
        this.usuarios = this.usuarios.map(u => (u.id == usuario.id)? {... usuario}: u);
        Swal.fire({
          title: "Notificación",
          text: "Usuario modificado con éxito",
          icon: "success"
        });
      }else{
        usuario.id = this.usuarios.length+1;
        this.usuarios = [...this.usuarios, { ...usuario }];
        Swal.fire({
          title: "Notificación",
          text: "Usuario agregado con éxito",
          icon: "success"
        });
      }
      this.router.navigate(['/user'], {state: {usuarios: this.usuarios}});
    }); 
  }
  eliminar(){
    this.sharingData.idEvent.subscribe(id =>{
      this.usuarios = this.usuarios.filter(usuario => usuario.id!=id);
      this.router.navigate(['user/create'],{skipLocationChange:true}).then(()=>{
        this.router.navigate(['/user'], {state:{usuarios: this.usuarios}})
      });
    })
  }
  
}
