import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shop-dropdown',
  standalone: true,
  imports: [NgbDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './shop-dropdown.component.html',
  styleUrl: './shop-dropdown.component.css'
})
export class ShopDropdownComponent {

  @ViewChild('dropdown') dropdown: NgbDropdown | undefined;

  constructor(private eRef: ElementRef) { }

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(event: { target: any; }) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.dropdown!.open();
    } else {
      this.dropdown!.close();
    }
  }

}
