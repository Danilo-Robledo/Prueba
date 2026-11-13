import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LuchaDTO } from '../models/lucha-dto';

@Injectable({
  providedIn: 'root',
})
export class LuchaService {

 ruta_servidor: string = "http://localhost:8080/lucha";
  recurso: string = "luchas";
  
  constructor(private http:HttpClient){};

  listarTodos() {
    return this.http.get<LuchaDTO[]>(this.ruta_servidor+"/"+this.recurso);
  }
  
  listarTipoLucha() {
    return this.http.get<string[]>(this.ruta_servidor+"/"+this.recurso+"/"+"tipo_luchas");
  }

  listarPorEvento(id:number) {
    return this.http.get<LuchaDTO[]>(this.ruta_servidor+"/"+this.recurso+"/"+"evento"+"/"+id.toString());
  }
  

  insertar(lucha: LuchaDTO) {
    return this.http.post<LuchaDTO>(this.ruta_servidor+"/"+this.recurso, lucha);
  }

    eliminar(id: number) {
      return this.http.delete<LuchaDTO>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
    }



}
