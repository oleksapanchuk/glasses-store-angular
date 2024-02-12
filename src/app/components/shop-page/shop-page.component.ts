import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteBannerComponent } from '../route-banner/route-banner.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { SpecialDealItemComponent } from '../shop-page-components/special-deal-item/special-deal-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, RouteBannerComponent, SpecialDealItemComponent, ProductListComponent, SliderModule, FormsModule],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css'
})
export class ShopPageComponent {

  faSearch = faSearch;
  faStar = faStar;
  farStar = farStar;
  faStarHalfStroke = faStarHalfStroke;

  rangeValues: number[] = [0, 50];

}
