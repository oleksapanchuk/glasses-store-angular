import {Component, OnInit} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCartArrowDown, faUser} from '@fortawesome/free-solid-svg-icons';
import {SearchComponent} from "../../shop-components/search/search.component";
import {NavbarComponent} from "../../navbar/navbar.component";
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CartDialogComponent} from '../../cart-components/cart-dialog/cart-dialog.component';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ShopDropdownComponent} from "../../shop-components/shop-dropdown/shop-dropdown.component";
import {NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {StorageService} from "../../../services/storage.service";
import {CartService} from "../../../services/cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [FontAwesomeModule, SearchComponent, NavbarComponent, RouterLink, RouterLinkActive, NgOptimizedImage, ShopDropdownComponent, NgbDropdownToggle, NgIf]
})
export class HeaderComponent implements OnInit {

  cartItemsCount!: number;

  constructor(
    public dialog: MatDialog,
    private storageService: StorageService,
    private cartService: CartService,
  ) {
  }

  ngOnInit() {
    this.cartService.totalQuantity.subscribe(data => {
      this.cartItemsCount = data;
    });
  }

  isUserAuthorized(): boolean {
    return this.storageService.isLoggedIn();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CartDialogComponent);
    dialogRef.afterClosed().subscribe();
  }

  protected readonly faUser = faUser;
  protected readonly faCartArrowDown = faCartArrowDown;
}
