import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { StudentRoutingModule } from './student-routing.module';
import { TemplateComponent } from './template/template.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ListComponent, NewComponent, TemplateComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    RouterModule,
  ]
})
export class StudentModule { }
