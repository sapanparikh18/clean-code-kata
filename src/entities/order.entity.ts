import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  u: User;     // This represents the user who placed the order

  @ManyToMany(() => Product)
  @JoinTable()
  p: Product[]; // This represents the products in the order

  @Column()
  s: string;   // This represents the order status (pending, completed, etc.)

  @Column()
  t: number;   // This represents the total order amount
}
