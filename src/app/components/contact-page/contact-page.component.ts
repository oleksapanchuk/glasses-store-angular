import { Component } from '@angular/core';
import { RouteBannerComponent } from "../route-banner/route-banner.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMap, faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-contact-page',
    standalone: true,
    templateUrl: './contact-page.component.html',
    styleUrl: './contact-page.component.css',
    imports: [RouteBannerComponent, FontAwesomeModule]
})
export class ContactPageComponent {

    faMap = faMap;
    faEnvelope = faEnvelope;
    faMobileAlt = faMobileAlt;

    constructor() { }

    ngOnInit(): void {
        
    }

}
