import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario-service';

export const autorizacionInterceptor: HttpInterceptorFn = (req, next) => {

  const usuarioService = inject(UsuarioService);
  let token = usuarioService.getToken();

  if (token && token!="") {
    let nuevoReq = req.clone({
      headers: req.headers.set("Authorization","Bearer "+token)
    });      
    return next(nuevoReq);
  }
  return next(req);
};
