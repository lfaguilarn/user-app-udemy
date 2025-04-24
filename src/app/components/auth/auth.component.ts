import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.action';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  usuario: Usuario;
  constructor(
    private store: Store<{auth:any}>,
    private authService: AuthService,
    private router:Router,
    private sharingData: SharingDataService){

    this.usuario = new Usuario();
  }

  onSubmit(){
    // console.log(this.user.username+" - -");
    if(!this.usuario.username || !this.usuario.password){
      Swal.fire(
        'Error de validación',
        'Username y password requeridos',
        'error'
      );
    }else{
      this.store.dispatch(login({username:this.usuario.username, password:this.usuario.password}));
      // console.log(this.usuario.username+"--")
      // // this.sharingData.handlerLoginEventEmitter.emit({username: this.user.username, password: this.user.password});
      // // console.log(this.user);
      // // this.sharingData.handlerLoginEventEmitter.subscribe(({username, password})=>{
      //   // console.log(username+' - '+password);
      //   this.authService.loginUser({username: this.usuario.username, password:this.usuario.password}).subscribe({
      //     next: response =>{
      //       const token = response.token;
      //       const payload = this.authService.getPayload(token);
      //       // const user = {username: payload.sub};
      //       /* const loginData = {
      //         user,
      //         isAuth: true,
      //         isAdmin: payload.isAdmin
      //       } */
      //       // this.store.dispatch(login({login:loginData}));
  
      //       this.authService.token = token;
      //       this.authService.user = {
      //         usuario:{username: payload.sub},
      //         isAuth: true,
      //         isAdmin: payload.isAdmin
      //       };
      //       this.router.navigate(['/user']);
      //     },
      //     error: error =>{
      //       if(error.status == 401){
      //         Swal.fire('Error en el login', 'Username o password incorrectos', 'error');
      //       }else{
      //         throw error;
      //       }
      //     }
      //   })
      
    }
  }
}
