import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signIn, signUp } from 'aws-amplify/auth';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  authForm: FormGroup;
  isRegisterMode = false;
  message = '';

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async submit() {
    const { email, password } = this.authForm.value;
    this.message = '';

    try {
      if (this.isRegisterMode) {
        await signUp({ username: email, password });
        this.message = '✅ Registro exitoso. Revisa tu correo para confirmar.';
      } else {
        await signIn({ username: email, password });
        this.message = '✅ Inicio de sesión exitoso.';
      }
    } catch (error: any) {
      this.message = `❌ ${error.message || 'Error desconocido'}`;
    }
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.message = '';
  }
}