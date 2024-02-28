import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-images.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: '038b0e78-7cd2-46cb-9683-38b64f53506c',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
    })
    @Column('text', {
        unique:true,
    })
    title: string;

    @ApiProperty({
        example: '0',
        description: 'Product price',
        uniqueItems: true
    })
    @Column('float',{
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'Esta es la descripción',
        description: 'Product descripction',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product SLUG -for SEO',
       uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product Stock',
        default: 0
    })
    @Column('int',{
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['M', 'L', 'XL'],
        description: 'Product Sizes',
       
    })
    @Column('text', {
        array: true
    })
    sizes: string[];

    
    @ApiProperty({
        example: 'Women',
        description: 'Product Gender',
    })
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    // images
    @ApiProperty()
    @OneToMany(          // se crea la relacion de uno a muchos
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];  // colección de imagenes


    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true } // cargue automatico de la relación y no aparezca el usuario en null
    )
    user: User



    @BeforeInsert()
    checkSlugInsert() {


        if ( !this.slug){
            this.slug = this.title
          
          } 
            this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
          
    }

    @BeforeUpdate()
    checkSlugUpdate() {

            this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

}
