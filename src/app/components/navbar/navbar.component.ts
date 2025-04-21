import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  // @Input() usuarios: Usuario[]=[];
  // @Input() paginator= {};
  constructor(private authservice: AuthService,
    private router:Router
  ){

  }

  get login(){
    return this.authservice.user;
  }
  get admin(){
    return this.authservice.isAdmin();
  }

  handlerLogout(){
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
