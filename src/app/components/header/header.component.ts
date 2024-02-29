import {Component} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCartArrowDown, faUser} from '@fortawesome/free-solid-svg-icons';
import {SearchComponent} from "../search/search.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CartDialogComponent} from '../cart-components/cart-dialog/cart-dialog.component';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {NgOptimizedImage} from "@angular/common";
import {ShopDropdownComponent} from "../shop-dropdown/shop-dropdown.component";
import {NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [FontAwesomeModule, SearchComponent, NavbarComponent, RouterLink, RouterLinkActive, NgOptimizedImage, ShopDropdownComponent, NgbDropdownToggle]
})
export class HeaderComponent {

  constructor(
    public dialog: MatDialog
  ) {
  }

  openDialog() {

    const dialogRef = this.dialog.open(CartDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  protected readonly faHeart = faHeart;
  protected readonly faUser = faUser;
  protected readonly faCartArrowDown = faCartArrowDown;
}
