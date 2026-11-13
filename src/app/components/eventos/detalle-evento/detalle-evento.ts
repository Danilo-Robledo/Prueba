import { ChangeDetectorRef, Component } from '@angular/core';
import { Evento } from '../../../models/evento';
import { EventoService } from '../../../services/evento-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LuchaService } from '../../../services/lucha-service';
import { MatTableDataSource } from '@angular/material/table';
import { LuchaDTO } from '../../../models/lucha-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { EventoDTO } from '../../../models/evento-dto';

@Component({
  selector: 'app-detalle-evento',
  standalone: false,
  templateUrl: './detalle-evento.html',
  styleUrl: './detalle-evento.css',
})
export class DetalleEvento {

  grabarForm!: FormGroup;
  evento!:EventoDTO;
  id:number=0;
  tipoLuchas!:string[];
  dsLuchas = new MatTableDataSource<LuchaDTO>();
  displayedColumns: string[] = ['id', 'ordenCartelera', 'tipoLucha', 'minParticipantes','duracionMinutos','estelar','opciones'];

  constructor(private eventoService:EventoService, private snack:MatSnackBar, private formBuilder:FormBuilder,
              private router:Router, private ruta:ActivatedRoute, private luchaService:LuchaService, private cdr:ChangeDetectorRef){}





  listarLuchas() {

    this.luchaService.listarPorEvento(this.id).subscribe({
            next:(datos:LuchaDTO[])=>{              
                  this.dsLuchas.data = datos;

                  this.luchaService.listarTipoLucha().subscribe({
                      next:(resultado:string[])=>{              
                            this.tipoLuchas = resultado;
                      },
                      error: (err) => {
                         console.log(err);
                      }
                  })
                },
            error: (err) => {
                  console.log(err);
                }  
          })

  }            


  ngOnInit() {


    


    this.id = parseInt(this.ruta.snapshot.params["id"]);
    if (this.id>0 && this.id!==undefined) {
      this.eventoService.buscarId(this.id).subscribe({
        next:(datos:EventoDTO)=>{
          this.evento = datos;

          this.listarLuchas();
          


          this.grabarForm = this.formBuilder.group({
              id:[""],
              ordenCartelera:["",[Validators.required, Validators.min(1)]],
              tipoLucha:[""],
              duracionMinutos:["",[Validators.required, Validators.min(1)]],
              minParticipantes:["",[Validators.required, Validators.min(1)]],
              estelar:[""]              
          });



          this.cdr.detectChanges();
        },
         error: (err) => {
              console.log("Hubo un error:");
              console.log(err);
      }
      })
    }

  }

  eliminar(id:number){

  }

  grabar(){
    

    if (this.grabarForm.valid){

        const lucha:LuchaDTO={
            id: this.grabarForm.get("id")?.value,
            ordenCartelera: this.grabarForm.get("ordenCartelera")?.value,
            tipoLucha: this.grabarForm.get("tipoLucha")?.value,
            duracionMinutos: this.grabarForm.get("duracionMinutos")?.value,            
            minParticipantes: this.grabarForm.get("minParticipantes")?.value,
            estelar: this.grabarForm.get("estelar")?.value,
            eventoId:this.id
        }

        this.luchaService.insertar(lucha).subscribe({
          next:(data:LuchaDTO)=>{
                this.listarLuchas();
                this.cdr.detectChanges();
          },
          error:(err:HttpErrorResponse)=> {
            console.log(err.error.message);
            this.snack.open(err.error.message,"",{duration:2000});                
          }
        })

    }

  }
}
