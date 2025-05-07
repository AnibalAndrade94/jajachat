import { Injectable } from '@angular/core';
import { signIn, signUp, confirmSignUp, signOut, getCurrentUser } from '@aws-amplify/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  async signUp(email: string, password: string) {
    return signUp({ username: email, password });
  }

  async confirmSignUp(email: string, code: string) {
    return confirmSignUp({ username: email, confirmationCode: code });
  }

  async signIn(email: string, password: string) {
    return signIn({ username: email, password });
  }

  async signOut() {
    return signOut();
  }

  async currentUser() {
    return getCurrentUser();
  }
}
