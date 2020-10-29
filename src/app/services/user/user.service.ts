import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
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
    {
      id: 3,
      email: 'luis@jynsystems.com',
      password: '123',
      role: 'student',
    },
    {
      id: 4,
      email: 'felix@jynsystems.com',
      password: '123',
      role: 'teacher',
    },
    {
      id: 5,
      email: 'daniel@jynsystems.com',
      password: '123',
      role: 'teacher',
    },
  ];

  constructor() {}


  getUsers(): IUser[] {
    return this.users;
  }

  getUserById(id: number): IUser {
    const userFound = this.users.find((user: IUser) => user.id === id);
    return userFound ? userFound : null;
  }

  getUsersByRole(role: 'student' | 'teacher'): IUser[] {
    return this.users.filter((user: IUser) => user.role === role);
  }

  updateUser(user: IUser): IUser {
    const index = this.users.findIndex((userF: IUser) => userF.id === user.id);
    if (index !== -1) {
      const newUser = {...this.users[index], ...user};
      this.users[index] = newUser;
      return newUser;
    } else {
      return null;
    }
  }

  addStudent(user: IUser): IUser {
    const userFound = this.users.find((userF: IUser) => userF.email === user.email);
    if (userFound) {
      return null;
    }

    this.users.push(user);
    return user;
  }

  deleteById(id: number): number {
    const index = this.users.findIndex((user: IUser) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return 1;
    } else {
      throw new Error('User not found');
    }
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
