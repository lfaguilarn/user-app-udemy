import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { load, remove } from '../../store/users/user.action';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{
  usuarios: Usuario[] = [];
  paginator: any={};
  pageUrl: string='/user/page'
  title:string='Listado de usuarios';
  isLoad: boolean = true;
  constructor(private service: UserService,
    private router:Router,
    private authService:AuthService,
    private sharingData: SharingDataService,
    private route:ActivatedRoute,
    private store:Store<{usuarios:any}>
  ){
    this.store.select('usuarios').subscribe(state =>{
      this.usuarios = state.usuarios;
      this.paginator = state.paginator;
      this.isLoad = state.cargando;
    })
    // if(this.router.getCurrentNavigation()?.extras.state){
    //   this.usuarios=this.router.getCurrentNavigation()?.extras.state!['usuarios'];
    //   this.paginator=this.router.getCurrentNavigation()?.extras.state!['paginator'];
    // }
  }
  ngOnInit(): void {
    // if(this.usuarios.length==0 || this.usuarios == undefined || this.usuarios == null){
      // console.log('consulta find all');
      // this.service.finAll().subscribe(usuarios=>this.usuarios = usuarios);
      this.route.paramMap.subscribe(params =>{
        // const page = +(params.get('page')||'0');
        this.store.dispatch(load({page : +(params.get('page')||'0')}));
        // this.service.findAllPageable(numPage).subscribe(pageable => {
        //   this.paginator = pageable;
        //   this.usuarios = pageable.content as Usuario[];
        //   this.sharingData.pageUserEmitter.emit({usuarios: this.usuarios, paginator: this.paginator})
        // });
      });
    // }
  }
  eliminar(id: number){
    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "Si lo borras, despues no la peles",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminalo sin miedo",
      cancelButtonText: "No, no lo elimines",
    }).then((result) => {
      if (result.isConfirmed) {
        // this.sharingData.idEvent.emit(id);
        // this.service.delete(id).subscribe(() =>{
          // this.usuarios = this.usuarios.filter(usuario => usuario.id!=id);
          this.store.dispatch(remove({id}));
          
        // });
      }
    });
    // const confir = confirm('Esta seguro de eliminar?');
    // if(confir){
    //   this.idEvent.emit(id);
    // }
  }
  modificar(u: Usuario){
    // this.sharingData.userEventEmitter.emit(u);
    // this.router.navigate(['/user/edit', u.id],{state:{u}});
    this.router.navigate(['/user/edit', u.id]);
  }

  get admin(){
    return this.authService.isAdmin();
  }
}
