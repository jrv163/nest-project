import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-images.entity";


@Entity({ name: 'products' })
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique:true,
    })
    title: string;


    @Column('float',{
        default: 0
    })
    price: number;


    @Column({
        type: 'text',
        nullable: true
    })
    description: string;


    @Column('text', {
        unique: true
    })
    slug: string;


    @Column('int',{
        default: 0
    })
    stock: number;


    @Column('text', {
        array: true
    })
    sizes: string[];


    @Column('text')
    gender: string;

    
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    // images
    @OneToMany(          // se crea la relacion de uno a muchos
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];  // colección de imagenes



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