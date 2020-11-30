import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
// Módulo que nos permite hacer peticiones http
import { HttpClientModule } from '@angular/common/http';
import { UserState } from './models/user/user.redux';
import { environment } from 'src/environments/environment';

// Importaciones para usar redux
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    NgxsModule.forRoot([
      // Aquí se agregan todos los estados (archivos redux)
      UserState
    ], {
      developmentMode: !environment.production
    }),
    // Este módulo es usado para utilizar la herramienta devTools en el navegador
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
