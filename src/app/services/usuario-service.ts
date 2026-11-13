import { Injectable } from '@angular/core';
import { TokenDTO } from '../models/tokenDTO';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  
  ruta_servidor: string = "http://localhost:8080/lucha";
  recurso: string = "users";
  
  constructor(private http:HttpClient){};

  login(usuario: Usuario) {
    this.logout();
    return this.http.post<TokenDTO>(this.ruta_servidor+"/"+this.recurso+"/"+"login", usuario).pipe(
      tap( (datos:TokenDTO) => {
          localStorage.setItem("token", datos.token);
          localStorage.setItem("id", datos.id.toString());
          localStorage.setItem("authorities", datos.authorities);
      }
      )
    );    
  }

  logout() {
    localStorage.clear();
  }

  getId() {
    return localStorage.getItem("id");
  }
  
  getAuthorities() {
    return localStorage.getItem("authorities");
  }
  
  getToken() {
    return localStorage.getItem("token");
  }
  
}
