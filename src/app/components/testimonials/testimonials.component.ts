import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLongArrowAltRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {

  faLongArrowAltRight = faLongArrowAltRight;
  faLongArrowAltLeft = faLongArrowAltLeft;

}
