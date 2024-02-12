import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-route-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './route-banner.component.html',
  styleUrl: './route-banner.component.css'
})
export class RouteBannerComponent {

  @Input() pageName: string | undefined;

  constructor() { }

  ngOnInit(): void {
    
  }

}
