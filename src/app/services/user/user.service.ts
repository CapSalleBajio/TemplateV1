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
    }
  ];

  constructor() { }

  getUsers(): IUser[] {
    return [];
  }

  login(email: string, password: string): boolean {
    const userFound = this.users.find(
      (user: IUser) => user.email === email && user.password === password
    );
    return userFound ? true : false;
  }

  register(user: IUser): IUser {
    this.users.push({...user, id: this.users.length + 1});
    return user;
  }

}
