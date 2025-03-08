import { IsString, IsNotEmpty } from "class-validator";

export class UpdateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;
}