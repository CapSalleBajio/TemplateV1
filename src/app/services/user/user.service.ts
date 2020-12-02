import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

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

  private usersCollection: AngularFirestoreCollection<IUser>;

  constructor(
    // Para usar la clase HttpClient hay que agregar en el módulo el módulo de esta clase
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
  ) {
    this.usersCollection = angularFirestore.collection<IUser>('users');
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/users/`);
  }


  getUsers(): IUser[] {
    return this.users;
  }

  /**
   * Obtiene los maestros registrados en firebase
   */
  getTeachersFirebase(): Observable<IUser[]> {
    return this.usersCollection.valueChanges({idField: '_id'});
  }

  /**
   * Obtiene un maestro desde firebase por su id
   * @param id id del maestro
   */
  getTeacherById(id: string): Observable<firebase.firestore.DocumentSnapshot<IUser>> {
    return this.usersCollection.doc(id).get();
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

  /**
   * Método que agrega un usuario de tipo teacher a la base de datos en firebase
   * @param user Objeto de tipo IUser
   */
  addTeacher(user: IUser): Promise<any> {
    return this.usersCollection.add(user);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${environment.SERVER_URL}/users/${id}`);
  }

  deleteTeacherById(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }

  /**
   * Inicio de sesión con Email y password en firebase
   * @param email email
   * @param password password
   */
  login(email: string, password: string): Promise<any> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);

    /* const userFound = this.users.find(
      (user: IUser) => user.email === email && user.password === password
    );
    if (userFound) {
      localStorage.setItem('user', JSON.stringify(userFound));
      return true;
    } else {
      localStorage.removeItem('user');
      return false;
    } */
  }

  loginWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  register(user: IUser): Promise<any>  {
    return this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password);
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
