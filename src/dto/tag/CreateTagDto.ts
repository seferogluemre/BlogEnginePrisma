import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    name!: string;
}