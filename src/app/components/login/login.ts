import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario';
import { TokenDTO } from '../../models/tokenDTO';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!: FormGroup;

  constructor(private snack:MatSnackBar, private formBuilder:FormBuilder,
              private router:Router,  private usuarioService: UsuarioService){}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
        username:["",[Validators.required]],
        password:["",[Validators.required]],        
    });

  }

  login(){
    const usuario: Usuario={
      id:0,
      username:this.loginForm.get("username")?.value,
      password:this.loginForm.get("password")?.value,
      enabled:true
    };

    if (this.loginForm.valid) {
      this.usuarioService.login(usuario).subscribe({
      next:(datos:TokenDTO)=>{
        console.log(datos);
        this.router.navigate(["/eventos/lista-eventos"])
      },
      error:(err)=>{
        console.log(err);
      }
      })
    }

    

  }

}
