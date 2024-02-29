import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faChevronCircleRight, faChevronRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-route-banner',
  standalone: true,
  imports: [RouterLink, FaIconComponent],
  templateUrl: './route-banner.component.html',
  styleUrl: './route-banner.component.css'
})
export class RouteBannerComponent {

  @Input() pageName: string | undefined;

  constructor() { }

  ngOnInit(): void {

  }

  protected readonly faChevronRight = faChevronRight;
}
