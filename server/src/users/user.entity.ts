import { Column, Entity, PrimaryGeneratedColumn,  } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public login: string;

  @Column()
  @Exclude()
  public password: string;
}