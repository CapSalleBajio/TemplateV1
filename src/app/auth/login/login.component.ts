import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin(): void {
    if (this.form.valid) {
      const isValid = this.userService.login(
        this.form.get('email').value,
        this.form.get('password').value,
      );

      if (isValid) {
        this.router.navigate(['/home/students']);
      } else {
        console.log('El usuario no existe');
      }
    } else {
      console.log('Hay errores en el formulario');
    }
  }

  onRegister(): void {
    this.router.navigate(['/', 'auth', 'register']);
  }

}
