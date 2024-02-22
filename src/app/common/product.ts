export class Product {
    constructor(
        public id: number,
        public sku: string,
        public name: string,
        public description: string,
        public price: number,
        public quantity: number,
        public rating: number,
        public active: boolean,
        public dateCreated: Date,
        public lastUpdated: Date,
        public imageUrl: string
    ) { }
}