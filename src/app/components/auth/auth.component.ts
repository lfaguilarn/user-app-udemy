import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  user: Usuario;
  constructor(private sharingData: SharingDataService){

    this.user = new Usuario();
  }

  onSubmit(){
    // console.log(this.user.username+" - -");
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'Error de validación',
        'Username y password requeridos',
        'error'
      );
    }else{
      this.sharingData.handlerLoginEventEmitter.emit({username: this.user.username, password: this.user.password});
      // console.log(this.user);
    }
  }
}
