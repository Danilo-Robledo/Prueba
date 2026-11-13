import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../models/pais';

@Injectable({
  providedIn: 'root',
})
export class PaisService {

  ruta_servidor: string = "http://localhost:8080/lucha";
  recurso: string = "paises";
  
  constructor(private http:HttpClient){};

  listarTodos() {
    return this.http.get<Pais[]>(this.ruta_servidor+"/"+this.recurso);
  }

}
