import { Component } from '@angular/core';
import { EventoService } from '../../../services/evento-service';
import { Evento } from '../../../models/evento';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionEliminacion } from '../../confirmaciones/confirmacion-eliminacion/confirmacion-eliminacion';
import { EventoDTO } from '../../../models/evento-dto';

@Component({
  selector: 'app-lista-eventos',
  standalone: false,
  templateUrl: './lista-eventos.html',
  styleUrl: './lista-eventos.css',
})
export class ListaEventos {

  dsEventos = new MatTableDataSource<EventoDTO>();
  displayedColumns: string[] = ['id', 'nombre', 'fecha', 'proximamente','promotora','lugar','opciones'];

  constructor(private eventoService:EventoService, private snack: MatSnackBar, 
              private dialog: MatDialog ){}

  ngOnInit() {
    this.cargaLista();
    
  }

  cargaLista() {
      let data= this.eventoService.listarTodos().subscribe({
      next: (datos:EventoDTO[])=>{
              console.log("Los eventos son:");
              console.log(datos);
              this.dsEventos.data = datos;
      },
      error: (err) => {
              console.log("Hubo un error:");
              console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsEventos.filter = filterValue.trim().toLowerCase();
  }


  proximamente(fecha: string){
    let [a,m,d] = fecha.split("-").map(Number);
    let fechaDate = new Date(a, m, d);

    let hoy = new Date();
    hoy.setHours(0,0,0,0);

    let difFechas = fechaDate.getTime()-hoy.getTime();

    if (difFechas<0) {
      return "Ya pasó"
    } 
    return "Proximamente";
  }

  eliminar(id:number) {

    const dialogRef = this.dialog.open(ConfirmacionEliminacion);

    dialogRef.afterClosed().subscribe(result => {      
        if(result==true) {
            let data= this.eventoService.eliminar(id).subscribe({
              next: ()=>{
                  this.cargaLista();
                  this.snack.open("Se eliminó el Evento con id: "+id.toString(),"",{duration:2000});
              },
              error: (err) => {
                      console.log("Hubo un error:");
                      console.log(err);
              }
            });
        }
    });   
       
  }

}
