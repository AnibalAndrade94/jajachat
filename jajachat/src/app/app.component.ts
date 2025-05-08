import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon'; // ✅ esta es la buena
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jajachat';
  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer){
      iconRegistry.addSvgIcon('clip',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clip.svg')); 
      iconRegistry.addSvgIcon('send',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/send.svg'));
    }
}
