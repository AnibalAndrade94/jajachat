import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signIn, signUp } from 'aws-amplify/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  standalone: true, // ✅ esto es crucial
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule], // ✅ esto activa formGroup en la plantilla
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  authForm: FormGroup;
  isRegisterMode = false;
  message = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async submit() {
    const { email, password } = this.authForm.value;

    try {
      if (this.isRegisterMode) {
        await this.auth.signUp(email, password);
        this.message = 'Registro exitoso. Revisa tu correo para confirmar.';
      } else {
        await this.auth.signIn(email, password);
        this.message = 'Inicio de sesión exitoso.';
      }
    } catch (err: any) {
      this.message = err.message || 'Error inesperado';
    }
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.message = '';
  }
}