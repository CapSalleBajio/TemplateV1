import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { environment } from 'src/environments/environment';

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

  constructor(
    // Para usar la clase HttpClient hay que agregar en el módulo el módulo de esta clase
    private http: HttpClient,
  ) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/users/`);
  }


  getUsers(): IUser[] {
    return this.users;
  }

  getUserById(id: number): Observable<IUser> {
    // Obtiene un usuario por su id
    return this.http.get<IUser>(`${environment.SERVER_URL}/users/${id}`);
  }

  getUsersByRole(role: 'student' | 'teacher'): IUser[] {
    return this.users.filter((user: IUser) => user.role === role);
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.patch<IUser>(`${environment.SERVER_URL}/users/${user.id}`, user);
  }

  addStudent(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.SERVER_URL}/users`, user);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${environment.SERVER_URL}/users/${id}`);
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

  validateEmail(email: string): Observable<boolean> {
    return new Observable((observer: Observer<any>) => {
      console.log('service email: ', email);
      setTimeout(() => {
        if (email === 'omar.salas@jynsystems.com') {
          observer.error(new Error('Email ya esta registrado'));
        } else {
          observer.next({valid: true});
        }
        observer.complete();
      }, 1000);
    });
  }

}
