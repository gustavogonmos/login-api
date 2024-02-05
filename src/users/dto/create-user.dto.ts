

import { IsPositive, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsPositive()
    @IsOptional()
    id?: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}