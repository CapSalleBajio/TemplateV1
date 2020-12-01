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

  async onLogin(): Promise<void> {
    if (this.form.valid) {

      try {
        // Inicio de sesión con firebase
        const user = await this.userService.login(
          this.form.get('email').value,
          this.form.get('password').value,
        );
        this.router.navigate(['/', 'home', 'teachers']);
      } catch (error) {
        console.log('Error desde firebase: ', error);
      }
    } else {
      console.log('Hay errores en el formulario');
    }
  }

  onRegister(): void {
    this.router.navigate(['/', 'auth', 'register']);
  }

  async onLoginWithGoogle(): Promise<void> {
    try {
      const userGoogle = await this.userService.loginWithGoogle();
      console.log('usuario de google', userGoogle);
      this.router.navigate(['/', 'home', 'teachers']);
    } catch (error) {
      console.log('Error con google: ', error);
    }
  }

}
