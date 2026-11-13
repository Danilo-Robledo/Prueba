import { CanActivateFn } from '@angular/router';
import { UsuarioService } from '../services/usuario-service';
import { inject } from '@angular/core';

export const grabarGuard: CanActivateFn = (route, state) => {

  
  const usuarioService = inject(UsuarioService);
  let authorities = usuarioService.getAuthorities();

  if (authorities && authorities!="") {
    if (authorities.indexOf("ADMIN")>=0) {
      return true;    
    }
  }

  return false;
};
