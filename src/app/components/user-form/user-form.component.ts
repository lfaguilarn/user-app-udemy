import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  
  usuario: Usuario;
  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService
  ){
    this.usuario = new Usuario();
      // this.usuario = new Usuario();
  }
  ngOnInit(): void {
    this.sharingData.usuarioSeleccionadoEditar.subscribe(usuario => this.usuario=usuario);
    this.route.paramMap.subscribe(params =>{
      const id: number = parseInt(params.get('id')||'0');
      if(id>0){
        this.sharingData.buscarUsuarioPorId.emit(id);
      }
    })
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
