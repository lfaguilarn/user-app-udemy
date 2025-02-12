import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  
  usuario: Usuario;
  constructor(
    private router: Router,
    private sharingData: SharingDataService
  ){
    if(this.router.getCurrentNavigation()?.extras.state){
      this.usuario=this.router.getCurrentNavigation()?.extras.state!['u'];
    }else{
      this.usuario = new Usuario();
    }
      // this.usuario = new Usuario();
  }

  onSubmit(userForm: NgForm): void{
    if(userForm.valid){
      this.sharingData.usuarioEmit.emit(this.usuario);
      console.log(this.usuario);
    }
    userForm.reset();
    userForm.resetForm();
  }
  limpiar(userForm: NgForm): void{
    this.usuario = new Usuario();
    userForm.reset();
    userForm.resetForm();
  }
}
