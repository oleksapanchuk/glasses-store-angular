import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RatingStarsComponent } from "../rating-stars/rating-stars.component";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faTwitter, faGooglePlus, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  imports: [RouterLink, RatingStarsComponent, CommonModule, FontAwesomeModule]
})
export class ProductDetailsComponent {

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGooglePlus = faGooglePlus;
  faLinkedin = faLinkedin;

  id: number | undefined = 1;
  name: string | undefined = "Irayz Butterfly Sunglasses (Black)";
  description: string | undefined = "Round Blue Eyeglasses";
  price: number | undefined = 650;
  rating: number | undefined = 3;


  //  product!: Product;

  constructor(
    // private productService: ProductService,
    // private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      () => {
        this.handleProductDetails();
      }
    );
  }

  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theProuctId: number = +this.route.snapshot.paramMap.get('id')!;


    console.log(theProuctId);

    // this.productService.getProduct(theProuctId).subscribe(
    //   data => {
    //     this.product = data;
    //   }
    // );

  }

}
