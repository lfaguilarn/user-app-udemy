import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user.service";
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";
import { Usuario } from "../../models/usuario";
import { add, addSuccess, findAll, findAllPageable, load, remove, removeSuccess, setErrors, setPaginator, update, updateSuccess } from "./user.action";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Store } from "@ngrx/store";

@Injectable()
export class UsersEffects{
    private service = inject(UserService)
    private actions$ = inject(Actions)
    
    constructor(
        private router:Router,
        private store: Store<{usuarios: any}>
        /* private actions$: Actions,
        private service: UserService */
    ){}
    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(load),
            exhaustMap(action => this.service.findAllPageable(action.page)
                .pipe(
                    map(pageable => {
                        const usuarios = pageable.content as Usuario[];
                        const paginator = pageable;
                        // setPaginator({ paginator });
                        return findAllPageable({ usuarios, paginator });
                    }),
                    catchError((error) => of(error))
                )
            )
        )
    );

    addUser$ = createEffect(
        ()=>this.actions$.pipe(
            ofType(add),
            exhaustMap(action => this.service.create(action.userNew)
                .pipe(
                    map( userNew => addSuccess({userNew})),
                    catchError(error => (error.status == 400)? of(setErrors({userForm:action.userNew, errors: error.error})) : of(error)
                    )
                )
            )
        )
    );
    
    addSuccessUser$ = createEffect(
        ()=>this.actions$.pipe(
            ofType(addSuccess),
            tap(()=>{
                this.router.navigate(['/user']
                    // , {state: {usuarios: this.usuarios, paginator: this.paginator}}
                );
                Swal.fire({
                    title: "Notificación",
                    text: "Usuario agregado con éxito",
                    icon: "success"
                });
            })
        ),{dispatch:false}
    );
    
    updateUser$ = createEffect(
        ()=>this.actions$.pipe(
            ofType(update),
            exhaustMap(action => this.service.update(action.userUpdated)
                .pipe(
                    map( userUpdated => updateSuccess({userUpdated})),
                    catchError(error => (error.status == 400)? of(setErrors({userForm:action.userUpdated,  errors: error.error})) : of(error)
                    )
                )
            )
        )
    );
    updateSuccessUser$ = createEffect(
        ()=>this.actions$.pipe(
            ofType(updateSuccess),
            tap(()=>{
                this.router.navigate(['/user']
                    // , {state: {usuarios: this.usuarios, paginator: this.paginator}}
                );
                Swal.fire({
                    title: "Notificación",
                    text: "Usuario actualizado con éxito",
                    icon: "success"
                });
            })
        ),{dispatch:false}
    );
    removeUser$ = createEffect(
        ()=>this.actions$.pipe(
            ofType(remove),
            exhaustMap(action => this.service.delete(action.id)
            .pipe(
                map( () => removeSuccess({id: action.id})),
                // catchError(error => (error.status == 400)? of(setErrors({errors: error.error})) : EMPTY
                //     )
                )
            )
        )
    );
    removeSuccessUser$ = createEffect(
        ()=>this.actions$.pipe(
            ofType(removeSuccess),
            tap(()=>{
                this.router.navigate(['/users']);
                Swal.fire({
                    title: "Eliminado",
                    text: "Usario eliminado con exito",
                    icon: "success"
                  });
            })
        ),{dispatch:false}
    );

}