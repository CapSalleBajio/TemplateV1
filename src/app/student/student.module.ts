import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { StudentRoutingModule } from './student-routing.module';



@NgModule({
  declarations: [ListComponent, NewComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
  ]
})
export class StudentModule { }
