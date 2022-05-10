import {CommentType} from "../Comments/commentType";

export type ProductType = {
    id: string
    brand: string
    name: string
    price: number
    photo: string
    description: string
    reviews: CommentType[]
}