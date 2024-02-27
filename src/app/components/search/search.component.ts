import { Component, ElementRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  faSearch = faSearch;
  faTimes = faTimes;

  constructor(private elementRef: ElementRef,
              private productService: ProductService,
              private router: Router
  ) { }


  ngOnInit(): void {
    const triggerBtn = this.elementRef.nativeElement.querySelector('#trigger-overlay');
    const overlay = this.elementRef.nativeElement.querySelector('div.overlay');
    const closeBttn = overlay.querySelector('button.overlay-close');

    const toggleOverlay = () => {

      if (overlay.classList.contains('open')) {
        overlay.classList.remove('open');
        overlay.classList.add('close');
      }
      else {
        overlay.classList.add('open');
      }

    };

    triggerBtn.addEventListener('click', toggleOverlay);
    closeBttn.addEventListener('click', toggleOverlay);
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/shop/${value}`);
  }



}
