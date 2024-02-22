import { Product } from "./product";

export class CartItem {

    id: number;
    sku: string;
    name: string;
    price: number;
    rating: number;
    quantity: number;
    imageUrl: string;


    constructor(product: Product) {
        this.id = product.id;
        this.sku = product.sku;
        this.name = product.name;
        this.price = product.price;
        this.rating = product.rating;
        this.imageUrl = product.imageUrl;

        this.quantity = 1;
    }

}
