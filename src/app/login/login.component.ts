import { Component, signal} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {merge} from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,MatInputModule,MatSelectModule, MatCardModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('password', [
    Validators.minLength(6),
    Validators.pattern('.*[a-zA-Z].*')
  ]);

  //Mostrar sweetalert
  loading = true;


  errorMessage = signal('');
  errorMessagePassword = signal('');


  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    merge(this.password.statusChanges, this.password.valueChanges)
    .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  //Validador de contraseña 
  updateErrorMessagePassword() {
    if (this.password.hasError('required')) {
      this.errorMessagePassword.set('Debe ingresar un valor.');
    } else if (this.password.hasError('minLength')) {
      this.errorMessagePassword.set('La contraseña debe contener mínimo 6 caracteres.');
    } else if (this.password.hasError('pattern')) {
      this.errorMessagePassword.set('La contraseña debe tener al menos una letras.');
    } else {
      this.errorMessagePassword.set('');
    }
  }

  //Validador de correo
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Debe ingresar un valor.');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('El correo no es válido.');
    } else {
      this.errorMessage.set('');
    }
  }

  //llamar al endpoint login
  async submitForm(){
    // try {
    //   const response = await fetch('https://login.api.com/pruebatecnica',{
    //     method: 'POST',
    //     body: JSON.stringify({this.form.value}),
    //     headers: { 'Content-type': 'application/json' },
    //   })

    //   if(!response.ok) throw new Error('Hubo un error, por favor inténtalo nuevamente.');

    //   Swal.fire({
    //     title: "¡Bienvenido!",
    //     icon: "success",
    //     draggable: true
    //   });

    // } catch (error) {
    //   console.log(error)
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "¡Algo anda mal, inténtalo nuevamente!",
    //   });
    // }
    console.log("se envió");
  }
}
