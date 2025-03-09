import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    content!: string;


    @IsNumber()
    category_id?: number
}