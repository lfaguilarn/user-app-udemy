import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {
  title:string='Listado de usuarios';
  usuarios: Usuario[]=[];
  usuario!: Usuario;
  open: boolean = false;
  constructor(
    private service:UserService
  ){
    this.usuario = new Usuario();
  }
  ngOnInit(): void {
    this.service.finAll().subscribe(usuarios => this.usuarios = usuarios)
  }
  addUsuario(usuario: Usuario){
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
    this.usuario = new Usuario;
    this.setOpen();
    // if (this.usuarios.some(u => u.id === usuario.id)) {
    //   this.usuarios = this.usuarios.map(u => 
    //     u.id === usuario.id ? { ...u, ...usuario } : u
    //   );
    //   //this.editar = fa; // Se activa cuando se actualiza un usuario existente
    // } else {
    //   this.usuarios = [...this.usuarios, { ...usuario }];
    //   //this.editar=false;
    // }
    // usuario.id = this.usuarios.length+1;
    // this.usuarios = [... this.usuarios, {... usuario}];
    //this.usuarios = [... this.usuarios, usuario];
    // this.editar=false;
  }
  eliminar(id: number){
    this.usuarios = this.usuarios.filter(usuario => usuario.id!=id);
  }
  modificar(u: Usuario){
    this.usuario = {... u};
    this.open = true;
  }

  setOpen(){
    this.open = !this.open;
  }
}
