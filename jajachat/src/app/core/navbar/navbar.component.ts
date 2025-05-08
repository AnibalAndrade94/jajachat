import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn=false;
  userEmail: string = '';
  
  constructor(private auth: AuthService){

  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userEmail = user?.signInDetails?.loginId || '';
    });
  }
  async logout(){
    await this.auth.signOut();
    window.location.reload();
  }

}
