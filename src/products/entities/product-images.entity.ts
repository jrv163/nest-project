import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity({ name: 'products_images' })
export class ProductImage {

    @PrimaryGeneratedColumn() // por defecto se va autoincrementar
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(      /// se crea la relación de muchos a uno
        () => Product,
        ( product ) => product.images,
        { onDelete: 'CASCADE' } // para que se eliminen las imagenes en cascada
    )
    product: Product
}