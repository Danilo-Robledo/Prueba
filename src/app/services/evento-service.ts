import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import { EventoResumenDTO } from '../models/evento-resumen-dto';
import { EventoDTO } from '../models/evento-dto';
import { UsuarioService } from './usuario-service';

@Injectable({
  providedIn: 'root',
})
export class EventoService {

  ruta_servidor: string = "http://localhost:8080/lucha";
  recurso: string = "eventos";
  
  constructor(private http:HttpClient, private usuarioService: UsuarioService){};

  listarTodos() {
    return this.http.get<EventoDTO[]>(this.ruta_servidor+"/"+this.recurso);
    this.usuarioService.getToken();
    

  }

  buscarId(id: number) {
    return this.http.get<EventoDTO>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  insertar(evento: EventoDTO) {
    return this.http.post<EventoDTO>(this.ruta_servidor+"/"+this.recurso, evento);
  }

  actualizar(evento: EventoDTO) {
    return this.http.put<EventoDTO>(this.ruta_servidor+"/"+this.recurso, evento);
  }

  eliminar(id: number) {
    return this.http.delete<Evento>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  listarResumen() {
    return this.http.get<EventoResumenDTO[]>(this.ruta_servidor+"/"+this.recurso+"/"+"resumen");
  }

}
