import {OrderItemResponse} from "./order-item-response.dto";

export class OrderDetailsResponse {
  orderTrackingNumber!: string;
  totalPrice!: number;
  status!: string;
  dateCreated!: string;
  shippingAddress!: string;
  orderItems!: OrderItemResponse[];
}
