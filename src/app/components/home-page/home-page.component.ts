import {Component} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ProductItemComponent} from "../product-item/product-item.component";
import {ProductListComponent} from "../product-list/product-list.component";
import {BannerComponent} from "../home-page-components/banner/banner.component";
import {CustomCountdownComponent} from "../home-page-components/custom-countdown/custom-countdown.component";
import {TestimonialsComponent} from "../testimonials/testimonials.component";
import {SliderComponent} from "../home-page-components/slider/slider.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [FontAwesomeModule, ProductItemComponent, ProductListComponent, BannerComponent, CustomCountdownComponent, TestimonialsComponent, SliderComponent]
})
export class HomePageComponent {


}
