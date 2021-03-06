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
  // Profile image
  img = 'https://firebasestorage.googleapis.com/v0/b/salle-app-592bb.appspot.com/o/pngfind.com-marshmello-png-2193391.png?alt=media&token=23b5177a-b6af-40f6-b6cb-9a613c2c518c';
  file: File;

  constructor(
    private userService: UserService, // Servicio de usuarios
    private router: Router, // Clase para hacer la navegación
    private activatedRoute: ActivatedRoute, // Obtener los parámetros de la url
  ) { }

  ngOnInit(): void {
    // Inicializar variables
    this.isNew = true;
    this.file = null;

    // Instancia del grupo de controles
    this.form = new FormGroup({
      // Definición de cada uno de los controles
      // (valor inicial, validaciones síncronas, validaciones asíncronas)
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    // Obtener los parámetros de la url
    this.activatedRoute.params.subscribe(
      async (params: Params) => {
        this.params = params;
        this.isNew = params.teacherId === 'new' ? true : false;
        await this.iniValuesHttp();
        console.log('Parametros: ', params);
      }, // Next
      (error: any) => {
        console.log('Error parámetros: ', error);
      }, // Error
      () => { } // Complete
    );

    // this.iniValuesHttp();
  }

  async iniValuesHttp(): Promise<void> {
    try {
      /* this.params = await this.activatedRoute.params.pipe(take(1)).toPromise();
      this.isNew = this.params.teacherId === 'new' ? true : false; */

      if (!this.isNew) {
        const teacher = await this.userService.getTeacherById(this.params.teacherId).toPromise();
        if (teacher.data()) {
          this.form = new FormGroup({
            email: new FormControl(teacher.data().email, [Validators.required, Validators.email]),
            password: new FormControl(teacher.data().password, [Validators.required]),
          });
          this.img = teacher.data().profilePicture ? teacher.data().profilePicture : this.img;
        }
      } else {
        this.form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Método que agrega un usuario en firebase
   */
  async onAdd(): Promise<void> {
    console.log(this.form);
    if (this.form.valid) {
      const firebaseResponse = await this.userService.addTeacher({ ...this.form.value, role: 'teacher' });
      const user = await firebaseResponse.get();
      let path = null;
      if (this.file) {
        path = await this.userService.uploadFile(`profile/${this.file.name}`, this.file);
        await this.userService.updateTeacher(user.id, {...user.data(), profilePicture: path ? path : this.img});
      }
      this.file = null;
      path = null;
      this.router.navigate(['/', 'home', 'teachers', 'tpl', 'list']);
    } else {
      console.log('El formulario es inválido');
    }
  }

  /**
   * Método que actualiza un usuario en firebase
   */
  async onUpdate(): Promise<void> {
    try {
      let path = null;
      if (this.file) {
        path = await this.userService.uploadFile(`profile/${this.file.name}`, this.file);
      }
      await this.userService.updateTeacher(this.params.teacherId, {...this.form.value, profilePicture: path ? path : this.img});
      this.router.navigate(['/', 'home', 'teachers', 'tpl', 'list']);
    } catch (error) {
      console.log(error);
    } finally {
      this.file = null;
    }
  }

  /**
   * Método que obtiene un archivo
   * @param event Evento para obtener el archivo seleccionado por el usuario
   */
  async onChange(event: any): Promise<any> {
    const files: any[] = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
      this.img = await this.getBase64(files[0]);
      // const url = await this.userService.uploadFile(`profile/${files[0].name}`, files[0]);
      // this.img = url;
    } else {
      console.log('No selecciono un archivo');
    }
  }

  /**
   * Método que convierte un archivo a base64
   * @param file Archivo
   */
  getBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


}
