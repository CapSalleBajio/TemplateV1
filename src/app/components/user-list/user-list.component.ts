import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/interfaces/user/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Output() selectedUser: EventEmitter<IUser> = new EventEmitter();
  constructor() { }

  users: IUser[] = [
    { id: 1, name: 'Luis Torres', email: 'luistorres@correo.com', score: 9.2, description: 'D 1' },
    { id: 2, name: 'Javier Moreno', email: 'jMoreno@correo.com', score: 5.4, description: 'D 2' },
    { id: 3, name: 'Karina Marquez', email: 'kMarquez@correo.com', score: 10, description: 'D 3' },
    { id: 4, name: 'Gregorio Lopez', email: 'glopez@correo.com', score: 2.9, description: 'D 4' }
  ];
  ngOnInit(): void {
  }

  onSelectedUser(index: number): void {
    this.selectedUser.emit(this.users[index]);
  }

}
