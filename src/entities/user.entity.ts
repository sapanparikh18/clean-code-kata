import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  n: string;  // This represents the user's full name

  @Column()
  em: string; // This represents the user's email address

  @Column()
  a: boolean; // This represents whether the user is an admin

  @Column()
  pwd: string; // This represents the user's password hash
}
