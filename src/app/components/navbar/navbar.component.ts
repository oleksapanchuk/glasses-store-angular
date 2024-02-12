import { Component, ElementRef, HostListener, ViewChild, ViewChildren } from '@angular/core';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FeaturesDropdownComponent } from "../features-dropdown/features-dropdown.component";
import { ShopDropdownComponent } from "../shop-dropdown/shop-dropdown.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [NgbDropdownModule, FeaturesDropdownComponent, ShopDropdownComponent, RouterLink, RouterLinkActive]
})
export class NavbarComponent {



}
