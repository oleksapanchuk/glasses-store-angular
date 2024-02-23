import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faCartArrowDown, faPhone, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SearchComponent } from "../search/search.component";
import { NavbarComponent } from "../navbar/navbar.component";
import {RouterLink, RouterLinkActive} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-components/cart-dialog/cart-dialog.component';
import {faHeart} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [FontAwesomeModule, SearchComponent, NavbarComponent, RouterLink, RouterLinkActive]
})
export class HeaderComponent {

  faCartArrowDown = faCartArrowDown;
  faPhone = faPhone;



  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.openDialog();
  }

  openDialog() {

    const dialogRef = this.dialog.open(CartDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  protected readonly faHeart = faHeart;
  protected readonly faUser = faUser;
}
