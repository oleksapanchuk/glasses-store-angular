import {Component} from '@angular/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {ShopDropdownComponent} from "../shop-components/shop-dropdown/shop-dropdown.component";
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [NgbDropdownModule, ShopDropdownComponent, RouterLink, RouterLinkActive]
})
export class NavbarComponent {


}
