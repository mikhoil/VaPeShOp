import {Comment} from "./comment";

export type Product = {
    name: string
    price: number
    photo: string
    description: string
    reviews: Comment[]
    color: string
}