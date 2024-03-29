import { Component } from '@angular/core';
import { RouteBannerComponent } from "../route-banner/route-banner.component";
import { RouterLink } from '@angular/router';
import { ShopButtonComponent } from '../shop-button/shop-button.component';
import { PartnerCardComponent } from '../partner-card/partner-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGift, faShieldAlt, faDollarSign, faTruck  } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
    imports: [RouteBannerComponent, RouterLink, FontAwesomeModule, ShopButtonComponent, PartnerCardComponent]
})
export class AboutComponent {

    faGift = faGift;
    faShieldAlt = faShieldAlt;
    faDollarSign = faDollarSign;
    faTruck = faTruck;

}
