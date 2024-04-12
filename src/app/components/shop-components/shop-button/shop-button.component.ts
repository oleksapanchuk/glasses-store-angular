import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './shop-button.component.html',
  styleUrl: './shop-button.component.css'
})
export class ShopButtonComponent {

  @Input() btnName: string | undefined;
  @Input() btnLink: string | undefined;
  @Input() isDark: boolean = true;

}
