import { IsString, IsNotEmpty } from "class-validator";

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;
}