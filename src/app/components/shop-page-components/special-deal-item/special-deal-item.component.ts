import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-special-deal-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './special-deal-item.component.html',
  styleUrl: './special-deal-item.component.css'
})
export class SpecialDealItemComponent {


  @Input() productId: number | undefined;
  @Input() imageUrl: string | undefined;
  @Input() name: string | undefined;
  @Input() oldPrice: number | undefined;
  @Input() newPrice: number | undefined;

  constructor() { }

  ngOnInit(): void {

  }


}
