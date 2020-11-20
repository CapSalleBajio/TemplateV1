import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ExitGuard } from './guards/exit/exit.guard';
import { HasSessionGuard } from './guards/hasSession/has-session.guard';
import { StudentModule } from './student/student.module';

// Archivo de rutas principal de la aplicación
const routes: Routes = [
  // Módulo de autenticación (página de login y registro)
  // En este caso se estan cargando los módulso por Lazy load
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  // Módulo de con las características de la aplicación
  {path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
  // Comodin en caso de que no existan las rutas
  {path: '**', redirectTo: 'auth'}
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
