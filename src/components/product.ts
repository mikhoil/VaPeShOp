import {Comment} from "./comment";

export type Product = {
    id: string
    brand: string
    name: string
    price: number
    photo: string
    description: string
    reviews: Comment[]
}