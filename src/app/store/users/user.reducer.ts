import { createReducer, on } from "@ngrx/store";
import { Usuario } from "../../models/usuario";
import { add, addSuccess, find, findAll, findAllPageable, load, remove, removeSuccess, resetUser, setErrors, setPaginator, update, updateSuccess } from "./user.action";

const usuarios:Usuario[] = [];
const usuario: Usuario = new Usuario();
export const usersReducer = createReducer(
    {
    usuarios,
    paginator:{},
    usuario,
    errors:{},
    cargando: true,
    },
    /* on(load, (state, {page})=>({
        usuarios:[...usuarios],
        paginator: state.paginator,
        usuario: state.usuario
    })), */
    on(findAll, (state, {usuarios})=>{
        return{
            usuarios:[...usuarios],
            paginator: state.paginator,
            usuario: state.usuario,
            errors: state.errors,
            cargando: false
        }
    }),
    on(findAllPageable, (state, {usuarios, paginator})=>{
        return{
            usuarios:[...usuarios],
            paginator: {...paginator},
            usuario: state.usuario,
            errors: state.errors,
            cargando: false
        }
    }),
    on(find, (state, {id}) => ({
        usuarios: state.usuarios,
        paginator: state.paginator,
        usuario: state.usuarios.find(user => user.id == id) || new Usuario(),
        errors: state.errors,
        cargando: state.cargando
    })),
    on(setPaginator, (state, {paginator})=>({
        usuarios: state.usuarios,
        paginator: {...paginator},
        usuario: state.usuario,
        errors: state.errors,
        cargando: state.cargando
    })),
    on(addSuccess, (state, {userNew})=>({
        usuarios:[...state.usuarios, { ...userNew }],
        paginator: state.paginator,
        usuario: {... usuario},
        errors: {},
        cargando: state.cargando
    })),
    on(updateSuccess, (state, {userUpdated})=>({
        usuarios: state.usuarios.map(u => (u.id == userUpdated.id)? {... userUpdated}: u),
        paginator: state.paginator,
        usuario: {... usuario},
        errors: {},
        cargando: state.cargando
    })),
    on(removeSuccess, (state, {id})=>({
        usuarios: state.usuarios.filter(usuario => usuario.id!=id),
        paginator: state.paginator,
        usuario: state.usuario,
        errors: state.errors,
        cargando: state.cargando
    })),
    on(setErrors, (state, {userForm, errors})=>({
        usuarios: state.usuarios,
        paginator: state.paginator,
        usuario: {... userForm},
        errors: {... errors},
        cargando: state.cargando
    })),
    on(resetUser, (state)=>({
        usuarios: state.usuarios,
        paginator: state.paginator,
        usuario: {... usuario},
        errors: {},
        cargando: state.cargando
    })),
    

)