import {Product} from "../product";

export class OrderItemResponse {
  id!: number;
  unitPrice!: number;
  quantity!: string;
  product!: Product;
  orderId!: number;
}
