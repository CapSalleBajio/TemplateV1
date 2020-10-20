import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'practica1';
  user = null;


  onSelectedUser($event): void {
    this.user = $event;
  }
}
