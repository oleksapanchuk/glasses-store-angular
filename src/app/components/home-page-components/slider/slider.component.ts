import { Component } from '@angular/core';
import { ProductItemComponent } from "../../product-item/product-item.component";
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'app-slider',
    standalone: true,
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.css',
    imports: [ProductItemComponent, CarouselModule, ButtonModule]
})
export class SliderComponent {

    products: any | undefined;
    responsiveOptions: any[] | undefined;

    constructor() {
    }

    ngOnInit(): void {
        this.products = [
            { random: 'Random', picture: 'https://picsum.photos/id/944/900/500' },
            { random: 'Samoa', picture: 'https://picsum.photos/id/1011/900/500' },
            { random: 'Tonga', picture: 'https://picsum.photos/id/984/900/500' },
            { random: 'Cook Island', picture: 'https://picsum.photos/id/944/900/500' },
            { random: 'Niue', picture: 'https://picsum.photos/id/1011/900/500' },
            { random: 'American Samoa', picture: 'https://picsum.photos/id/984/900/500' }
        ];

        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }
}
