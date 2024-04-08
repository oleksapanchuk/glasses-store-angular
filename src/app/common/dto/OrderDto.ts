export class OrderDto {
  constructor(
    public id: string,
    public orderTrackingNumber: string,
    public totalQuantity: string,
    public totalPrice: string,
    public status: string,
    public dateCreated: string,
  ) {
  }
}
