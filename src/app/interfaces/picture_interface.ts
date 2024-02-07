import { Car } from "./car_interface";

export interface Picture{

    id: number;
    name: string;
    car: Car;
    type: string;
    image_data: string;
}