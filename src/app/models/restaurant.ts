export interface Restaurant {
    id: number;
    name: string;
    image: string;
    address: string;
    open: boolean;
    deliveryMin: number;
    foodTypes: string[];
}
