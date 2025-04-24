import { createReducer, on } from "@ngrx/store"
import { login, loginSuccess, logout } from "./auth.action"
import { state } from "@angular/animations"

export const initialLogin={
    isAuth:false,
    isAdmin:false,
    usuario: undefined
}

const initialState =JSON.parse(sessionStorage.getItem('login')||JSON.stringify(initialLogin))   ;

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, {login})=>({
        isAuth:true,
        isAdmin:login.isAdmin,
        usuario:login.usuario
    })),
    on(logout, (state)=>({
        ...initialLogin
    }))
)