import {Component} from '@angular/core';
import {RouteBannerComponent} from "../utils/route-banner/route-banner.component";
import {RouterLink} from '@angular/router';
import {ShopButtonComponent} from '../shop-components/shop-button/shop-button.component';
import {PartnerCardComponent} from '../partner-card/partner-card.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faDollarSign, faGift, faShieldAlt, faTruck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  imports: [RouteBannerComponent, RouterLink, FontAwesomeModule, ShopButtonComponent, PartnerCardComponent]
})
export class AboutComponent {

  constructor() {
  }

  protected readonly faGift = faGift;
  protected readonly faShieldAlt = faShieldAlt;
  protected readonly faDollarSign = faDollarSign;
  protected readonly faTruck = faTruck;
}
