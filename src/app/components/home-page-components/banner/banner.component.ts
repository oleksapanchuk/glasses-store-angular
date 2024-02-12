import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopButtonComponent } from '../../shop-button/shop-button.component';
import { NgbCarouselModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, ShopButtonComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  constructor(config: NgbCarouselConfig) {
    config.interval = 4000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

}
