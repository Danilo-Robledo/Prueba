import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from '../../../services/evento-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Evento } from '../../../models/evento';
import { ActivatedRoute, Router } from '@angular/router';
import { Pais } from '../../../models/pais';
import { Ciudad } from '../../../models/ciudad';
import { PaisService } from '../../../services/pais-service';
import { CiudadService } from '../../../services/ciudad-service';
import { EventoDTO } from '../../../models/evento-dto';

@Component({
  selector: 'app-grabar-evento',
  standalone: false,
  templateUrl: './grabar-evento.html',
  styleUrl: './grabar-evento.css',
})
export class GrabarEvento {

  id:number=0;
  grabarForm!: FormGroup;
  paises!:Pais[];
  ciudades!:Ciudad[];

  constructor(private eventoService:EventoService, private snack:MatSnackBar, private formBuilder:FormBuilder,
              private router:Router, private ruta:ActivatedRoute, private paisService: PaisService,
              private ciudadService: CiudadService ){}

  ngOnInit() {
   
    this.paisService.listarTodos().subscribe({
      next:(datos:Pais[])=>{
        this.paises = datos;
      },
      error: (err) => {
              console.log(err);
      }
    });


    this.grabarForm = this.formBuilder.group({
        id:[""],
        nombre:["",[Validators.required, Validators.minLength(2)]],
        fecha:[""],
        promotora:["",[Validators.required, Validators.minLength(2)]],
        recinto:["",[Validators.required, Validators.minLength(2)]],
        ciudad:["",[Validators.required, Validators.minLength(2)]],
        pais:["",[Validators.required, Validators.minLength(2)]]
    });

    this.id = parseInt(this.ruta.snapshot.params["id"]);
    if (this.id>0 && this.id!==undefined) {
      this.eventoService.buscarId(this.id).subscribe({
        next:(datos:EventoDTO)=>{
          console.log("Carga Evento");
          console.log(datos);

          this.grabarForm.get("id")?.setValue(datos.id);
          this.grabarForm.get("nombre")?.setValue(datos.nombre);
          this.grabarForm.get("fecha")?.setValue(datos.fecha+"T00:00:00");
          this.grabarForm.get("promotora")?.setValue(datos.promotora);
          this.grabarForm.get("recinto")?.setValue(datos.recinto);
          this.grabarForm.get("ciudad")?.setValue(datos.ciudadNombre);
          this.grabarForm.get("pais")?.setValue(datos.paisNombre);
        },
         error: (err) => {
              console.log("Hubo un error:");
              console.log(err);
      }
      })
    }



  }


  cargarCiudades(event:any){
    const paisId:number = event.value;
    this.ciudadService.listarPorPais(paisId).subscribe({
      next:(datos:Ciudad[])=>{
        this.ciudades = datos;
      },
      error: (err) => {
              console.log(err);
      }
    })
  }


  grabar(){
    
    let fecha=this.grabarForm.get("fecha")?.value;
    let mes:string=(fecha.getMonth()+1).toString();
    if ((mes.length)==1) {
      mes = "0"+mes;
    }
    let dia:string=(fecha.getDate()).toString();
    if ((dia.length)==1) {
      dia = "0"+dia;
    }
    let fechaString=fecha.getFullYear().toString()+"-"+mes+"-"+dia;

    const evento:EventoDTO={
      id: this.grabarForm.get("id")?.value,
      nombre: this.grabarForm.get("nombre")?.value,
      fecha: fechaString,
      promotora: this.grabarForm.get("promotora")?.value,
      recinto: this.grabarForm.get("recinto")?.value,
      ciudadId: this.grabarForm.get("ciudad")?.value,
      paisId:0,
      paisNombre:"",
      ciudadNombre:""
    }
    
    console.log(evento);

    if (this.grabarForm.valid) {


      if (this.id>0) {
              this.eventoService.actualizar(evento).subscribe({
              next: (datos:EventoDTO)=>{
                this.snack.open("Se actualizó el Evento con el id: "+datos.id.toString(),"",{duration:2000});                
                this.router.navigate(["/eventos/lista-eventos"]);          
              },
              error: (err) => {
                      console.log("Hubo un error:");
                      console.log(err);
              }
            })
      } else {
              this.eventoService.insertar(evento).subscribe({
              next: (datos:EventoDTO)=>{
                console.log(datos);
                this.snack.open("Se insertó el Evento con el id: "+datos.id.toString(),"",{duration:2000});                
                this.router.navigate(["/eventos/lista-eventos"]);          
              },
              error: (err) => {
                      console.log("Hubo un error:");
                      console.log(err);
              }
            })    
      }


    }

    
    
  }


}
