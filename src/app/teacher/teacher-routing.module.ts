import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TListComponent } from './t-list/t-list.component';
import { TNewComponent } from './t-new/t-new.component';

const routes: Routes = [
  {path: 'list', component: TListComponent},
  {path: 'new', component: TNewComponent},
  {path: '**', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
