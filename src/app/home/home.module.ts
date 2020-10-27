import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeTemplateComponent } from './home-template/home-template.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [HomeTemplateComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
  ]
})
export class HomeModule { }
