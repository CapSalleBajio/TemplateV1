import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  onReturn(): void {
    this.router.navigate(['/', 'auth', 'login']);
  }

  async onRegister(): Promise<void> {
    console.log(this.form.value);
    if (this.form.valid) {

      if (this.form.value.role === 'teacher') {
        // Registro de usuarios de tipo teacher en firebase (base de datos)
        try {
          const teacher = await this.userService.addTeacher(this.form.value);
          console.log('Maestro registrado: ', teacher);
        } catch (error) {
          console.log('Hubo un problema para registrar un maestro', error);
        }
      } else {
        // Registro de usuarios de tipo student usando el modulo de autenticación de firebase (autenticación)
        try {
          const user = await this.userService.register(this.form.value);
          console.log('Usuario registrado', user);
          this.router.navigate(['/', 'home']);
        } catch (error) {
          console.error('Error en registro: ', error);
        }
      }


    } else {
      console.log('Formulario inválido');
    }
  }

}
