import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  designation: string;

  @Column()
  isActive: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
