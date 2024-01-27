// se de instalar el class validator y el class transformer para realizar las validaciones

import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";


export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    stock?: number;

    @IsString({ each: true }) // each: true, significa que es un arreglo
    @IsArray()
    sizes: string[];

    @IsIn(['men', 'women', 'kid','unisex'])
    gender: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[]

    
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[]


}
