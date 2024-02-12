import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfStroke, faCartPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  // fa icons
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faCartPlus = faCartPlus;

  @Input() name: string | undefined;
  @Input() price: number | undefined;
  @Input() star: number | undefined;
  @Input() imgUrl: string | undefined;
  @Input() status: string | undefined;


  constructor() {
    console.log(this.imgUrl);
    
   }

  ngOnInit(): void {

  }

}
