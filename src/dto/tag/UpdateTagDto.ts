import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTagDto {
    @IsString()
    @IsNotEmpty()
    name!: string;
}