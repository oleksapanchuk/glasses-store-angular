export class Product {
  id!: number;
  sku!: string;
  name!: string;
  description!: string;
  price!: number;
  unitsInStock!: number;
  active!: boolean;
  imageUrl!: string;
  categoryIds!: number[];
}
