import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-t-new',
  templateUrl: './t-new.component.html',
  styleUrls: ['./t-new.component.scss']
})
export class TNewComponent implements OnInit {
  // Definición del grupo de controles
  form: FormGroup;
  // Valida si es un nuevo maestro
  isNew: boolean;
  // Params
  params: Params;

  constructor(
    private userService: UserService, // Servicio de usuarios
    private router: Router, // Clase para hacer la navegación
    private activatedRoute: ActivatedRoute, // Obtener los parámetros de la url
  ) { }

  ngOnInit(): void {
    // Inicializar variables
    this.isNew = true;

    // Instancia del grupo de controles
    this.form = new FormGroup({
      // Definición de cada uno de los controles
      // (valor inicial, validaciones síncronas, validaciones asíncronas)
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    // Obtener los parámetros de la url
    /* this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.isNew = params.teacherId === 'new' ? true : false;
        console.log('Parametros: ', params);
      }, // Next
      (error: any) => {
        console.log('Error parámetros: ', error);
      }, // Error
      () => {} // Complete
    ); */

    this.iniValuesHttp();
  }

  async iniValuesHttp(): Promise<void> {
    try {
      this.params = await this.activatedRoute.params.pipe(take(1)).toPromise();
      this.isNew = this.params.teacherId === 'new' ? true : false;

      const teacher = await this.userService.getTeacherById(this.params.teacherId).toPromise();
      if (teacher.data()) {
        this.form = new FormGroup({
          email: new FormControl(teacher.data().email, [Validators.required, Validators.email]),
          password: new FormControl(teacher.data().password, [Validators.required]),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onAdd(): Promise<void> {
    console.log(this.form);
    if (this.form.valid) {
      const user = await this.userService.addTeacher({...this.form.value, role: 'teacher'});
      this.router.navigate(['/', 'home', 'teachers', 'tpl', 'list']);
    } else {
      console.log('El formulario es inválido');
    }
  }

  async onUpdate(): Promise<void> {
    console.log('Actualizar maestro');
  }


}
