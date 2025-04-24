import { createAction, props } from "@ngrx/store";
import { Usuario } from "../../models/usuario";

export const load = createAction('load', props<{page: number}>());

export const resetUser = createAction('resetUser');
// export const setUserForm = createAction('setUserForm', props<{usuario:Usuario}>())
export const findAll = createAction('findAll', props<{usuarios:Usuario[]}>());
export const findAllPageable = createAction('findAllPageable', props<{usuarios:Usuario[], paginator:any}>());
export const setPaginator = createAction('setPaginator', props<{paginator:any}>());
export const find = createAction('find', props<{ id : number} >());

export const add = createAction('add', props<{ userNew:Usuario }>());
export const addSuccess = createAction('addSuccess', props<{ userNew:Usuario }>());
export const update = createAction('update', props<{ userUpdated:Usuario }>());
export const updateSuccess = createAction('update', props<{ userUpdated:Usuario }>());
export const remove = createAction('remove', props<{ id:number}>());
export const removeSuccess = createAction('removeSuccess', props<{ id:number}>());

export const setErrors = createAction('setError', props<{userForm:Usuario, errors:any}>());