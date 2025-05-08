import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signIn, signUp } from 'aws-amplify/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
@Component({
  standalone: true, 
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule,NgIf], 
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  authForm: FormGroup;
  isRegisterMode = false;
  message = '';
  isConfirmMode = false;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      code: [''] 
    });
  }

  async submit() {
    const { email, password, code } = this.authForm.value;

    try {
      if (this.isConfirmMode) {
        await this.auth.confirmSignUp(email, code);
        this.message = 'Cuenta confirmada. Ahora puedes iniciar sesión.';
        this.isConfirmMode = false;
        return;
      }
      if(!this.isConfirmMode){
        console.log("no está confirmada");
        this.isConfirmMode=true;
      }
  
      if (this.isRegisterMode) {
        await this.auth.signUp(email, password);
        this.message = 'Registro exitoso. Ingresa el código que te llegó por correo.';
        this.isConfirmMode = true;
      } else {
        await this.auth.signIn(email, password);
        this.message = 'Inicio de sesión exitoso.';
      }
    } catch (err: any) {
      console.log('Error:', err);
      this.message = err.message || 'Error inesperado';
    }
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.message = '';
  }
}