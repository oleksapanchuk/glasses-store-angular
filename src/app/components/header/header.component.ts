import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faCartArrowDown, faPhone, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SearchComponent } from "../search/search.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-components/cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [FontAwesomeModule, SearchComponent, NavbarComponent, RouterLink]
})
export class HeaderComponent {

  faSearch = faSearch;
  faCartArrowDown = faCartArrowDown;
  faPhone = faPhone;
  faUser = faUser;
  faTimes = faTimes;



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

}
