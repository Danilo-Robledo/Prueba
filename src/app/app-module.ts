import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ListaEventos } from './components/eventos/lista-eventos/lista-eventos';
import { GrabarEvento } from './components/eventos/grabar-evento/grabar-evento';
import { MaterialModule } from './modules/material/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmacionEliminacion } from './components/confirmaciones/confirmacion-eliminacion/confirmacion-eliminacion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DetalleEvento } from './components/eventos/detalle-evento/detalle-evento';
import { Login } from './components/login/login';
import { Cabecera } from './components/cabecera/cabecera';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { autorizacionInterceptor } from './interceptors/autorizacion-interceptor';

@NgModule({
  declarations: [
    App,
    ListaEventos,
    GrabarEvento,
    ConfirmacionEliminacion,
    DetalleEvento,
    Login,
    Cabecera,
  ],
  imports: [BrowserModule, AppRoutingModule, MaterialModule, ReactiveFormsModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideNativeDateAdapter(),
    provideHttpClient(withInterceptors([autorizacionInterceptor]))
  ],
  bootstrap: [App],
})
export class AppModule {}
