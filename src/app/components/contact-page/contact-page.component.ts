import {Component} from '@angular/core';
import {RouteBannerComponent} from "../utils/route-banner/route-banner.component";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faEnvelope, faMap, faMobileAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
  imports: [RouteBannerComponent, FontAwesomeModule]
})
export class ContactPageComponent {

  constructor() {
  }

  protected readonly faMap = faMap;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faMobileAlt = faMobileAlt;
}
