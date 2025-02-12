import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo: '/user',
    },
    {
        path:'user',
        component: UserComponent,
    },
    {
        path:'user/create',
        component: UserFormComponent,
    },
    {
        path:'user/edit/:id',
        component: UserFormComponent,
    }
];
