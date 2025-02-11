import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  
  @Input() usuario: Usuario;
  @Input() open!: boolean;
  @Output() openEmit:EventEmitter<boolean>= new EventEmitter();
  @Output() usuarioEmit:EventEmitter<Usuario>= new EventEmitter();
  constructor(){
    this.usuario = new Usuario();
  }

  onSubmit(userForm: NgForm): void{
    if(userForm.valid){
      this.usuarioEmit.emit(this.usuario);
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
  onOpen() {
    this.openEmit.emit();
  }
}
