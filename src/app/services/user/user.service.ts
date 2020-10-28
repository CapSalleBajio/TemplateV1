import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: IUser[] = [
    {
      id: 1,
      email: 'omar.salas@jynsystems.com',
      password: '123',
      role: 'teacher',
    },
    {
      id: 2,
      email: 'andres@jynsystems.com',
      password: '123',
      role: 'student',
    },
  ];

  constructor() { }

  getUsers(): IUser[] {
    return [];
  }

  login(email: string, password: string): boolean {
    const userFound = this.users.find(
      (user: IUser) => user.email === email && user.password === password
    );
    if (userFound) {
      localStorage.setItem('user', JSON.stringify(userFound));
      return true;
    } else {
      localStorage.removeItem('user');
      return false;
    }
  }

  register(user: IUser): IUser {
    const userFinal = {...user, id: this.users.length + 1};
    this.users.push(userFinal);
    localStorage.setItem('user', JSON.stringify(userFinal));
    return user;
  }

}
