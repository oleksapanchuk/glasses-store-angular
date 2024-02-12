import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faGooglePlus, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faGooglePlus = faGooglePlus;
  faInstagram = faInstagram;
  faEnvelope = faEnvelope;

  constructor() { }

  ngOnInit(): void { }

}
