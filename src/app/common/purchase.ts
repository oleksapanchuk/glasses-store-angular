import {Order} from "./order";
import {OrderItem} from "./order-item";
import {User} from "./user";
import {Address} from "./address";

export class Purchase {
  user!: User;
  shippingAddress!: Address;
  order!: Order;
  orderItems!: OrderItem[];
}
