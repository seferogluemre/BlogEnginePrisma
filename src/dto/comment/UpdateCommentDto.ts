import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCommentDto {
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