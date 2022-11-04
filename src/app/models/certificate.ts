import {Tag} from "./tag";

export interface Certificate {
  id?: number,
  name: string,
  description: string,
  price: number,
  imagePath: string,
  duration: number
  tags: Tag[]
}

