import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
// Módulo que nos permite hacer peticiones http
import { HttpClientModule } from '@angular/common/http';

// Ennvironment
import { environment } from '../environments/environment';

// Modulos de firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    // Conexión con un proyecto de firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // Modulo de autenticación con firebase
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
