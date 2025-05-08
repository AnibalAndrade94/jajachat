import { Injectable } from '@angular/core';
import { signIn, signUp, confirmSignUp, signOut, getCurrentUser } from '@aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<any>(null);
  user$ = this._user$.asObservable();

  constructor(public route: Router) {
    this.checkUser();
  }

  async checkUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      const user = await getCurrentUser();
      this._user$.next(user);
    } catch {
      this._user$.next(null);
    }
  }

  async signUp(email: string, password: string) {
    return signUp({ username: email, password });
  }

  async confirmSignUp(email: string, code: string) {
    return confirmSignUp({ username: email, confirmationCode: code });
  }

  async signIn(email: string, password: string) {
    const result = await signIn({ username: email, password });
    console.log("iniciando sesión");
    await this.checkUser(); 
    this.route.navigateByUrl('/chat')
    return result;
  }

  async signOut() {
    await signOut();
    this._user$.next(null);
  }

  async currentUser() {
    try {
      return await getCurrentUser();
    } catch {
      return null;
    }
  }

}
