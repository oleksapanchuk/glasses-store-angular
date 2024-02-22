import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.css'
})
export class RatingStarsComponent {

  faStar = faStar;
  farStar = farStar;
  faStarHalfStroke = faStarHalfStroke;

  @Input() starNumber: number | undefined;

  constructor() {

  }

  integerStar: number = 0;
  arrayStarRegular: any;
  arrayStarSolid: any;
  isNonIntegerNumber: boolean = false;

  ngOnInit(): void {

    this.integerStar = Math.floor(this.starNumber!);

    this.arrayStarSolid = Array(this.integerStar).fill(0);

    if (this.starNumber! - this.integerStar >= 0.5) {
      this.isNonIntegerNumber = true
    }

    if (this.starNumber! < 4.5) {
      this.arrayStarRegular = Array(5 - this.integerStar - (this.isNonIntegerNumber ? 1 : 0)).fill(0);
    }

  }

}
