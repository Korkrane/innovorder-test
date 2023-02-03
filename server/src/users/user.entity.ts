import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
  Object.assign(this, partial);
  }
}