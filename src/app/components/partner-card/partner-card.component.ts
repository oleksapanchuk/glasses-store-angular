import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faTwitter, faGooglePlus } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-partner-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './partner-card.component.html',
  styleUrl: './partner-card.component.css'
})
export class PartnerCardComponent {

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGooglePlus = faGooglePlus;

  @Input() partnerImageUrl: string | undefined;
  @Input() partnerName: string | undefined;
  @Input() partnerDescription: string | undefined;
  @Input() partnerFacebookLink: string | undefined;
  @Input() partnerTwitterLink: string | undefined;
  @Input() partnerGooglePlusLink: string | undefined;

}
