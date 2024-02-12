import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-features-dropdown',
  standalone: true,
  imports: [NgbDropdownModule, RouterLink],
  templateUrl: './features-dropdown.component.html',
  styleUrl: './features-dropdown.component.css'
})
export class FeaturesDropdownComponent {

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
