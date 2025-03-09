import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    content!: string;

    @IsString()
    @IsNotEmpty()
    commenter_name!: string;


    @IsNumber()
    @IsNotEmpty()
    post_id!: number
}