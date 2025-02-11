import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  p: number;   // This represents the product price

  @Column()
  q: number;   // This represents the quantity in stock

  @Column()
  c: string;   // This represents the product category
}
