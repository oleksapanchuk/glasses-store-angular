import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  faGoogle = faGoogle;
  faGithub = faGithub;
  faFacebook = faFacebook;

  constructor() { }

  ngOnInit(): void {
    
  }

}
