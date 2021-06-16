export interface IGetProducts {
    name?: string;
    description?: string;
    img?: string;
    gender?: "mens" | "womens";
    priceMin?: number;
    priceMax?: number;
    color?: string;
    page?: number;
}
