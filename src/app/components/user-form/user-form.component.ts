import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { add, find, resetUser, update } from '../../store/users/user.action';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  
  usuario: Usuario;
  errors: any = {};
  constructor(
    private route: ActivatedRoute,
    // private sharingData: SharingDataService,
    // private service: UserService,
    private store: Store<{usuarios:any}>
  ){
    this.usuario = new Usuario();
      // this.usuario = new Usuario();
      this.store.select('usuarios').subscribe(state=>{
        this.errors = state.errors;
        this.usuario = {... state.usuario};

      })
  }
  ngOnInit(): void {
    // this.store.dispatch(resetUser());
    // this.sharingData.errorsUserFormEmitter.subscribe(errors => this.errors = errors);
    // this.sharingData.usuarioSeleccionadoEditar.subscribe(usuario => this.usuario=usuario);
    this.store.dispatch(resetUser());
    this.route.paramMap.subscribe(params =>{
      const id: number = parseInt(params.get('id')||'0');
      if(id>0){
        this.store.dispatch(find({id}))
        // this.service.findById(id).subscribe(user => this.usuario = user);
        // this.sharingData.buscarUsuarioPorId.emit(id);
      }
    })
  }

  onSubmit(userForm: NgForm): void{
    // this.store.dispatch(setUserForm({usuario:this.usuario}));
    if(this.usuario.id>0){
      this.store.dispatch(update({userUpdated: this.usuario}))
    }else{
      this.store.dispatch(add({userNew: this.usuario}))
    }
    // this.store.dispatch(resetUser());
    // if(userForm.valid){
      // this.sharingData.usuarioEmit.emit(this.usuario);
      // this.service.update(this.usuario).subscribe(user => this.usuario = user);
      //console.log(this.usuario);
      // }
      // userForm.reset();
      // userForm.resetForm();
    }
    limpiar(userForm: NgForm): void{
    this.store.dispatch(resetUser());
    // this.usuario = new Usuario();
    userForm.reset();
    userForm.resetForm();
  }
}
