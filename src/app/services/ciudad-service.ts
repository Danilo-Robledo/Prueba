import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../models/pais';
import { Ciudad } from '../models/ciudad';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {

  ruta_servidor: string = "http://localhost:8080/lucha";
  recurso: string = "ciudades";
  
  constructor(private http:HttpClient){};

  listarTodos() {
    return this.http.get<Ciudad[]>(this.ruta_servidor+"/"+this.recurso);
  }

  listarPorPais(id:number) {
    return this.http.get<Ciudad[]>(this.ruta_servidor+"/"+this.recurso+"/"+"pais"+"/"+id.toString());
  }


}
