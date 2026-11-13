import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEventos } from './components/eventos/lista-eventos/lista-eventos';
import { GrabarEvento } from './components/eventos/grabar-evento/grabar-evento';
import { DetalleEvento } from './components/eventos/detalle-evento/detalle-evento';
import { Login } from './components/login/login';
import { grabarGuard } from './guards/grabar-guard';

const routes: Routes = [
  {path:"", component:Login},  
  {path:"login", component:Login},
  {path:"eventos", component:ListaEventos},
  {path:"eventos/lista-eventos", component:ListaEventos},
  {path:"eventos/insertar-evento", component:GrabarEvento, canActivate:[grabarGuard]},
  {path:"eventos/actualizar-evento/:id", component:GrabarEvento, canActivate:[grabarGuard]},
  {path:"eventos/detalle-evento/:id", component:DetalleEvento},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
