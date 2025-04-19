import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { state } from '@angular/animations';
import { AuthService } from '../services/auth.service';

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
  paginator: any={};
  constructor(
    private service:UserService,
    private sharingData: SharingDataService,
    private router:Router,
    private route:ActivatedRoute,
    private authService: AuthService
  ){
  }
  ngOnInit(): void {
    // this.service.finAll().subscribe(usuarios => this.usuarios = usuarios);
    // this.route.paramMap.subscribe(params =>{
    //   const numPage = +(params.get('page')||'0');
    //   console.log(numPage);
    //   // this.service.finAllPageable(numPage).subscribe(pageable => this.usuarios = pageable.content as Usuario[]);
    // });
    this.addUsuario();
    this.eliminar();
    this.buscarUsuarioPorId();
    this.pageUserEvent();
    this.handlerLogin();
  }

  handlerLogin(){
    this.sharingData.handlerLoginEventEmitter.subscribe(({username, password})=>{
      // console.log(username+' - '+password);
      this.authService.loginUser({username, password}).subscribe({
        next: response =>{
          const token = response.token;
          const payload = this.authService.getPayload(token);
          const user = {username: payload.sub};
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          }
          this.authService.token = token;
          this.authService.user = login;
          this.router.navigate(['/users/page/0']);
        },
        error: error =>{
          if(error.status == 401){
            Swal.fire('Error en el login', 'Username o password incorrectos', 'error');
          }else{
            throw error;
          }
        }
      })
    })
  }

  pageUserEvent(){
    this.sharingData.pageUserEmitter.subscribe(pageable => {
      this.usuarios = pageable.usuarios;
      this.paginator = pageable.paginator;
    });
  }

  addUsuario(){
    this.sharingData.usuarioEmit.subscribe(usuario=>{
      if(usuario.id > 0){
        this.service.update(usuario).subscribe(
          {
            next: (userUpdated) =>{
              this.usuarios = this.usuarios.map(u => (u.id == userUpdated.id)? {... userUpdated}: u);
              this.router.navigate(['/user'], {state: {usuarios: this.usuarios, paginator: this.paginator}}  );
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
          this.router.navigate(['/user'], {state: {usuarios: this.usuarios, paginator: this.paginator}}  );
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
