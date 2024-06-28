import {Component, HostListener, OnInit} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBars, faBurger, faCartArrowDown, faUser} from '@fortawesome/free-solid-svg-icons';
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

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [FontAwesomeModule, SearchComponent, NavbarComponent, RouterLink, RouterLinkActive, NgOptimizedImage, ShopDropdownComponent, NgbDropdownToggle, NgIf]
})
export class HeaderComponent implements OnInit {

  cartItemsCount = 0;
  menuOpen = false;

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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isBurgerIcon = target.closest('.header__burger-icon');
    const isBurgerMenu = target.closest('.header__burger-menu');

    if (!isBurgerIcon && !isBurgerMenu) {
      this.menuOpen = false;
    }
  }

  protected readonly faUser = faUser;
  protected readonly faCartArrowDown = faCartArrowDown;
  protected readonly faBars = faBars;
}
